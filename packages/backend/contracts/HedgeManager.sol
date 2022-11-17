//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HedgeManager is Ownable {
    uint256 private usdToCopRate;

    IERC20 private usdcContract;
    IERC20 private copcContract;

    uint256 private platformFee;

    uint256 private copcPool;

    mapping(address => uint256) private copcBalances;

    uint256 private futureId;

    mapping(address => bool) private allowList;

    enum ConversionDirection{ USD_TO_COP, COP_TO_USD }

    struct Hedge {
        uint256 id;
        address owner;
        uint256 amount;
        uint256 collateral;
        uint256 startDate;
        uint256 duration;
        uint256 lockedInRate;
    }

    mapping(address => uint256) private ownerToFuture;
    mapping(uint256 => address) private futureToOwner;

    constructor(address _usdcAddress, address _copcAddress) {
        usdcContract = IERC20(_usdcAddress);
        copcContract = IERC20(_copcAddress);
        platformFee = 3;
    }

    // set the curret exchange rate of usd -> pesos
    function setExchangeRate(uint256 rate) public onlyOwner {
        usdToCopRate = rate;
    }

    //calculates the collateral requirement in USD
    function getCollateralRequirement(uint256 _amount)
        public
        view
        returns(uint256)
    {
        //TODO safemath
        //TODO maybe make this variable for each user that can open contracts
        return _amount * (10 / 100);
    }

    function getFee(uint256 _amount)
        public
        view
        returns(uint256)
    {
        //TODO safemath
        return _amount * (platformFee / 100);
    }

    function getCopcAmountForExchangeRate(uint256 _amountUsd)
        public
        view
        returns(uint256)
    {
        return _amountUsd * usdToCopRate;
    }

    //open new USD hedging contract
    function createUSDHedge(uint256 _duration, uint256 _amountUsd)
        public
        returns (uint256)
    {
        futureId++;
        uint256 collateralRequirement = getCollateralRequirement(_amountUsd);
        uint256 feeRequirement = getFee(_amountUsd);
        uint256 totalUsdcAmount = _amountUsd + collateralRequirement + feeRequirement;

        //must have the required balance of usdc
        require(usdcContract.balanceOf(msg.sender) >= totalUsdcAmount);

        //the pool needs to have the required amount of copc that they want to hedge against
        require(copcContract.balanceOf(address(this)) >= getCopcAmountForExchangeRate(_amountUsd));




        Future future = Future(futureId, msg.sender, _amount, )
        // future[msg.sender] = 1;
        return 1;
    }

    // provide liquidity for copc
    function depositCopc(uint256 _amount) public {
        copcContract.transferFrom(msg.sender, address(this), _amount);
        copcBalances[msg.sender] = copcBalances[msg.sender] + _amount; 
    }

    function stake() public returns (uint256) {
        ownerToContract[msg.sender] = 1;
        return 2;
    }


}
