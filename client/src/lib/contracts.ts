import { ethers } from "ethers";
import { SimpleDEX } from "../../../contracts/typechain-types/contracts/DEX.sol";
import { LPToken } from "../../../contracts/typechain-types/contracts/Mytoken.sol";
import { MintableToken } from "../../../contracts/typechain-types/contracts/Mint.sol";

// Contract ABIs
const dexABI = [
  "function swapAForB(uint256 amountAIn) external",
  "function swapBForA(uint256 amountBIn) external",
  "function addLiquidity(uint256 amountA, uint256 amountB) external",
  "function getReserves() external view returns (uint256, uint256)",
  "function tokenA() external view returns (address)",
  "function tokenB() external view returns (address)",
  "function lpToken() external view returns (address)"
];

const tokenABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

const lpTokenABI = [
  "function mint(address to, uint256 amount) public",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
];

// Contract addresses (replace with your deployed addresses)
const DEX_ADDRESS = "0x91020E58304c2dC3ef475b6a8a8b2341f2Bdf3f1"; // Your DEX contract address
const TOKEN_A_ADDRESS = "0xc1A5281209598225d75Ca55a65C00Dbc866279CD"; // Your TokenA address
const TOKEN_B_ADDRESS = "0xD03f8203F0ceCd1eF4207dAEb8f9Ff879acc3CD1"; // Your TokenB address
const LP_TOKEN_ADDRESS = "0xe1fe381f895f64cF8186f23EF12b6CF07E70a163"; // Your LP Token address


export const getContracts = (provider: ethers.BrowserProvider) => {
  const dex = new ethers.Contract(DEX_ADDRESS, dexABI, provider) as unknown as SimpleDEX;
  const tokenA = new ethers.Contract(TOKEN_A_ADDRESS, tokenABI, provider) as unknown as MintableToken;
  const tokenB = new ethers.Contract(TOKEN_B_ADDRESS, tokenABI, provider) as unknown as MintableToken;
  const lpToken = new ethers.Contract(LP_TOKEN_ADDRESS, lpTokenABI, provider) as unknown as LPToken;

  return {
    dex,
    tokenA,
    tokenB,
    lpToken
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
