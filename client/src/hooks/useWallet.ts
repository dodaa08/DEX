import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    if (isConnected) {
      disconnect()
    } else {
      // Connect with the first available connector (MetaMask by default)
      connect({ connector: connectors[0] })
    }
  }

  return {
    address,
    isConnected,
    handleConnect,
    connectors
  }
}
