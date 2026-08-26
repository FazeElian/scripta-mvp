import { createRoot } from 'react-dom/client'
import { lazy, StrictMode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner';
// Global styles
import './assets/css/global.css'
import "./assets/css/components/Home.css";

// Router comp
import Router from './Router';

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() => import("@tanstack/react-query-devtools").then(m => ({ default: m.ReactQueryDevtools })))
  : null;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
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
      {ReactQueryDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  </StrictMode>
)