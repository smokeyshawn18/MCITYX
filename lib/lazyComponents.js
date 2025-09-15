import dynamic from 'next/dynamic';

// Lazy load heavy components
export const LazyLineupEditor = dynamic(() => import('@/components/LineupEditor'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
});

export const LazyPlayerCard = dynamic(() => import('@/components/PlayerCard'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
});

export const LazyLiveScore = dynamic(() => import('@/components/LiveScore'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
});

export const LazyAnalytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false // Only load on client side
});

export const LazyServiceWorker = dynamic(() => import('@/components/ServiceWorkerRegister'), {
  ssr: false
});
