"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig, WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { ConnectWallet } from './connectWallet'

const queryClient = new QueryClient()


function App() {
  return (
    <WagmiProvider config={WagmiConfig}>
      <QueryClientProvider client={queryClient}> 
        <ConnectWallet /> 
      </QueryClientProvider> 
    </WagmiProvider>
  )
}