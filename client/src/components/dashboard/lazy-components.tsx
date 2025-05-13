import { lazyLoad } from "@/lib/lazy-load";

// Lazy loaded dashboard components with named exports
export const LazyActivityFeed = lazyLoad(() => import('./activity-feed'), 'ActivityFeed');
export const LazyTopMatches = lazyLoad(() => import('./top-matches'), 'TopMatches');
export const LazyActiveProjects = lazyLoad(() => import('./active-projects'), 'ActiveProjects');
export const LazyJobRecommendations = lazyLoad(() => import('./job-recommendations'), 'JobRecommendations');