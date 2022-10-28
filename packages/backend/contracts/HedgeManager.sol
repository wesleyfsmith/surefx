//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HedgeManager {

  struct Contract {
    address owner;
    uint256 amount;
    uint256 collateral;
    
  }

  mapping (address => uint256) private ownerToContract;
  mapping (uint256 => address) private contractToOwner;

  constructor() {
      
  }

  function CreateContract
    public view
    returns (uint256)
  {

  }

  function greet() public view returns (string memory) {
      return greeting;
  }

  function setGreeting(string memory _greeting) public {
      console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
      greeting = _greeting;
  }
}
