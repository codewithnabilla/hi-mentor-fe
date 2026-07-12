import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster richColors position="top-center"/>
    <RouterProvider router={router} />
  </QueryClientProvider>,
)
