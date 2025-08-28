'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Music, Menu, ShoppingCart, X, Trash2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage, type Language, type NavKey } from '@/hooks/use-language';

const navTranslations: Record<Language, Record<NavKey, string>> = {
  en: {
    bookings: 'Bookings',
    events: 'Events',
    marketplace: 'Marketplace',
    academy: 'Academy',
    blog: 'Blog',
    contato: 'Contact',
    gravadora: 'Records',
  },
  pt: {
    bookings: 'Reservas',
    events: 'Eventos',
    marketplace: 'Mercado',
    academy: 'Academia',
    blog: 'Blog',
    contato: 'Contato',
    gravadora: 'Gravadora',
  },
  es: {
    bookings: 'Reservas',
    events: 'Eventos',
    marketplace: 'Mercado',
    academy: 'Academia',
    blog: 'Blog',
    contato: 'Contacto',
    gravadora: 'Discográfica',
  },
};

const navItems: { href: string; key: NavKey }[] = [
  { href: '/bookings', key: 'bookings' },
  { href: '/events', key: 'events' },
  { href: '/marketplace', key: 'marketplace' },
  { href: '/academy', key: 'academy' },
  { href: '/gravadora', key: 'gravadora' },
  { href: '/blog', key: 'blog' },
  { href: '/contato', key: 'contato' } // Added back the contact item
];

export default function Header() {
  const { items, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();

  const itemCount = items.length;
  const cartTotal = items.reduce((total, item) => total + item.price, 0).toFixed(2);

  const navigation = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Bookings',
      href: '/bookings',
    },
    {
      name: 'Record Label',
      href: '/gravadora',
    },
    {
      name: 'Marketplace',
      href: '/marketplace',
    },
    {
      name: 'Academy',
      href: '/academy',
    },
    {
      name: 'Events',
      href: '/events',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border/50 transition-all duration-300">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
          <Music className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-300" />
          <span className="font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-300">
            Valhalla Hub
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105 relative group"
            >
              {navTranslations[language][item.key]}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors duration-300">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0 bg-primary text-primary-foreground animate-pulse">
                    {itemCount}
                  </Badge>
                )}
                <span className="sr-only">Open Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg bg-card/95 backdrop-blur-lg border-border/50">
              <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle className="text-xl font-headline">Cart ({itemCount})</SheetTitle>
                <Separator className="bg-border/50" />
              </SheetHeader>
              {itemCount > 0 ? (
                <>
                  <ScrollArea className="flex-1 pr-6">
                    <div className="flex flex-col gap-4 mt-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors duration-300 group">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="flex-1 text-sm">
                            <h3 className="font-medium group-hover:text-primary transition-colors duration-300">{item.name}</h3>
                            <p className="text-muted-foreground text-xs">Category: {item.category}</p>
                            <p className="font-bold mt-1 text-accent">${item.price.toFixed(2)}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="hover:bg-destructive/10 hover:text-destructive transition-colors duration-300">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="space-y-4 pr-6">
                    <Separator />
                    <div className="space-y-1.5 text-sm">
                      <div className="flex">
                        <span className="flex-1">Subtotal</span>
                        <span>${cartTotal}</span>
                      </div>
                      <div className="flex">
                        <span className="flex-1">Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex">
                        <span className="flex-1">Taxes</span>
                        <span>Calculated at checkout</span>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button className="w-full netflix-button bg-primary hover:bg-primary/90 text-lg py-3" asChild>
                        <Link href="/checkout">Continue to Checkout</Link>
                      </Button>
                    </SheetFooter>
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center space-y-4">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/50" strokeWidth={1}/>
                  <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground/70 text-center">Discover amazing beats, courses, and merch</p>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="border-primary/50 hover:border-primary hover:bg-primary/10" asChild>
                      <Link href="/marketplace">Start Shopping</Link>
                    </Button>
                  </SheetTrigger>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors duration-300">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Select language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-lg border-border/50">
              <DropdownMenuItem onSelect={() => setLanguage('pt')} className="hover:bg-primary/10 transition-colors duration-300">
                <span className="mr-2">🇧🇷</span>
                <span>Português (BR)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLanguage('en')} className="hover:bg-primary/10 transition-colors duration-300">
                <span className="mr-2">🇺🇸</span>
                <span>English (US)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLanguage('es')} className="hover:bg-primary/10 transition-colors duration-300">
                <span className="mr-2">🇪🇸</span>
                <span>Español (ES)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button asChild className="netflix-button bg-primary hover:bg-primary/90 px-6 py-2">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild className="border-border/50 hover:border-primary hover:bg-primary/10 transition-all duration-300">
                  <Link href="/auth/login">Log In</Link>
                </Button>
                <Button asChild className="netflix-button bg-primary hover:bg-primary/90 px-6 py-2">
                  <Link href="/auth/register">Junte-se ao Valhalla</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors duration-300">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card/95 backdrop-blur-lg border-border/50">
                <div className="flex flex-col gap-6 p-6">
                  <Link href="/" className="flex items-center gap-3 font-bold text-xl mb-4">
                    <Music className="h-7 w-7 text-primary" />
                    <span className="font-headline">Valhalla Hub</span>
                  </Link>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        className="text-base font-medium py-1 hover:text-primary transition-colors"
                      >
                        {navTranslations[language][item.key]}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    {user ? (
                      <Button asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" asChild>
                          <Link href="/auth/login">Log In</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/auth/register">Junte-se ao Valhalla</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};