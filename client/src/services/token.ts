// services/tokens.ts
import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const getTokenData = async (tokenId: string) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/simple/price?ids=${tokenId}&vs_currencies=usd&include_24hr_change=true`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
};

// For token metadata (including images)
export const getTokenMetadata = async (tokenId: string) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/${tokenId}?localization=false&tickers=false&community_data=false&developer_data=false`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
};

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
  price?: number;
  priceChange24h?: number;
}