'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

const LoadingIndicator = React.forwardRef<HTMLDivElement, LoadingIndicatorProps>(
  ({ isLoading = true, className, ...props }, ref) => {
    if (!isLoading) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center',
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
);

LoadingIndicator.displayName = 'LoadingIndicator';

export { LoadingIndicator };