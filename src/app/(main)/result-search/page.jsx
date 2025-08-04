import { Suspense } from 'react';
import ResultSearchClient from './ResultSearchClient';

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-40 w-full rounded-lg"></div>
    <div className="bg-gray-200 h-4 w-3/4 mt-2 rounded"></div>
    <div className="bg-gray-200 h-6 w-1/2 mt-1 rounded"></div>
  </div>
);

const LoadingFallback = () => (
    <div className="px-[7%]">
        <div className="p-4 md:p-6">
            <div className="p-4 rounded-[24px] border border-gray-200">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
                <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                    {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </div>
        </div>
    </div>
);


export default function ResultSearchPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultSearchClient />
    </Suspense>
  );
}
