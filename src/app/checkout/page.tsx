
'use client';

import { useRequireAuth } from "@/hooks/useAuth";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutProvider } from "@/components/checkout/CheckoutProvider";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";


export default function CheckoutPage() {
  useRequireAuth();
  const { items } = useCart();
  const router = useRouter();

  useEffect(() => {
    if(items.length === 0) {
        // Redirect back to marketplace if cart is empty
        router.push('/marketplace');
    }
  }, [items, router]);

  if(items.length === 0) {
    return (
        <div className="container mx-auto px-4 py-16 md:px-6 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
                <Link href="/marketplace">
                    Continue Shopping
                </Link>
            </Button>
        </div>
    )
  }

  return (
    <CheckoutProvider>
        <div className="container mx-auto px-4 py-16 md:px-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-headline">Checkout</h1>
                <p className="text-lg text-muted-foreground">Complete your purchase</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                <div className="order-2 lg:order-1">
                <CheckoutForm />
                </div>
                <div className="order-1 lg:order-2">
                    <OrderSummary />
                </div>
            </div>
        </div>
    </CheckoutProvider>
  );
}
