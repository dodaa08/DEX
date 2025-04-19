import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask(), // only MetaMask for now
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
