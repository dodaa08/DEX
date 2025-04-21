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
  }
];

const FloatingCrypto = () => {
  const [items, setItems] = useState<Array<{ id: number; x: number; y: number; icon: any; size: number; blur: number }>>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    // Generate initial positions with varying sizes and blur
    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 60 + (i * 5), // Start at 60% and space them horizontally
      y: 30 + (i * 8), // Start at 30% and space them vertically
      icon: cryptoIcons[i],
      size: 1,
      blur: 0,
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ 
            x: `${item.x}%`,
            y: `${item.y}%`,
            opacity: 0,
            scale: 0.5,
            rotate: Math.random() * 360
          }}
          animate={{
            y: `${item.y + Math.random() * 5 - 2.5}%`,
            x: `${item.x + Math.random() * 5 - 2.5}%`,
            opacity: [0.5, 0.8, 0.5],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 360]
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute cursor-pointer pointer-events-auto"
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="relative w-20 h-20">
            <img
              src={item.icon.icon}
              alt={item.icon.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error(`Failed to load image: ${item.icon.icon}`);
                e.currentTarget.src = "https://via.placeholder.com/80";
              }}
            />
            {hoveredItem === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
              >
                {item.icon.name} ({item.icon.symbol})
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCrypto; 