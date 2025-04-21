import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { getContracts, getAmountOut } from "../lib/contracts";
import { ethers } from "ethers";

export function useSwap() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const swap = async (fromToken: string, toToken: string, amount: string) => {
    if (!isConnected || !address || !walletClient) {
      setError("Please connect your wallet");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const provider = new ethers.BrowserProvider(walletClient.transport);
      const contracts = getContracts(provider);

      // Get the pair contract
      const pair = await contracts.getPair(fromToken, toToken);
      
      // Get reserves and token0
      const [reserve0, reserve1] = await Promise.all([
        pair.reserve0(),
        pair.reserve1()
      ]);
      const token0 = await pair.token0();
      
      // Calculate amounts
      const amountIn = ethers.parseEther(amount);
      const amountOut = getAmountOut(
        amountIn,
        fromToken === token0 ? reserve0 : reserve1,
        fromToken === token0 ? reserve1 : reserve0
      );

      // Approve token spending
      const tokenContract = contracts.getToken(fromToken);
      const approveTx = await tokenContract.approve(pair.target, amountIn);
      await approveTx.wait();

      // Execute swap
      const swapTx = await pair.swap(fromToken, amountIn);
      await swapTx.wait();

      return swapTx.hash;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Swap failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    swap,
    loading,
    error,
    isConnected
  };
} 