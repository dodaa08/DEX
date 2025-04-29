import { Activity, ChevronDown } from "lucide-react";
import ConnectBtn from "./ConnectBtn";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, HandCoins } from "lucide-react";

interface HeaderC {
  onShowTrade: () => void;
  onShowMint: () => void;
  onShowPool: () => void;
}

const cryptoIcons = [
  {
    name: "Bitcoin",
    icon: "https://imgs.search.brave.com/0FXxRmhHFYPEGBpJL9cP0ZERuHONaYcINfN28ezoHJE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzcwLzkxLzEz/LzM2MF9GXzExNzA5/MTEzNzdfaHRWVGxm/VFJhV0VnZkxkYnVB/WDh0d0JOVm1vY05t/ZFguanBn",
    symbol: "BTC"
  },
  {
    name: "Ethereum",
    icon: "https://imgs.search.brave.com/PNOo568ygD9SRI_1SyGxZn3jKt8VmcfHA2WRxI_ZIrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/cy5pY29uYXJjaGl2/ZS5jb20vaWNvbnMv/Y2pkb3duZXIvY3J5/cHRvY3VycmVuY3kt/ZmxhdC81MTIvRXRo/ZXJldW0tRVRILWlj/b24ucG5n",
    symbol: "ETH"
  },
  {
    name: "Solana",
    icon: "https://imgs.search.brave.com/zI507M1_c7NcAVaIFgFBLSyl3LHJ02c-1SbjJIiM0kQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvNjAwMS82MDAx/NTI3LnBuZw",
    symbol: "SOL"
  },
  {
    name: "Polygon",
    icon: "https://imgs.search.brave.com/mw87nqFPLU-WYep58gArW3YaWXZEpeZQTq4nnBTtEfE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvYXB0/b3MtM2QtaWNvbi1k/b3dubG9hZC1pbi1w/bmctYmxlbmQtZmJ4/LWdsdGYtZmlsZS1m/b3JtYXRzLS1iaXRj/b2luLWxvZ28tYXB0/LWN1cnJlbmN5LWZp/bmFuY2UtZmluYW5j/aWFsLWdsYXNzLWNy/eXB0by1jb2luLXZv/bC0xLXBhY2stc2Np/ZW5jZS10ZWNobm9s/b2d5LWljb25zLTY4/NzYxMjQucG5nP2Y9/d2VicA",
    symbol: "MATIC"
  }
];

const Header: FC<HeaderC> = ({ onShowTrade, onShowMint, onShowPool }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Swap", onClick: onShowTrade, icon: "🔄" },
    { label: "Liquidity", onClick: onShowPool, icon: "💧" },
    { label : "Lend", onClick : onShowPool,   icon: <Banknote className="w-5 h-5" />  },
    { label : "Borrow", onClick : onShowPool ,  icon: <HandCoins className="w-5 h-5" /> }
  ];

  return (
    <div className="flex justify-between items-center w-full">
      {/* Left Nav */}
      <div className="flex gap-10 items-center">
        <div className="flex items-center gap-5 text-white cursor-pointer">
          <Activity className="w-5 h-5" />
          <Link to="/">
            <button className="text-2xl text-blue-400 font-sans cursor-pointer">OrbitalSwap</button>
          </Link>
        </div>

        <div className="relative">
          <button 
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-xl text-gray-500 font-sans cursor-pointer mt-1 hover:text-blue-400 transition-colors"
          >
            Menu
            <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
                className="absolute top-full left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/20 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-blue-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Popular Tokens</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {cryptoIcons.map((crypto, index) => (
                      <motion.div
                        key={crypto.symbol}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-shrink-0"
                      >
                        <img
                          src={crypto.icon}
                          alt={crypto.name}
                          className="w-8 h-8 rounded-full object-contain"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={item.onClick}
                    className="w-full px-4 py-3 text-left text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors flex items-center gap-3"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <ConnectBtn />
      </div>
    </div>
  );
};

export default Header;




// import { Activity, ChevronDown, Banknote, HandCoins } from "lucide-react";
// import ConnectBtn from "./ConnectBtn";
// import { FC, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "sonner";

// interface HeaderC {
//   onShowTrade: () => void;
//   onShowMint: () => void;
//   onShowPool: () => void;
// }


// const cryptoIcons = [
//   {
//     name: "Bitcoin",
//     icon: "https://imgs.search.brave.com/0FXxRmhHFYPEGBpJL9cP0ZERuHONaYcINfN28ezoHJE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzcwLzkxLzEz/LzM2MF9GXzExNzA5/MTEzNzdfaHRWVGxm/VFJhV0VnZkxkYnVB/WDh0d0JOVm1vY05t/ZFguanBn",
//     symbol: "BTC"
//   },
//   {
//     name: "Ethereum",
//     icon: "https://imgs.search.brave.com/PNOo568ygD9SRI_1SyGxZn3jKt8VmcfHA2WRxI_ZIrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/cy5pY29uYXJjaGl2/ZS5jb20vaWNvbnMv/Y2pkb3duZXIvY3J5/cHRvY3VycmVuY3kt/ZmxhdC81MTIvRXRo/ZXJldW0tRVRILWlj/b24ucG5n",
//     symbol: "ETH"
//   },
//   {
//     name: "Solana",
//     icon: "https://imgs.search.brave.com/zI507M1_c7NcAVaIFgFBLSyl3LHJ02c-1SbjJIiM0kQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvNjAwMS82MDAx/NTI3LnBuZw",
//     symbol: "SOL"
//   },
//   {
//     name: "Polygon",
//     icon: "https://imgs.search.brave.com/mw87nqFPLU-WYep58gArW3YaWXZEpeZQTq4nnBTtEfE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvYXB0/b3MtM2QtaWNvbi1k/b3dubG9hZC1pbi1w/bmctYmxlbmQtZmJ4/LWdsdGYtZmlsZS1m/b3JtYXRzLS1iaXRj/b2luLWxvZ28tYXB0/LWN1cnJlbmN5LWZp/bmFuY2UtZmluYW5j/aWFsLWdsYXNzLWNy/eXB0by1jb2luLXZv/bC0xLXBhY2stc2Np/ZW5jZS10ZWNobm9s/b2d5LWljb25zLTY4/NzYxMjQucG5nP2Y9/d2VicA",
//     symbol: "MATIC"
//   }
// ];

// const Header: FC<HeaderC> = ({ onShowTrade, onShowMint, onShowPool }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const menuItems = [
//     { label: "Swap", onClick: onShowTrade, icon: "🔄" },
//     { label: "Liquidity", onClick: onShowPool, icon: "💧" },
//     { 
//       label: "Lend", 
//       onClick: () => {
//         toast.info("Lending feature coming soon!", {
//           description: "Stay tuned for our lending platform launch.",
//           duration: 3000,
//         });
//       }, 
//       icon: <Banknote className="w-5 h-5" /> 
//     },
//     { 
//       label: "Borrow", 
//       onClick: () => {
//         toast.info("Borrowing feature coming soon!", {
//           description: "Stay tuned for our borrowing platform launch.",
//           duration: 3000,
//         });
//       }, 
//       icon: <HandCoins className="w-5 h-5" /> 
//     }
//   ];

//   return (
//     <div className="flex justify-between items-center w-full">
//       {/* Left Nav */}
//       <div className="flex gap-10 items-center">
//         <div className="flex items-center gap-5 text-white cursor-pointer">
//           <Activity className="w-5 h-5" />
//           <Link to="/">
//             <button className="text-2xl text-blue-400 font-sans cursor-pointer">OrbitalSwap</button>
//           </Link>
//         </div>

//         <div className="relative">
//           <button 
//             onMouseEnter={() => setIsMenuOpen(true)}
//             onMouseLeave={() => setIsMenuOpen(false)}
//             className="flex items-center gap-2 text-xl text-gray-500 font-sans cursor-pointer mt-1 hover:text-blue-400 transition-colors"
//           >
//             Menu
//             <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
//           </button>

//           <AnimatePresence>
//             {isMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.2 }}
//                 onMouseEnter={() => setIsMenuOpen(true)}
//                 onMouseLeave={() => setIsMenuOpen(false)}
//                 className="absolute top-full left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-xl border border-blue-500/20 overflow-hidden z-50"
//               >
//                 <div className="p-4 border-b border-blue-500/20">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm text-gray-400">Popular Tokens</span>
//                   </div>
//                   <div className="flex gap-2 overflow-x-auto pb-2">
//                     {cryptoIcons.map((crypto, index) => (
//                       <motion.div
//                         key={crypto.symbol}
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="flex-shrink-0"
//                       >
//                         <img
//                           src={crypto.icon}
//                           alt={crypto.name}
//                           className="w-8 h-8 rounded-full object-contain"
//                         />
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 {menuItems.map((item, index) => (
//                   <motion.button
//                     key={item.label}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     onClick={item.onClick}
//                     className="w-full px-4 py-3 text-left text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors flex items-center gap-3"
//                   >
//                     {typeof item.icon === 'string' ? (
//                       <span className="text-xl">{item.icon}</span>
//                     ) : (
//                       item.icon
//                     )}
//                     <span>{item.label}</span>
//                   </motion.button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <div>
//         <ConnectBtn />
//       </div>
//     </div>
//   );
// };

// export default Header;
