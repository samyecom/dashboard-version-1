import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import HydrationLoader from '@/components/common/HydrationLoader';
import RouteLoader from '@/components/common/RouteLoader';


const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <HydrationLoader>
          <ThemeProvider>
            <SidebarProvider>
              <RouteLoader>
                {children}
              </RouteLoader>
            </SidebarProvider>
          </ThemeProvider>
        </HydrationLoader>
      </body>
    </html>
  );
}
