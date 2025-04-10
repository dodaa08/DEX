// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint amount) external returns (bool);
    function transfer(address to, uint amount) external returns (bool);
    function balanceOf(address user) external view returns (uint);
}

contract Pair {
    address public token0;
    address public token1;
    uint public reserve0;
    uint public reserve1;

    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    constructor(address _token0, address _token1) {
        token0 = _token0;
        token1 = _token1;
    }

    function _updateReserves() private {
        reserve0 = IERC20(token0).balanceOf(address(this));
        reserve1 = IERC20(token1).balanceOf(address(this));
    }

    function _min(uint a, uint b) private pure returns (uint) {
        return a < b ? a : b;
    }

    function addLiquidity(uint amount0, uint amount1) external {
        IERC20(token0).transferFrom(msg.sender, address(this), amount0);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1);

        uint liquidity;
        if (totalSupply == 0) {
            liquidity = _sqrt(amount0 * amount1); // Initial liquidity
        } else {
            liquidity = _min(
                (amount0 * totalSupply) / reserve0,
                (amount1 * totalSupply) / reserve1
            );
        }

        require(liquidity > 0, "Insufficient liquidity minted");
        balanceOf[msg.sender] += liquidity;
        totalSupply += liquidity;

        _updateReserves();
    }

    function removeLiquidity(uint liquidity) external {
        require(balanceOf[msg.sender] >= liquidity, "Not enough LP tokens");

        uint amount0 = (liquidity * reserve0) / totalSupply;
        uint amount1 = (liquidity * reserve1) / totalSupply;

        balanceOf[msg.sender] -= liquidity;
        totalSupply -= liquidity;

        IERC20(token0).transfer(msg.sender, amount0);
        IERC20(token1).transfer(msg.sender, amount1);

        _updateReserves();
    }

    function swap(address inputToken, uint amountIn) external {
        require(inputToken == token0 || inputToken == token1, "Invalid token");
        address outputToken = inputToken == token0 ? token1 : token0;

        IERC20(inputToken).transferFrom(msg.sender, address(this), amountIn);

        _updateReserves();
        uint inputReserve = inputToken == token0 ? reserve0 : reserve1;
        uint outputReserve = inputToken == token0 ? reserve1 : reserve0;

        uint amountInWithFee = amountIn * 997 / 1000;
        uint amountOut = (amountInWithFee * outputReserve) / (inputReserve + amountInWithFee);

        require(amountOut > 0, "Insufficient output");

        IERC20(outputToken).transfer(msg.sender, amountOut);
        _updateReserves();
    }

    function _sqrt(uint y) private pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
}
