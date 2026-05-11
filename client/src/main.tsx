import { createRoot } from 'react-dom/client'
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from 'sonner';
// Global styles
import './assets/css/global.css'
import "./assets/css/components/Home.css";

// Router comp
import Router from './Router';

// Loader comp
import { PageLoader } from './components/app/atoms/PageLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<PageLoader />}>
      <Router />
      <Toaster 
        position="top-center" 
        richColors 
        toastOptions={{
          style: {
            fontFamily: "var(--font-mono)",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--gray-main)",
            fontWeight: "500",
          }
        }}
      />
    </Suspense>
    {import.meta.env.DEV && ReactQueryDevtools && (
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    )}
  </QueryClientProvider>
)