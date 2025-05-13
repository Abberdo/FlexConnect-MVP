import { lazyLoad } from '@/lib/lazy-load';

// Lazy loaded home page section components
export const LazyHeroSection = lazyLoad(() => import('./hero-section'), 'default');
export const LazyFeaturesSection = lazyLoad(() => import('./features-section'), 'default');
export const LazyBenefitsSection = lazyLoad(() => import('./benefits-section'), 'default');
export const LazyCtaSection = lazyLoad(() => import('./cta-section'), 'default');