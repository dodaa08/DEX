import { useState } from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";



export const SwapCard = () => {
  const { isConnected, address } = useAccount();
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSwap = () => {
    setLoading(true);
    // Static swap logic will be added later
    setTimeout(() => {
      setLoading(false);
      setAmountIn("");
      setAmountOut("");
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-black rounded-2xl shadow-2xl p-6 border-2 border-gray-800">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Swap Tokens</h2>
            {isConnected && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-400"
              >
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-black rounded-xl p-4 border-2 border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white text-xl">Sell</label>
                <span className="text-gray-400 text-sm">Balance: 0.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={amountIn}
                  onChange={(e) => setAmountIn(e.target.value)}
                  placeholder="0"
                  className="w-full bg-black text-gray-200 text-2xl focus:outline-none"
                />
                <div className="flex items-center space-x-2 bg-black px-3 py-1 rounded-lg border-2 border-gray-800">
                  <span className="text-white">TKA</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border-2 border-gray-800">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-xl p-4 border-2 border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white text-xl">Buy</label>
                <span className="text-gray-400 text-sm">Balance: 0.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={amountOut}
                  onChange={(e) => setAmountOut(e.target.value)}
                  placeholder="0"
                  className="w-full bg-black text-gray-200 text-2xl focus:outline-none"
                />
                <div className="flex items-center space-x-2 bg-black px-3 py-1 rounded-lg border-2 border-gray-800">
                  <span className="text-white">TKB</span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSwap}
            disabled={!isConnected || loading || !amountIn || !amountOut}
            className={`w-full py-3 rounded-xl font-medium text-white transition-all duration-200 ${
              !isConnected || loading || !amountIn || !amountOut
                ? "bg-gray-800 cursor-not-allowed"
                : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Swapping...</span>
              </div>
            ) : !isConnected ? (
              "Connect Wallet"
            ) : (
              "Swap"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SwapCard;