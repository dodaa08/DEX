import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'
import { WagmiProvider } from 'wagmi';
import { config } from '../src/config/wagmi';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
         <App />
      </QueryClientProvider> 
    </WagmiProvider>
);

