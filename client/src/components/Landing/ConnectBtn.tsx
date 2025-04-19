import {useConnect, useAccount, useDisconnect} from "wagmi";



const Connectbtn = ()=>{
    const { connectors, connect, isLoading, pendingConnector } = useConnect();
    const {address, isConnected} = useAccount();
    const {disconnect} = useDisconnect();



    const metamaskConnector = connectors.find((connector)=> connector.id === "metaMask");
    
    return (
        <>
         <div>
            {
                isConnected  ? (
                    <>
                    
                    <p className="text-white">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white border border-red-500/20 px-6 py-3 text-sm font-medium rounded-xl
              transition-all duration-200 hover:scale-105 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]
              focus:ring-2 focus:ring-red-500/20 focus:outline-none cursor-pointer"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
                    </>
                ) : (
                    <>
                    <button
          className="bg-[#1e2b45] hover:bg-[#2a3b5c] text-white border border-blue-500/20 px-6 py-5 text-sm font-medium rounded-xl
            transition-all duration-200 hover:scale-105 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
            focus:ring-2 focus:ring-blue-500/20 focus:outline-none cursor-pointer disabled:opacity-50"
          onClick={() => {
            if(metamaskConnector){
                connect({ connector : metamaskConnector})
            }
          }}
          disabled={!metamaskConnector || isLoading}
        >
          {isLoading && pendingConnector?.id === 'metaMask'
            ? 'Connecting...'
            : 'Connect MetaMask'}
        </button>
                    </>
                )
            }

         </div>
        </>
    )
}

export default Connectbtn;



