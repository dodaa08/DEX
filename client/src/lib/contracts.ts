import { ethers } from "ethers";
import { Factory, LPToken, Pair } from "../../../contracts/typechain-types";

// Contract ABIs
const factoryABI = [
  "function createPair(address tokenA, address tokenB) external returns (address pair)",
  "function getPair(address tokenA, address tokenB) external view returns (address pair)"
];

const pairABI = [
  "function addLiquidity(uint amount0, uint amount1) external",
  "function swap(uint amount0Out, uint amount1Out, address to) external",
  "function getReserves() external view returns (uint reserve0, uint reserve1)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)"
];

const tokenABI = [
  "function approve(address spender, uint amount) external returns (bool)",
  "function transfer(address to, uint amount) external returns (bool)",
  "function transferFrom(address from, address to, uint amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint)",
  "function decimals() external view returns (uint8)"
];

// Contract addresses (replace with your deployed addresses)
const FACTORY_ADDRESS = "0x6eeBb4Fd756E22C087cDa9B0dAD6c6308d341671";
const TOKEN_A_ADDRESS = "0xBD8923A53d7f8C719A0E81AfF3a876595ACdb7C7";
const TOKEN_B_ADDRESS = "0x42C960EaED9a6f6422DAf5077de1Cb0b8161aca7";

export const getContracts = (provider: ethers.BrowserProvider) => {
  const factory = new ethers.Contract(FACTORY_ADDRESS, factoryABI, provider) as unknown as Factory;
  
  const getPair = async (tokenA: string, tokenB: string) => {
    const pairAddress = await factory.getPair(tokenA, tokenB);
    if (pairAddress === ethers.ZeroAddress) {
      throw new Error("Pair does not exist");
    }
    return new ethers.Contract(pairAddress, pairABI, provider) as unknown as Pair;
  };

  const getToken = (address: string) => {
    return new ethers.Contract(address, tokenABI, provider) as unknown as LPToken;
  };

  return {
    factory,
    getPair,
    getToken,
    tokenA: getToken(TOKEN_A_ADDRESS),
    tokenB: getToken(TOKEN_B_ADDRESS)
  };
};

// Helper functions for swapping
export const getAmountOut = (amountIn: bigint, reserveIn: bigint, reserveOut: bigint): bigint => {
  const amountInWithFee = amountIn * BigInt(997);
  const numerator = amountInWithFee * reserveOut;
  const denominator = reserveIn * BigInt(1000) + amountInWithFee;
  return numerator / denominator;
};

export const getAmountIn = (amountOut: bigint, reserveIn: bigint, reserveOut: bigint): bigint => {
  const numerator = reserveIn * amountOut * BigInt(1000);
  const denominator = (reserveOut - amountOut) * BigInt(997);
  return (numerator / denominator) + BigInt(1);
}; 