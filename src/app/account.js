"use client"
import { useAccount, useDisconnect} from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div>
      {<div>(${address})` : address</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}