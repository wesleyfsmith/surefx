pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract COPC is ERC20 {
    uint8 private decimalPositions;

    constructor(
        string memory name,
        string memory symbol,
        uint8 _decimalPositions
    ) ERC20(name, symbol) {
        decimalPositions = _decimalPositions;
    }

    function mint(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return decimalPositions;
    }
}
