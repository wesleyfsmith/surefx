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

    uint256 private lockupTime = 24 days;
    uint256 private maxHedgeDuration = 90 days;

    mapping(address => uint256) private collectedFees;

    mapping(address => uint256) private copcBalances;

    uint256 private hedgeId;

    mapping(address => bool) private allowList;

    enum ConversionDirection {
        USD_TO_COP,
        COP_TO_USD
    }

    struct Hedge {
        ConversionDirection direction;
        uint256 id;
        address owner;
        uint256 amount;
        uint256 collateral;
        uint256 fee;
        uint256 startDate;
        uint256 duration;
        uint256 lockedInRate;
    }

    mapping(uint256 => Hedge) private hedges;
    mapping(uint256 => address) private hedgeToOwner;
    mapping(address => uint256[]) private ownerToHedgeIds;

    constructor(address _usdcAddress, address _copcAddress) {
        usdcContract = IERC20(_usdcAddress);
        copcContract = IERC20(_copcAddress);
        platformFee = 3;
    }

    function getCopcAddress()
        public
        view
        returns (address)
    {
        return address(copcContract);
    }

    // set the curret exchange rate of usd -> pesos
    function setExchangeRate(uint256 rate) public onlyOwner {
        usdToCopRate = rate;
    }

    function getExchangeRate()
        public view
        returns (uint256)
    {
        return usdToCopRate;
    }

    //calculates the collateral requirement in USD
    function getCollateralRequirement(uint256 _amount)
        public
        view
        returns (uint256)
    {
        //TODO safemath
        //TODO maybe make this variable for each user that can open contracts
        return _amount / 10;
    }

    function getFee(uint256 _amount) public view returns (uint256) {
        //TODO safemath
        return _amount * (platformFee / 100);
    }

    function getAmountForExchangeRate(
        uint256 _amount,
        ConversionDirection _direction
    ) public view returns (uint256) {
        if (_direction == ConversionDirection.USD_TO_COP) {
            return _amount * usdToCopRate;
        }
        if (_direction == ConversionDirection.COP_TO_USD) {
            return _amount / usdToCopRate;
        }
    }

    //TODO this probably doesnt scale but okay for now
    function getHedges(address _owner) public view returns (uint256[] memory) {
        return ownerToHedgeIds[_owner];
    }

    function liquidateHedge(uint256 _hedgeId) public returns (bool) {
        Hedge storage hedge = hedges[_hedgeId];
        if (block.timestamp >= hedge.startDate + hedge.duration + lockupTime) {

        }
    }

    function getHedgeExpiration(uint256 _hedgeId)
        public
        view
        returns (uint256)
    {

    }

    function closeHedge(uint256 _hedgeId)
        public
        returns (bool)
    {
        //person closing must be the hedge owner
        require(msg.sender == hedgeToOwner[_hedgeId], "only the owner may close the hedge");

        
    }

    //open new USD hedging contract
    function createHedge(
        ConversionDirection _direction,
        uint256 _duration,
        uint256 _amount
    ) public returns (bool) {
        hedgeId++;
        uint256 collateralRequirement = getCollateralRequirement(_amount);
        uint256 feeRequirement = getFee(_amount);
        uint256 totalAmount = _amount + collateralRequirement + feeRequirement;

        uint256 convertedAmount = getAmountForExchangeRate(_amount, _direction);

        //TODO contract has to have sufficient capital in the pool

        if (_direction == ConversionDirection.USD_TO_COP) {
            //must have the required balance of usdc
            require(
                usdcContract.balanceOf(msg.sender) >= totalAmount,
                "Insufficient USDC to open hedge"
            );

            //the pool needs to have the required amount of copc that they want to hedge against
            require(copcContract.balanceOf(address(this)) >= convertedAmount);
        }
        if (_direction == ConversionDirection.COP_TO_USD) {
            require(
                copcContract.balanceOf(msg.sender) >= totalAmount,
                "Insufficient COPC to open hedge"
            );
            require(copcContract.balanceOf(address(this)) >= convertedAmount);
        }

        require(
            _duration <= maxHedgeDuration,
            "cannot create a hedging contract longer than the maximum duration"
        );

        //xfer usdc and copc
        if (_direction == ConversionDirection.USD_TO_COP) {
            usdcContract.transferFrom(msg.sender, address(this), totalAmount);
            copcContract.transferFrom(
                address(this),
                msg.sender,
                convertedAmount
            );
        }
        if (_direction == ConversionDirection.COP_TO_USD) {
            copcContract.transferFrom(msg.sender, address(this), totalAmount);
            usdcContract.transferFrom(
                address(this),
                msg.sender,
                convertedAmount
            );
        }

        Hedge memory hedge = Hedge(
            _direction,
            hedgeId,
            msg.sender,
            _amount,
            collateralRequirement,
            feeRequirement,
            block.timestamp,
            _duration,
            usdToCopRate
        );

        hedges[hedgeId] = hedge;
        hedgeToOwner[hedgeId] = msg.sender;
        ownerToHedgeIds[msg.sender].push(hedgeId);

        // future[msg.sender] = 1;
        return true;
    }

    // provide liquidity for copc
    function addCopcLiquidity(uint256 _amount) public {
        copcContract.transferFrom(msg.sender, address(this), _amount);
        copcBalances[msg.sender] = copcBalances[msg.sender] + _amount;
    }

    function getCopcLiquidityBalance(address _lp)
        public
        view
        returns (uint256)
    {
        return copcBalances[_lp];
    }


}
