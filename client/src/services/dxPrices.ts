// services/dexPrices.ts
import axios from 'axios';

const INCH_API = 'https://api.1inch.io/v5.0/1'; // 1 is for Ethereum mainnet

export const getTokenList = async () => {
  try {
    const response = await axios.get(`${INCH_API}/tokens`);
    return response.data.tokens;
  } catch (error) {
    console.error('Error fetching token list:', error);
    return null;
  }
};