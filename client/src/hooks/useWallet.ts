import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
      }
    } catch (err) {
      console.error("Failed to connect:", err);
      throw err;
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        try {
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (err) {
          console.error("Failed to check connection:", err);
        }
      }
    };

    checkConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAddress(accounts[0]);
        setIsConnected(true);
      }
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return {
    address,
    isConnected,
    connect,
    disconnect
  };
}
