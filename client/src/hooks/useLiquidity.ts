import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { getContracts } from "../lib/contracts";
import { ethers } from "ethers";

export const useLiquidity = () => {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLiquidity = async (amountA: string, amountB: string) => {
    if (!walletClient || !address) {
      setError("Wallet not connected");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const { dex, tokenA, tokenB } = getContracts(provider);
      const signer = await provider.getSigner();

      // Approve tokens for DEX
      const approveATx = await tokenA.connect(signer).approve(dex.target as string, amountA);
      await approveATx.wait();

      const approveBTx = await tokenB.connect(signer).approve(dex.target as string, amountB);
      await approveBTx.wait();

      // Add liquidity
      const addLiquidityTx = await dex.connect(signer).addLiquidity(amountA, amountB);
      await addLiquidityTx.wait();

    } catch (err: any) {
      console.error("Add liquidity failed:", err);
      setError(err.message || "Failed to add liquidity");
    } finally {
      setLoading(false);
    }
  };

  return { addLiquidity, loading, error };
}; 