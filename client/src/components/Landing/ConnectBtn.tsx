import { useAccount, useConnect, useDisconnect } from "wagmi"

const ConnectBtn = () => {
  const { address } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  // Filter to show only MetaMask (you can add conditions if needed)
  const metaMaskConnectors = connectors.filter(
    (connector) =>
      connector.id.toLowerCase().includes('meta') ||
      connector.name.toLowerCase().includes('meta')
  )
  
  return (
    <div>
      {address ? (
         <>
         <div className="flex flex gap-5 items-start">
          <button
            className="bg-[#1e2b45] hover:bg-[#2a3b5c] text-gray-100 border border-blue-500/20 px-4 py-3 text-l font-medium rounded-xl
              transition-all duration-200 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
              focus:ring-2 focus:ring-blue-500/20 focus:outline-none cursor-pointer disabled:opacity-50"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
          <p className="text-gray-300 mt-3">Connected: <span className="text-white">{address.slice(0, 6)}...{address.slice(-4)}</span></p>
        </div>
            </>
      ) : (
        metaMaskConnectors.map((connector) => (
          <button
            className="bg-[#1e2b45] hover:bg-[#2a3b5c] text-gray-100 border border-blue-500/20 px-4 py-3 text-l font-medium rounded-xl
              transition-all duration-200 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
              focus:ring-2 focus:ring-blue-500/20 focus:outline-none cursor-pointer disabled:opacity-50"
            key={connector.uid}
            onClick={() => connect({ connector })}
          >
            Connect MetaMask
          </button>
        ))
      )}
    </div>
  )
}

export default ConnectBtn
