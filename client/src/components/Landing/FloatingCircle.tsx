import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const cryptoIcons = [
  {
    name: "Bitcoin",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025",
    symbol: "BTC"
  },
  {
    name: "Ethereum",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025",
    symbol: "ETH"
  },
  {
    name: "Solana",
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png?v=025",
    symbol: "SOL"
  },
  {
    name: "Polygon",
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025",
    symbol: "MATIC"
  },
  {
    name: "Avalanche",
    icon: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=025",
    symbol: "AVAX"
  },
  {
    name: "Cardano",
    icon: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=025",
    symbol: "ADA"
  },
  {
    name: "Polkadot",
    icon: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=025",
    symbol: "DOT"
  },
  {
    name: "Chainlink",
    icon: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=025",
    symbol: "LINK"
  }
];

const FloatingCircle = () => {
  const [items, setItems] = useState<Array<{ id: number; angle: number; icon: any }>>([]);

  useEffect(() => {
    // Generate positions in a circle
    const newItems = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 8, // Evenly space items in a circle
      icon: cryptoIcons[i]
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
      <div className="relative w-[600px] h-[600px]">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ 
              opacity: 0,
              scale: 0.5,
              rotate: item.angle
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.2, 0.8],
              rotate: [item.angle, item.angle + 360]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-250px)`,
            }}
            className="w-16 h-16"
          >
            <motion.div
              animate={{
                rotate: [-360, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-full h-full"
            >
              <img
                src={item.icon.icon}
                alt={item.icon.name}
                className="w-full h-full object-contain filter blur-[2px]"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FloatingCircle; 