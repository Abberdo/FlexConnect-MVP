import React, { Suspense, lazy, ComponentType } from 'react';
import { Loader2 } from 'lucide-react';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex-1 flex items-center justify-center min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

// Fullscreen loading component for page transitions
export const FullscreenLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-2 text-primary">
      <Loader2 className="h-10 w-10 animate-spin" />
      <p className="text-sm font-medium">Loading content...</p>
    </div>
  </div>
);

/**
 * Creates a lazy-loaded component with a loading fallback
 * 
 * @param importFn - Dynamic import function for the component
 * @param exportName - Name of the exported component to use (for named exports)
 * @param fallback - Optional custom loading component
 * @returns Lazy-loaded component with fallback
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<any>,
  exportName?: string,
  fallback: React.ReactNode = <LoadingSpinner />
) {
  const LazyComponent = lazy(async () => {
    const module = await importFn();
    // Handle both default and named exports
    return exportName ? { default: module[exportName] } : module;
  });
  
  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}