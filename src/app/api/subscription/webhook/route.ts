import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', {
    sessionId: session.id,
    customerId: session.customer,
    subscriptionId: session.subscription,
    metadata: session.metadata,
  });

  // In a real implementation, you would:
  // 1. Update user's subscription status in your database
  // 2. Grant access to the subscribed tier
  // 3. Send welcome email
  // 4. Track analytics events

  try {
    // Example of what you would do:
    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;
    
    if (userId && planId) {
      // Update user subscription in database
      await updateUserSubscription({
        userId,
        planId,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
        status: 'active',
        trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      });

      // Send welcome email
      await sendWelcomeEmail(userId, planId);
      
      // Track conversion event
      await trackEvent('subscription_created', {
        userId,
        planId,
        revenue: session.amount_total ? session.amount_total / 100 : 0,
      });
    }
  } catch (error) {
    console.error('Error handling checkout completion:', error);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', {
    id: subscription.id,
    customerId: subscription.customer,
    status: subscription.status,
    metadata: subscription.metadata,
  });

  // Update subscription status in database
  const userId = subscription.metadata?.userId;
  if (userId) {
    await updateUserSubscription({
      userId,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
    });
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', {
    id: subscription.id,
    status: subscription.status,
    metadata: subscription.metadata,
  });

  // Update subscription status in database
  const userId = subscription.metadata?.userId;
  if (userId) {
    await updateUserSubscription({
      userId,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  }
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  console.log('Subscription canceled:', {
    id: subscription.id,
    customerId: subscription.customer,
    canceledAt: subscription.canceled_at,
  });

  // Update subscription status in database
  const userId = subscription.metadata?.userId;
  if (userId) {
    await updateUserSubscription({
      userId,
      stripeSubscriptionId: subscription.id,
      status: 'canceled',
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : new Date(),
    });

    // Send cancellation email
    await sendCancellationEmail(userId);
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded:', {
    id: invoice.id,
    subscriptionId: invoice.subscription,
    amountPaid: invoice.amount_paid,
  });

  // Track successful payment
  if (invoice.subscription) {
    await trackEvent('payment_succeeded', {
      subscriptionId: invoice.subscription,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
    });
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.error('Payment failed:', {
    id: invoice.id,
    subscriptionId: invoice.subscription,
    amountDue: invoice.amount_due,
  });

  // Handle failed payment
  if (invoice.subscription) {
    await trackEvent('payment_failed', {
      subscriptionId: invoice.subscription,
      amount: invoice.amount_due / 100,
      currency: invoice.currency,
    });

    // Send payment failed email
    await sendPaymentFailedEmail(invoice.customer_email || '');
  }
}

// Mock functions - in a real implementation, these would interact with your database
async function updateUserSubscription(data: any) {
  console.log('Updating user subscription:', data);
  // Database update logic here
}

async function sendWelcomeEmail(userId: string, planId: string) {
  console.log('Sending welcome email:', { userId, planId });
  // Email sending logic here
}

async function sendCancellationEmail(userId: string) {
  console.log('Sending cancellation email:', { userId });
  // Email sending logic here
}

async function sendPaymentFailedEmail(email: string) {
  console.log('Sending payment failed email:', { email });
  // Email sending logic here
}

async function trackEvent(eventName: string, data: any) {
  console.log('Tracking event:', eventName, data);
  // Analytics tracking logic here
}