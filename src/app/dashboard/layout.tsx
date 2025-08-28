
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRequireAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Loader2, Package, Wand2, Album, ShoppingCart, School } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useRequireAuth();
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/releases', label: 'Releases', icon: Album },
    { href: '/dashboard/products', label: 'Products', icon: Package },
    { href: '/dashboard/courses', label: 'My Courses', icon: School },
    { href: '/dashboard/orders', label: 'My Orders', icon: ShoppingCart },
    { href: '/dashboard/marketing', label: 'Marketing AI', icon: Wand2 },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
       <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
               <Button
                key={item.href}
                variant={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)) ? 'secondary' : 'ghost'}
                className="justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>
        <main>
           {children}
        </main>
      </div>
    </div>
  );
}
