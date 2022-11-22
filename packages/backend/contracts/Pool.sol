pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Pool is Ownable {

  mapping(address => uint256) private collectedFees;
  mapping(address => uint256) private balances;

  constructor(address _erc20Address) {

  }

  function addLiquidity(address)
    public
    view
    returns (bool)
  {

  }

}