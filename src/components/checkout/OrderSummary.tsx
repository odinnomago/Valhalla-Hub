
'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function OrderSummary() {
  const { items } = useCart();
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const taxes = subtotal * 0.08; // Example tax rate
  const total = subtotal + taxes;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                       <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 text-sm">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">{item.category}</p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
            ))}
        </div>
        <Separator />
        <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
             <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
            </div>
             <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
            </div>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

