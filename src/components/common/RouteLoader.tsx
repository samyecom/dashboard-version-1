// components/RouteLoader.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Preloader() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

export default function RouteLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // fake delay
    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <Preloader /> : <>{children}</>;
}
