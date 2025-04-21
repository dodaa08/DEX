import { useState, useEffect } from "react";
import { useWallet } from "./useWallet";
import { getContracts } from "../lib/contracts";
import { ethers } from "ethers";

export function useBalances() {
  const { address, isConnected } = useWallet();
  const [balances, setBalances] = useState({
    tokenA: "0",
    tokenB: "0"
  });
  const [loading, setLoading] = useState(false);

  const fetchBalances = async () => {
    if (!isConnected || !address) return;

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contracts = getContracts(provider);

      const [balanceA, balanceB] = await Promise.all([
        contracts.tokenA.balanceOf(address),
        contracts.tokenB.balanceOf(address)
      ]);

      setBalances({
        tokenA: ethers.formatEther(balanceA),
        tokenB: ethers.formatEther(balanceB)
      });
    } catch (err) {
      console.error("Error fetching balances:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [address, isConnected]);

  return {
    balances,
    loading,
    refresh: fetchBalances
  };
} 