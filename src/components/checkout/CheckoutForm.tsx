
'use client';

import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';


export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/dashboard`, // We will handle order confirmation on the backend via webhooks
      },
      redirect: 'if_required', // Prevents immediate redirection
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
       setErrorMessage(error.message ?? 'An unexpected error occurred.');
       toast({
         title: 'Payment Failed',
         description: error.message ?? 'An unexpected error occurred.',
         variant: 'destructive',
       });
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded, now clear the cart and redirect
        toast({
            title: 'Payment Successful!',
            description: 'Your order is being processed.',
        });
        clearCart();
        router.push('/dashboard/orders'); // Redirect to a success or orders page
    }


    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Shipping & Contact</CardTitle>
                <CardDescription>Where should we send your physical goods?</CardDescription>
            </CardHeader>
            <CardContent>
                <AddressElement options={{mode: 'shipping'}} />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
            </CardHeader>
            <CardContent>
                 <PaymentElement />
            </CardContent>
        </Card>
      
      {errorMessage && <div className="text-destructive text-center">{errorMessage}</div>}

      <Button type="submit" size="lg" className="w-full" disabled={isProcessing || !stripe || !elements}>
        {isProcessing ? <Loader2 className="mr-2 h-4 animate-spin" /> : `Pay Now`}
      </Button>
    </form>
  );
}
