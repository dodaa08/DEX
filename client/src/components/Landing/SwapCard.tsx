import { useState } from "react";
import { ArrowDown, ArrowUpDown, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useAccount } from "wagmi";
import { useSwap } from "../../hooks/useSwap";
import { motion } from "framer-motion";

const SwapCard = () => {
  const { isConnected } = useAccount();
  const { swap, loading, error } = useSwap();
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleAmountChange = (value: string, isFrom: boolean) => {
    if (/^\d*\.?\d*$/.test(value)) {
      if (isFrom) {
        setFromAmount(value);
        // Here you would calculate the toAmount based on the pair's reserves
        // For now, we'll just set a placeholder
        setToAmount((parseFloat(value) * 0.95).toString());
      } else {
        setToAmount(value);
        // Here you would calculate the fromAmount based on the pair's reserves
        setFromAmount((parseFloat(value) / 0.95).toString());
      }
    }
  };

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) return;
    
    try {
      // Replace these with your actual token addresses
      const tokenA = "0xBD8923A53d7f8C719A0E81AfF3a876595ACdb7C7";
      const tokenB = "0x42C960EaED9a6f6422DAf5077de1Cb0b8161aca7";
      
      const txHash = await swap(tokenA, tokenB, fromAmount);
      console.log("Swap successful:", txHash);
      
      // Reset amounts after successful swap
      setFromAmount("");
      setToAmount("");
    } catch (err) {
      console.error("Swap failed:", err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-10"
    >
      <div className="flex justify-center">  
        <h1 className="text-2xl text-gray-500">TradeFlow</h1>
      </div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md mx-auto bg-[#1e2b45]/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-blue-500/20"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Swap</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-2 rounded-lg hover:bg-[#2a3b5c] transition-colors"
          >
            <Settings className="w-5 h-5 text-blue-400" />
          </motion.button>
        </div>

        {/* From Token */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#2a3b5c]/50 rounded-xl p-4 mb-4 border border-blue-500/10"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">From</span>
            <span className="text-sm text-gray-400">Balance: 0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleAmountChange(e.target.value, true)}
              className="bg-transparent text-white text-2xl w-full focus:outline-none"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-[#1e2b45] px-3 py-2 rounded-lg text-white hover:bg-[#2a3b5c] transition-colors"
            >
              {/* <img src="/eth.png" alt="ETH" className="w-6 h-6" /> */}
              <span>ETH</span>
              <ArrowDown className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Swap Button */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative my-2"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-[#1e2b45] p-2 rounded-full border-2 border-[#2a3b5c] hover:bg-[#2a3b5c] transition-colors">
              <ArrowUpDown className="w-5 h-5 text-blue-400" />
            </button>
          </div>
        </motion.div>

        {/* To Token */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#2a3b5c]/50 rounded-xl p-4 mb-6 border border-blue-500/10"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">To</span>
            <span className="text-sm text-gray-400">Balance: 0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => handleAmountChange(e.target.value, false)}
              className="bg-transparent text-white text-2xl w-full focus:outline-none"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-[#1e2b45] px-3 py-2 rounded-lg text-white hover:bg-[#2a3b5c] transition-colors"
            >
              {/* <img src="/usdc.png" alt="USDC" className="w-6 h-6" /> */}
              <span>USDC</span>
              <ArrowDown className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-red-500 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Swap Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSwap}
          disabled={!isConnected || !fromAmount || !toAmount || loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-lg font-medium
            transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Swapping..." : isConnected ? "Swap" : "Connect Wallet"}
        </motion.button>

        {/* Settings Panel */}
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-4 bg-[#2a3b5c]/50 rounded-xl border border-blue-500/10 overflow-hidden"
          >
            <h3 className="text-white font-medium mb-3">Transaction Settings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Slippage Tolerance</span>
                <div className="flex gap-2">
                  {["0.1%", "0.5%", "1%"].map((value) => (
                    <motion.button
                      key={value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-[#1e2b45] rounded-lg text-white hover:bg-[#2a3b5c]"
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transaction Deadline</span>
                <input
                  type="text"
                  placeholder="20"
                  className="w-20 bg-[#1e2b45] px-3 py-1 rounded-lg text-white focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SwapCard;