import { expect } from "chai";
import { ethers } from "hardhat";

const deployNewCOPCContract = async () => {
  const COPCFactory = await ethers.getContractFactory("BasicERC20");
  const COPCContract = await COPCFactory.deploy("COPC", "COPC", 2);
  await COPCContract.deployed();
  return COPCContract;
};

const deployNewUSDCContract = async () => {
  const USDCFactory = await ethers.getContractFactory("BasicERC20");
  const USDCContract = await USDCFactory.deploy("fake usdc", "USDC", 6);
  await USDCContract.deployed();
  return USDCContract;
};

const deployNewHedgeManager = async (usdcAddress, copcAddress) => {
  const HedgeManagerFactory = await ethers.getContractFactory("HedgeManager");
  const HedgeManagerContract = await HedgeManagerFactory.deploy(usdcAddress, copcAddress);
  await HedgeManagerContract.deployed();
  return HedgeManagerContract;
};

const assertFailedTransaction = async (tx, errorMessage) => {
  let transactionFailed = false;
  try {
    await tx;
  } catch (error) {
    // console.log({err: error.message, thirdparam});
    if (error.message ===`VM Exception while processing transaction: reverted with reason string '${errorMessage}'`) {
      transactionFailed = true;
    }
  }
  expect(transactionFailed).to.equal(true);
}


const USD_TO_COP = ethers.BigNumber.from("0");
const COP_TO_USD = ethers.BigNumber.from("1");

let HedgeManager: any;
let USDC: any;
let COPC: any;

describe("Greeter", function () {
  before(async function() {
    COPC = await deployNewCOPCContract();
    USDC = await deployNewUSDCContract();
    HedgeManager = await deployNewHedgeManager(USDC.address, COPC.address);
  });
  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();

  //   expect(await greeter.greet()).to.equal("Hello, world!");

  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();

  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });
  it ("should be able to provide liquidity", async function() {
    const [owner, liquidityProvider] = await ethers.getSigners();

    // give LP some COPC
    await COPC.mint(liquidityProvider.address, 100000000);

    await COPC.connect(liquidityProvider).approve(HedgeManager.address, 100000000);

    await HedgeManager.connect(liquidityProvider).addCopcLiquidity(100000000);

    const balance = (await HedgeManager.getCopcLiquidityBalance(liquidityProvider.address)).toString();

    expect(balance).to.equal('100000000');
  });
  it ("should set exchange rate correctly", async function() {
    await HedgeManager.setExchangeRate(4000);

    const exchangeRate = (await HedgeManager.getExchangeRate()).toString();

    expect(exchangeRate).to.equal('4000');
  });
  it ("only owner can set exchange rate correctly", async function() {
    const [owner, randomUser] = await ethers.getSigners();

    await assertFailedTransaction(
      HedgeManager.connect(randomUser).setExchangeRate(4000),
      'Ownable: caller is not the owner'
    );
  });

  it ("should calculate exchange rate correctly", async function() {
    const [owner, randomUser] = await ethers.getSigners();

    
    const rate = await HedgeManager.getAmountForExchangeRate(1000000, ethers.BigNumber.from("1"));
    console.log(rate.toString());
  });

});
