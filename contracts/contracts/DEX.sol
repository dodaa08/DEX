// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Mytoken.sol";

contract SimpleDEX {
    IERC20 public tokenA;
    IERC20 public tokenB;
    LPToken public lpToken;  // what's this ?

    uint256 public reserveA;  // No idea
    uint256 public reserveB;

    address public owner;
    uint256 public constant FEE_PERCENT = 3; // 0.3% fee  for swap

    constructor(address _tokenA, address _tokenB, address _lpToken) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        lpToken = LPToken(_lpToken);
        owner = msg.sender;
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external {
        require(tokenA.transferFrom(msg.sender, address(this), amountA), "Transfer failed for tokenA");
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "Transfer failed for tokenB");

        uint256 liquidity;

        if (reserveA == 0 && reserveB == 0) {
            liquidity = sqrt(amountA * amountB);
        } else {
            liquidity = min((amountA * lpToken.totalSupply()) / reserveA, (amountB * lpToken.totalSupply()) / reserveB);
        }

        require(liquidity > 0, "Insufficient liquidity minted");
        lpToken.mint(msg.sender, liquidity);

        reserveA += amountA;
        reserveB += amountB;
    }

    function swapAForB(uint256 amountAIn) external {
        require(tokenA.transferFrom(msg.sender, address(this), amountAIn), "Transfer failed");

        uint256 amountInWithFee = (amountAIn * (1000 - FEE_PERCENT)) / 1000;
        uint256 amountBOut = (amountInWithFee * reserveB) / (reserveA + amountInWithFee);

        require(tokenB.transfer(msg.sender, amountBOut), "TokenB transfer failed");

        reserveA += amountAIn;
        reserveB -= amountBOut;
    }

    function swapBForA(uint256 amountBIn) external {
        require(tokenB.transferFrom(msg.sender, address(this), amountBIn), "Transfer failed");

        uint256 amountInWithFee = (amountBIn * (1000 - FEE_PERCENT)) / 1000;
        uint256 amountAOut = (amountInWithFee * reserveA) / (reserveB + amountInWithFee);

        require(tokenA.transfer(msg.sender, amountAOut), "TokenA transfer failed");

        reserveB += amountBIn;
        reserveA -= amountAOut;
    }

    function getReserves() external view returns (uint256, uint256) {
        return (reserveA, reserveB);
    }

    // Helper math functions
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    function sqrt(uint256 y) internal pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
}
