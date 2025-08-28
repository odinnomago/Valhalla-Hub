
'use client';

import { useEffect, useState } from 'react';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '@/hooks/use-cart';
import { createPaymentIntent } from '@/lib/actions';
import { useAuth } from '@/hooks/useAuth';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [clientSecret, setClientSecret] = useState('');
  const { items } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (items.length > 0 && user) {
        createPaymentIntent(items, user.uid)
            .then((data) => {
                if(data.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })
            .catch(err => console.error(err));
    }
  }, [items, user]);

  const appearance = {
    theme: 'night',
    labels: 'floating',
  };
  
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {children}
        </Elements>
      )}
    </>
  );
}
