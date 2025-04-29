import { useState } from "react";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { motion } from "framer-motion";
import { ethers } from "ethers";


const dexABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenA",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_tokenB",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_lpToken",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "FEE_PERCENT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }
    ],
    "name": "addLiquidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getReserves",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lpToken",
    "outputs": [
      {
        "internalType": "contract LPToken",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reserveA",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reserveB",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountAIn",
        "type": "uint256"
      }
    ],
    "name": "swapAForB",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountBIn",
        "type": "uint256"
      }
    ],
    "name": "swapBForA",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenA",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenB",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// ERC20 ABI for token approval
const erc20ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];




const AddLiquidity = ()=>{
  const [open, setOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'swap' | 'liquidity'>('liquidity');
  const [hovered, setHovered] = useState<number | null>(null);

  const pools = [
    {
      id: 1,
      tokenA: "ETH",
      src : "https://imgs.search.brave.com/BqGwLv-W0AFOyIptznGImwdFl6d6vcZvA26tkimKNfQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC90cm9uLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni0xdmFhMjBzMi5w/bmc",
      tokenB: "USDT",
      volume: "2.5M",
      price: "1 ETH = 2000 USDT",
      tvl: "$3.2M",
      apy: "15.5%"
    },
    {
      id: 2,
      tokenA: "BTC",
      tokenB: "ETH",
      src : "https://imgs.search.brave.com/eLGguyu71gkWoRpyhEEsX17TqMPardjjXE5ilcoCc-E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY29pbmdlY2tv/LmNvbS9zL2dlY2tv/LTQwNWVkNTNiNDc1/ZjYxMjQ0MTMwZjk1/NzQyYTA3ZGExNWY3/YWMzMGZlZWVkNTA3/MjgxMmFlNWMyZDcz/YjYxOTQuc3Zn",
      volume: "1.8M",
      price: "1 BTC = 15 ETH",
      tvl: "$5.1M",
      apy: "12.8%"
    },
    {
      id: 3,
      tokenA: "MATIC",
      tokenB: "USDC",
      src : "https://imgs.search.brave.com/sv_L9vtAKbobgiCfiK_WqZTYvp3QpYyEflZ0RaVVOBY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9kYXNoLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1leWwxcDlpOS5w/bmc",
      volume: "0.9M",
      price: "1 MATIC = 0.8 USDC",
      tvl: "$1.5M",
      apy: "18.2%"
    }
  ];

  const { writeContract, data: hash } = useWriteContract();
  const { data: tokenAAddress } = useReadContract({
    address: "0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1",
    abi: dexABI,
    functionName: "tokenA",
  }) as { data: `0x${string}` };

  const { data: tokenBAddress } = useReadContract({
    address: "0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1",
    abi: dexABI,
    functionName: "tokenB",
  }) as { data: `0x${string}` };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleAddLiquidity = async () => {
    if (!amountA || !amountB || !address || !tokenAAddress || !tokenBAddress) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Convert amounts to wei
      const amountAWei = ethers.parseUnits(amountA, 18);
      const amountBWei = ethers.parseUnits(amountB, 18);

      // Approve tokens
      await writeContract({
        address: tokenAAddress,
        abi: erc20ABI,
        functionName: "approve",
        args: ["0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1", amountAWei],
      });

      await writeContract({
        address: tokenBAddress,
        abi: erc20ABI,
        functionName: "approve",
        args: ["0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1", amountBWei],
      });

      // Add liquidity
      await writeContract({
        address: "0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1",
        abi: dexABI,
        functionName: "addLiquidity",
        args: [amountAWei, amountBWei],
      });

    } catch (err: any) {
      console.error("Add liquidity failed:", err);
      setError(err.message || "Failed to add liquidity");
      setLoading(false);
    }
  };

  // Handle transaction confirmation
  if (isConfirmed) {
    setSuccess(true);
    setLoading(false);
    setAmountA("");
    setAmountB("");
  }


  const handleOpen = ()=>{
    setOpen((e)=>!e);
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 py-20">
        {!open && pools.map((pool) => (
          <motion.button 
            key={pool.id}
            onClick={handleOpen}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHovered(pool.id)}
            onHoverEnd={() => setHovered(null)}
            className="w-full max-w-2xl"
          >
            <div className="relative flex items-center justify-between bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-900/70 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"
                animate={{
                  opacity: hovered === pool.id ? 1 : 0,
                  scale: hovered === pool.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Token pair info */}
              <div className="flex items-center space-x-6 relative z-10">
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: hovered === pool.id ? 360 : 0,
                    }}
                    transition={{ duration: 1, ease: "linear" }}
                  >
                    <img 
                      src={pool.src} 
                      className="h-16 w-16 rounded-xl object-cover border-2 border-gray-700/50"
                      alt="Token Pair"
                    />
                  </motion.div>
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white">{pool.tokenA}/{pool.tokenB}</h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="py-1.5 px-4 rounded-xl bg-gray-700/50 text-white text-lg font-medium">
                      Vol ${pool.volume}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Click to add liquidity
                    </div>
                  </div>
                </div>
              </div>

              {/* Pool stats */}
              <div className="flex items-center space-x-8 relative z-10">
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Price</div>
                  <div className="text-white font-medium">{pool.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">TVL</div>
                  <div className="text-white font-medium">{pool.tvl}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">APY</div>
                  <div className="text-green-400 font-medium">{pool.apy}</div>
                </div>
                <motion.div
                  animate={{
                    x: hovered === pool.id ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>

              {/* Floating particles */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: hovered === pool.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
                    initial={{
                      x: Math.random() * 100,
                      y: Math.random() * 100,
                    }}
                    animate={{
                      x: Math.random() * 100,
                      y: Math.random() * 100,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.button>
        ))}

        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('swap')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'swap'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Swap
                  </button>
                  <button
                    onClick={() => setActiveTab('liquidity')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'liquidity'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Liquidity
                  </button>
                </div>
                <button
                  onClick={handleOpen}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {activeTab === 'swap' ? (
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">You Pay</span>
                      <span className="text-sm text-gray-400">Balance: 0.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="bg-transparent text-white text-xl w-full focus:outline-none"
                      />
                      <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                        <span className="text-white">TKA</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center -my-2">
                    <div className="bg-gray-900 rounded-full p-2 border border-gray-700">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">You Receive</span>
                      <span className="text-sm text-gray-400">Balance: 0.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="bg-transparent text-white text-xl w-full focus:outline-none"
                      />
                      <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                        <span className="text-white">TKB</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                  >
                    Swap
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-900/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-white">Pool Information</h3>
                      <div className="text-sm text-gray-400">24h Volume: $0.3</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Current Price</div>
                        <div className="text-lg font-medium text-white">1 TKA = 1.5 TKB</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Your Share</div>
                        <div className="text-lg font-medium text-white">0%</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Token A Amount</span>
                        <span className="text-sm text-gray-400">Balance: 0.0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <input
                          type="number"
                          value={amountA}
                          onChange={(e) => setAmountA(e.target.value)}
                          placeholder="0.0"
                          className="bg-transparent text-white text-xl w-full focus:outline-none"
                        />
                        <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                          <span className="text-white">TKA</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center -my-2">
                      <div className="bg-gray-900 rounded-full p-2 border border-gray-700">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Token B Amount</span>
                        <span className="text-sm text-gray-400">Balance: 0.0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <input
                          type="number"
                          value={amountB}
                          onChange={(e) => setAmountB(e.target.value)}
                          placeholder="0.0"
                          className="bg-transparent text-white text-xl w-full focus:outline-none"
                        />
                        <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                          <span className="text-white">TKB</span>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {success && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm"
                      >
                        Liquidity added successfully!
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddLiquidity}
                      disabled={!isConnected || loading || isConfirming || !amountA || !amountB}
                      className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-colors ${
                        !isConnected || loading || isConfirming || !amountA || !amountB
                          ? "bg-gray-800 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Approving Tokens...</span>
                        </div>
                      ) : isConfirming ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Adding Liquidity...</span>
                        </div>
                      ) : !isConnected ? (
                        "Connect Wallet"
                      ) : (
                        "Add Liquidity"
                      )}
                    </motion.button>

                    {hash && (
                      <div className="mt-4 text-sm text-gray-400 text-center">
                        Transaction Hash: {hash.slice(0, 6)}...{hash.slice(-4)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};


export default AddLiquidity;













