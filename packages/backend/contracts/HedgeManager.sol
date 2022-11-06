//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HedgeManager {
    struct Contract {
        address owner;
        uint256 amount;
        uint256 collateral;
        uint256 duration;
    }

    mapping(address => uint256) private ownerToContract;
    mapping(uint256 => address) private contractToOwner;

    constructor() {}

    function createContract() public returns (uint256) {
        ownerToContract[msg.sender] = 1;
        return 1;
    }

    function stake() public returns (uint256) {
        ownerToContract[msg.sender] = 1;
        return 2;
    }

    // function greet() public view returns (string memory) {
    //     return greeting;
    // }

    // function setGreeting(string memory _greeting) public {
    //     console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    //     greeting = _greeting;
    // }
}
