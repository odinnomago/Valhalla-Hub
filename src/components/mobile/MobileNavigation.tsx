'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Music, 
  Calendar, 
  Store, 
  Users, 
  School, 
  FileText, 
  Ticket, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'releases', label: 'Lançamentos', icon: <Music className="h-5 w-5" /> },
    { id: 'events', label: 'Eventos', icon: <Calendar className="h-5 w-5" /> },
    { id: 'marketplace', label: 'Marketplace', icon: <Store className="h-5 w-5" /> },
    { id: 'community', label: 'Comunidade', icon: <Users className="h-5 w-5" /> },
    { id: 'courses', label: 'Cursos', icon: <School className="h-5 w-5" /> },
    { id: 'blog', label: 'Blog', icon: <FileText className="h-5 w-5" /> },
    { id: 'tickets', label: 'Ingressos', icon: <Ticket className="h-5 w-5" /> },
    { id: 'reports', label: 'Relatórios', icon: <BarChart3 className="h-5 w-5" /> }
  ];

  const handleNavigation = (itemId: string) => {
    // This would normally trigger navigation
    console.log('Navigate to:', itemId);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="md:hidden fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg touch-btn"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[80vh] rounded-t-2xl p-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Navegação</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="touch-btn"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  className="flex flex-col h-auto p-4 gap-2 touch-btn"
                  onClick={() => handleNavigation(item.id)}
                >
                  <div className="bg-primary/10 p-3 rounded-lg">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* User Actions */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button className="flex-1 touch-btn">Perfil</Button>
              <Button variant="outline" className="flex-1 touch-btn">Sair</Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;