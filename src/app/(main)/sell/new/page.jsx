import { Suspense } from 'react';
import SellNewClient from './SellNewClient';

// A loading skeleton to provide a better user experience while the client component loads.
const LoadingSkeleton = () => (
    <div className="mx-auto px-[7%] py-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
                <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    </div>
);

export default function SellNewPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SellNewClient />
    </Suspense>
  );
}
