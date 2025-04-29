// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;    

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MintableToken is Ownable, ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address tokenaddr, uint256 amount) public onlyOwner {
        _burn(tokenaddr, amount);
    }
}


// this is for minting the swap tokens..
