import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { getContracts } from "../lib/contracts";
import { ethers } from "ethers";

export const useSwap = () => {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const swap = async (amountIn: string) => {
    if (!walletClient || !address) {
      setError("Wallet not connected");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const { dex, tokenA } = getContracts(provider);
      const signer = await provider.getSigner();

      // Approve token spending
      const approveTx = await tokenA.connect(signer).approve(
        await dex.getAddress(),
        ethers.parseUnits(amountIn, 18)
      );
      await approveTx.wait();

      // Execute swap
      const swapTx = await dex.connect(signer).swapAForB(
        ethers.parseUnits(amountIn, 18)
      );
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
