import { useState } from 'react';
import { TokenSelect } from './TokenSelect';
import { Token } from '../../services/token';
import { ArrowDownUp } from 'lucide-react';

const SwapCard = () => {
  const [sellToken, setSellToken] = useState<Token>();
  const [buyToken, setBuyToken] = useState<Token>();
  const [isRotating, setIsRotating] = useState(false);

  const handleSwapClick = () => {
    setIsRotating(true);
    const tempToken = sellToken;
    setSellToken(buyToken);
    setBuyToken(tempToken);
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Heading */}
      <div className="mb-12">
        <h1 className="text-6xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Trade Smarter,
          </span>
          <br />
          <span className="text-white">Trade Faster.</span>
        </h1>
        <p className="text-gray-400 mt-4 text-xl">
          Experience seamless crypto trading
        </p>
      </div>

      <div className="w-full max-w-[464px] flex flex-col gap-2">
        {/* Sell Card */}
        <div className="bg-[#111827] rounded-2xl p-4 border border-blue-900/20">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Sell</span>
            {sellToken && (
              <span className="text-gray-400">
                ≈${(Number(sellToken.price) || 0).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center mt-1">
            <input 
              type="number" 
              placeholder="0" 
              className="text-4xl bg-transparent outline-none w-full text-white"
            />
            <TokenSelect
              selectedToken={sellToken}
              onSelect={setSellToken}
            />
          </div>
          {sellToken && (
            <div className="text-left text-sm text-gray-500 mt-1">
              24h: <span className={`${(sellToken.priceChange24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {sellToken.priceChange24h?.toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleSwapClick}
            className="p-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all duration-200 
                     transform hover:scale-110 shadow-lg hover:shadow-blue-500/25
                     border border-blue-400/20 group"
          >
            <ArrowDownUp 
              className={`w-5 h-5 text-white transition-transform duration-500 
                       ${isRotating ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Buy Card */}
        <div className="bg-[#111827] rounded-2xl p-4 border border-blue-900/20">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Buy</span>
            {buyToken && (
              <span className="text-gray-400">
                ≈${(Number(buyToken.price) || 0).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center mt-1">
            <input 
              type="number" 
              placeholder="0" 
              className="text-4xl bg-transparent outline-none w-full text-white"
            />
            <TokenSelect
              selectedToken={buyToken}
              onSelect={setBuyToken}
            />
          </div>
          {buyToken && (
            <div className="text-left text-sm text-gray-500 mt-1">
              24h: <span className={`${(buyToken.priceChange24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {buyToken.priceChange24h?.toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        {/* Get Started Button */}
        <button 
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-medium
                   transition-colors duration-200 rounded-xl"
        >
          Get started
        </button>

        {/* Description Text */}
        <p className="text-gray-400 mt-6 text-center">
          The largest onchain marketplace. Buy and sell crypto
          <br />
          on Ethereum and 11+ other chains.
        </p>
      </div>
    </div>
  );
};

export default SwapCard;