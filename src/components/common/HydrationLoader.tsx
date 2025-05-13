// components/HydrationLoader.tsx
'use client';

import React, { useEffect, useState } from 'react';


export function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}


export default function HydrationLoader({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHydrated(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!hydrated) return <Preloader />;
  return <>{children}</>;
}
