// import { useState } from "react";
// import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
// import { motion } from "framer-motion";
// import { ethers } from "ethers";


// const dexABI = [
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "_tokenA",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "_tokenB",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "_lpToken",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "inputs": [],
//     "name": "FEE_PERCENT",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "amountA",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amountB",
//         "type": "uint256"
//       }
//     ],
//     "name": "addLiquidity",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getReserves",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "lpToken",
//     "outputs": [
//       {
//         "internalType": "contract LPToken",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "owner",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "reserveA",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "reserveB",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "amountAIn",
//         "type": "uint256"
//       }
//     ],
//     "name": "swapAForB",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "amountBIn",
//         "type": "uint256"
//       }
//     ],
//     "name": "swapBForA",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "tokenA",
//     "outputs": [
//       {
//         "internalType": "contract IERC20",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "tokenB",
//     "outputs": [
//       {
//         "internalType": "contract IERC20",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// // ERC20 ABI for token approval
// const erc20ABI = [
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "approve",
//     "outputs": [
//       {
//         "internalType": "bool",
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ];

// const AddLiquidity = () => {
//   const { isConnected, address } = useAccount();
//   const [amountA, setAmountA] = useState("");
//   const [amountB, setAmountB] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const { writeContract, data: hash } = useWriteContract();
//   const { data: tokenAAddress } = useReadContract({
//     address: "0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1",
//     abi: dexABI,
//     functionName: "tokenA",
//   }) as { data: `0x${string}` };

//   const { data: tokenBAddress } = useReadContract({
//     address: "0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1",
//     abi: dexABI,
//     functionName: "tokenB",
//   }) as { data: `0x${string}` };

//   const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
//     hash,
//   });

//   const handleAddLiquidity = async () => {
//     if (!amountA || !amountB || !address || !tokenAAddress || !tokenBAddress) return;

//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       // Convert amounts to wei
//       const amountAWei = ethers.parseUnits(amountA, 18);
//       const amountBWei = ethers.parseUnits(amountB, 18);

//       // Approve tokens
//       await writeContract({
//         address: tokenAAddress,
//         abi: erc20ABI,
//         functionName: "approve",
//         args: ["0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1", amountAWei],
//       });

//       await writeContract({
//         address: tokenBAddress,
//         abi: erc20ABI,
//         functionName: "approve",
//         args: ["0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1", amountBWei],
//       });

//       // Add liquidity
//       await writeContract({
//         address: "0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1",
//         abi: dexABI,
//         functionName: "addLiquidity",
//         args: [amountAWei, amountBWei],
//       });

//     } catch (err: any) {
//       console.error("Add liquidity failed:", err);
//       setError(err.message || "Failed to add liquidity");
//       setLoading(false);
//     }
//   };

//   // Handle transaction confirmation
//   if (isConfirmed) {
//     setSuccess(true);
//     setLoading(false);
//     setAmountA("");
//     setAmountB("");
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="flex justify-center py-10"
//     >
//       <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-xl font-medium text-white">Add Liquidity</h1>
//         </div>

//         <div className="space-y-4">
//           <div className="bg-black/30 rounded-2xl p-4">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm text-gray-400">Token A Amount</span>
//               <span className="text-sm text-gray-400">Balance: 0.0</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <input
//                 type="number"
//                 value={amountA}
//                 onChange={(e) => setAmountA(e.target.value)}
//                 placeholder="0.0"
//                 className="bg-transparent text-white text-xl w-full focus:outline-none"
//               />
//               <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-xl">
//                 <span className="text-white">TKA</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center -my-2">
//             <div className="bg-black/50 rounded-full p-2 border border-gray-800">
//               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//             </div>
//           </div>

//           <div className="bg-black/30 rounded-2xl p-4">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm text-gray-400">Token B Amount</span>
//               <span className="text-sm text-gray-400">Balance: 0.0</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <input
//                 type="number"
//                 value={amountB}
//                 onChange={(e) => setAmountB(e.target.value)}
//                 placeholder="0.0"
//                 className="bg-transparent text-white text-xl w-full focus:outline-none"
//               />
//               <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-xl">
//                 <span className="text-white">TKB</span>
//               </div>
//             </div>
//           </div>

//           {error && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm"
//             >
//               {error}
//             </motion.div>
//           )}

//           {success && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm"
//             >
//               Liquidity added successfully!
//             </motion.div>
//           )}

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleAddLiquidity}
//             disabled={!isConnected || loading || isConfirming || !amountA || !amountB}
//             className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-colors ${
//               !isConnected || loading || isConfirming || !amountA || !amountB
//                 ? "bg-gray-800 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? (
//               <div className="flex items-center justify-center space-x-2">
//                 <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
//                 <span>Approving Tokens...</span>
//               </div>
//             ) : isConfirming ? (
//               <div className="flex items-center justify-center space-x-2">
//                 <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
//                 <span>Adding Liquidity...</span>
//               </div>
//             ) : !isConnected ? (
//               "Connect Wallet"
//             ) : (
//               "Add Liquidity"
//             )}
//           </motion.button>

//           {hash && (
//             <div className="mt-4 text-sm text-gray-400 text-center">
//               Transaction Hash: {hash.slice(0, 6)}...{hash.slice(-4)}
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AddLiquidity;

import {useState} from "react";



const AddLiquidity = ()=>{
  const [open, setOpen] = useState(false);

  const handleOpen = ()=>{
    setOpen((e)=>!e);
  }

  return (
    <>
      <div className="flex flex justify-center py-40">
        {
          !open &&
          <button onClick={handleOpen}>

          <div className="flex bg-gray-800 py-2 px-5 gap-10 rounded-xl  transition duration-1000 cursor-pointer hover:bg-gray-900 ">
          <img  src="https://imgs.search.brave.com/x8SYE2ZhM3f6LwlJ9JfxxjRBkcs1-eYiS6qXxyz-3iI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iaXRj/b2luaXN0LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/NC9TY3JlZW5zaG90/LTIwMjMtMDQtMTkt/YXQtMTIuMDIuMTEt/UE0ucG5nP3Jlc2l6/ZT0zMzAsMzYx" className="h-12 rounded-xl"/>
          <div>
            <h1 className="text-xl text-white">TokenA/TokenB</h1>
            <div className="py-1 px-3 rounded-xl mt-2 border-gray-600 text-xl text-white border-2 w-max ">Vol 0.3</div>
          </div>
        </div>
          </button>
        }

        {
          open && 
          <>
          <div>

          </div>
          </>
        }
      </div>
    </>
  )
}


export default AddLiquidity;













