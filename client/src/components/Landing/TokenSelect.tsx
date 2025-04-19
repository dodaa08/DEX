import { useState } from 'react';
import { Token } from '../../services/token';
import {Button} from "../ui/button";
import { ChevronDown } from 'lucide-react';
import {useTokens} from "../../hooks/useToken";

interface TokenSelectProps {
  selectedToken?: Token;
  onSelect: (token: Token) => void;
}

export const TokenSelect = ({ selectedToken, onSelect }: TokenSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { tokens, loading } = useTokens();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 bg-[#1e2b45] hover:bg-[#2a3b5c] text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedToken ? (
          <>
            <img 
              src={selectedToken.logoURI} 
              alt={selectedToken.symbol} 
              className="w-6 h-6 rounded-full"
            />
            {selectedToken.symbol}
          </>
        ) : (
          'Select token'
        )}
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-[300px] max-h-[400px] overflow-y-auto bg-[#111827] rounded-xl border border-blue-900/20 shadow-lg">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search tokens..."
              className="w-full bg-[#1e2b45] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="divide-y divide-blue-900/10">
            {tokens.map((token) => (
              <button
                key={token.address}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#1e2b45] transition-colors"
                onClick={() => {
                  onSelect(token);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={token.logoURI} 
                    alt={token.symbol} 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-left">
                    <div className="text-white font-medium">{token.symbol}</div>
                    <div className="text-sm text-gray-400">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white">${token.price?.toFixed(2)}</div>
                  <div className={`text-sm ${(token.priceChange24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {token.priceChange24h?.toFixed(2)}%
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};