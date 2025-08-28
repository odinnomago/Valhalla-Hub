import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { membershipPlans } from '@/lib/membership';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { planId, isAnnual, userId, email, successUrl, cancelUrl } = await request.json();

    // Validate plan
    const plan = membershipPlans.find(p => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan ID' }, { status: 400 });
    }

    // Calculate price based on billing cycle
    const unitAmount = isAnnual 
      ? Math.round(plan.price * 10 * 100) // Annual price with 16% discount, in cents
      : Math.round(plan.price * 100); // Monthly price in cents

    // Create or retrieve customer
    let customer;
    try {
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });
      
      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: email,
          metadata: {
            userId: userId,
          },
        });
      }
    } catch (error) {
      console.error('Error creating/retrieving customer:', error);
      return NextResponse.json({ error: 'Failed to process customer' }, { status: 500 });
    }

    // Create product if it doesn't exist
    let product;
    try {
      const products = await stripe.products.list({
        limit: 100,
      });
      
      const existingProduct = products.data.find(p => p.metadata.planId === planId);
      
      if (existingProduct) {
        product = existingProduct;
      } else {
        product = await stripe.products.create({
          name: `Valhalla Hub - ${plan.name}`,
          description: plan.description,
          metadata: {
            planId: planId,
            tier: plan.id,
          },
        });
      }
    } catch (error) {
      console.error('Error creating product:', error);
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }

    // Create price for the product
    let price;
    try {
      const prices = await stripe.prices.list({
        product: product.id,
        limit: 100,
      });

      const existingPrice = prices.data.find(p => 
        p.unit_amount === unitAmount && 
        p.recurring?.interval === (isAnnual ? 'year' : 'month')
      );

      if (existingPrice) {
        price = existingPrice;
      } else {
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: unitAmount,
          currency: 'brl',
          recurring: {
            interval: isAnnual ? 'year' : 'month',
          },
          metadata: {
            planId: planId,
            isAnnual: isAnnual.toString(),
          },
        });
      }
    } catch (error) {
      console.error('Error creating price:', error);
      return NextResponse.json({ error: 'Failed to create price' }, { status: 500 });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/membros`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        userId: userId,
        planId: planId,
        isAnnual: isAnnual.toString(),
      },
      subscription_data: {
        metadata: {
          userId: userId,
          planId: planId,
          tier: plan.id,
        },
        trial_period_days: 7, // 7-day free trial
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}