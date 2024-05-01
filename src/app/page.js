"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';


const queryClient = new QueryClient()


export default function App() {
  const { address, connected, wallet } = useWallet();
  return (
    <main>
        <div>
            <h2>Wallet Connection Info</h2>
            <p>
                <span>Connection Status:</span> {connected ? 'Connected' : 'Disconnected'}
            </p>
            <p>
                <span>Your selected Wallet:</span> {wallet?.adapter.name}
            </p>
            <p>
                <span>Your Address:</span> {address}
            </p>
        </div>
      
        <QueryClientProvider client={queryClient}> 
         
        </QueryClientProvider> 


    </main>
    
  )
}