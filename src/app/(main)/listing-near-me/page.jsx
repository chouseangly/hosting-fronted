import { Suspense } from 'react';
import ListingNearMeClient from './ListingNearMeClient';

export default function ListingNearMePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-600">Loading Nearby Listings...</p>
      </div>
    }>
      <ListingNearMeClient />
    </Suspense>
  );
}
