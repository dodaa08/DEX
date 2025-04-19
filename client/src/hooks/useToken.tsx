// hooks/useTokens.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTokens = () => {

  interface Token {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    logoURI: string;
    price?: number;
    priceChange24h?: number;
  }
  
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // Fetch token list from 1inch
        const response = await axios.get('https://api.1inch.io/v5.0/1/tokens');
        const tokenList = Object.values(response.data.tokens);

        // Fetch prices from CoinGecko
        const geckoIds = tokenList.slice(0, 100).map((token: any) => token.symbol.toLowerCase());
        const priceResponse = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${geckoIds.join(',')}&vs_currencies=usd&include_24hr_change=true`
        );

        // Combine data
        const tokensWithPrices = tokenList.map((token: any) => ({
          ...token,
          price: priceResponse.data[token.symbol.toLowerCase()]?.usd || 0,
          priceChange24h: priceResponse.data[token.symbol.toLowerCase()]?.usd_24h_change || 0
        }));

        setTokens(tokensWithPrices);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, loading };
};
