
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@/lib/mock-data';
import { useToast } from './use-toast';

type CartItem = Product;

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const isItemInCart = prevItems.find((i) => i.id === item.id);
      if (isItemInCart) {
        toast({
          title: 'Already in cart',
          description: 'This item is already in your cart.',
          variant: 'default',
        });
        return prevItems;
      }
      toast({
        title: 'Added to cart!',
        description: `${item.name} has been added to your cart.`,
      });
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
     toast({
        title: 'Item removed',
        description: `The item has been removed from your cart.`,
      });
  };

  const clearCart = () => {
    setItems([]);
     toast({
        title: 'Cart cleared',
        description: `All items have been removed from your cart.`,
      });
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
