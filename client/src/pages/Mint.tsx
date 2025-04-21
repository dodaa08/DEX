import { useState } from "react";
import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import LPTokenAbi from "../abis/LPToken.json";

const tokenAddress = "0x27d39b33F5501E88e10a7b579AC19e39d12DE86B";

export default function MintToken() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const mintTokens = async () => {
    if (!walletClient || !address) return alert("Please connect your wallet");
    if (!amount || isNaN(Number(amount))) return alert("Please enter a valid amount");
    
    setIsLoading(true);
    setStatus("");

    const provider = new ethers.BrowserProvider(walletClient.transport);
    const signer = await provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, LPTokenAbi.abi, signer);

    try {
      const amountToMint = ethers.parseUnits(amount, 18);
      const tx = await tokenContract.mint(address, amountToMint);
      setStatus("Minting...");
      await tx.wait();
      setStatus("success");
      setAmount("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-max bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-blue-500/20"
      >
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center"
          >
            <span className="text-2xl">💰</span>
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-white">Mint Tokens</h2>
            <p className="text-gray-400">Mint new tokens to your wallet</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
            <label className="text-sm text-gray-400 mb-2 block">Amount to Mint</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-white text-xl w-full focus:outline-none"
              />
              <span className="text-gray-400">TOK</span>
            </div>
          </div>

          {status === "success" && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Tokens minted successfully!</span>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Minting failed. Please try again.</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={mintTokens}
            disabled={!isConnected || isLoading || !amount}
            className={`w-full py-3 rounded-xl text-lg font-medium transition-all duration-200
              ${isConnected 
                ? 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Minting...</span>
              </motion.div>
            ) : isConnected ? (
              "Mint Tokens"
            ) : (
              "Connect Wallet"
            )}
          </motion.button>

          {isConnected && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm text-gray-400"
            >
              Connected as: {address?.slice(0, 6)}...{address?.slice(-4)}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}



