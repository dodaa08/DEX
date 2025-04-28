import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageTransition } from "./components/Layout/PageTransition";
import Landing from "./pages/Landing";
import Mint from "./pages/Mint";
import { WagmiProvider } from 'wagmi';
import { config } from './lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/mint" element={<Mint />} />
            </Routes>
          </PageTransition>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;