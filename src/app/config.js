import { http, createConfig } from 'wagmi'
import { mainnet, optimismSepolia, scrollTestnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, sepolia, scrollTestnet, optimismSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),    
    [optimismSepolia.id]: http(),    
    [scrollTestnet.id]: http(),    
  },
})