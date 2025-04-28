import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { getContracts } from "../lib/contracts";
import { ethers } from "ethers";

export const useSwap = () => {
  const { data: walletClient } = useWalletClient(); 
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ensureWalletConnected() {
    if (!window.ethereum) throw new Error("No crypto wallet found");
  
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }
    return accounts[0]; // returns the first account
  }
  

  const swap = async (amountIn: string, amountOut: string, address: string) => {
    if (!walletClient || !address) {
      setError("Wallet not connected");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      await ensureWalletConnected(); // 👈 THIS LINE will ensure accounts are connected
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const { dex, tokenA } = getContracts(provider);
      const signer = await provider.getSigner();
  
      const approveTx = await tokenA.connect(signer).approve(dex.target as string, amountIn);
      await approveTx.wait();
  
      const swapTx = await dex.connect(signer).swapAForB(amountIn);
      await swapTx.wait();
  
    } catch (err: any) {
      console.error("Swap failed:", err);
      setError(err.message || "Swap failed");
    } finally {
      setLoading(false);
    }
  };
  

  return { swap, loading, error };
};
