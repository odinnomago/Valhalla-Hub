
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createOrder } from '@/lib/actions';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }


  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log(`PaymentIntent successful: ${paymentIntent.id}`);
    
    // Create the order in the database
    const result = await createOrder(paymentIntent);

    if (result.error) {
       console.error('Failed to create order:', result.error);
       // We can return a 500 here to let Stripe know something went wrong on our end
       // Stripe will attempt to resend the webhook later.
       return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 });
    }
  } else {
    console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
