import { Suspense } from 'react';
import ResultScanClient from './ResultScanClient';

export default function ResultScanPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ea580c] mb-4"></div>
        <p>Loading Scan Results...</p>
      </div>
    }>
      <ResultScanClient />
    </Suspense>
  );
}
