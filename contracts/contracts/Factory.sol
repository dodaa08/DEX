// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Pair.sol";

contract Factory {
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, "Identical tokens");
        require(getPair[tokenA][tokenB] == address(0), "Pair exists");

        Pair newPair = new Pair(tokenA, tokenB);
        pair = address(newPair);

        getPair[tokenA][tokenB] = pair;
        getPair[tokenB][tokenA] = pair;
        allPairs.push(pair);
    }
}
