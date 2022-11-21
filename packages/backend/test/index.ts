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

const SECONDS_IN_DAY = 86400;


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

    // give LP some COPC 100usd worth
    await COPC.mint(liquidityProvider.address, 40000000000000);

    await COPC.connect(liquidityProvider).approve(HedgeManager.address, 40000000000000);

    await HedgeManager.connect(liquidityProvider).addCopcLiquidity(40000000000000);

    const balance = (await HedgeManager.getCopcLiquidityBalance(liquidityProvider.address)).toString();

    expect(balance).to.equal('40000000000000');
  });
  it ("should set exchange rate correctly", async function() {
    await HedgeManager.setExchangeRate(400000);

    const exchangeRate = (await HedgeManager.getExchangeRate()).toString();

    expect(exchangeRate).to.equal('400000');
  });
  it ("only owner can set exchange rate correctly", async function() {
    const [owner, randomUser] = await ethers.getSigners();

    await assertFailedTransaction(
      HedgeManager.connect(randomUser).setExchangeRate(400000),
      'Ownable: caller is not the owner'
    );
  });

  it ("should calculate exchange rate correctly", async function() {
    const [owner, randomUser] = await ethers.getSigners();

    const rateCop = await HedgeManager.getAmountForExchangeRate(100000000, USD_TO_COP, 400000);
    const rateUSD = await HedgeManager.getAmountForExchangeRate(100000000, COP_TO_USD, 400000);
    expect(rateCop).to.equal(40000000000000);
    expect(rateUSD.eq(ethers.BigNumber.from("250"))).to.equal(true);
  });

  it ("should create hedge succesfully", async function() {
    const [owner, liquidityProvider, hedgeUser] = await ethers.getSigners();

    //TODO write test for platform fee and collateral requirements
    const hundredUSD = 100000000;
    const fee = Number((await HedgeManager.getFee(hundredUSD)).toString());
    const collateral = Number((await HedgeManager.getCollateralRequirement(hundredUSD)).toString());

    // console.log({fee, collateral});
    // console.log({liquidity: (await HedgeManager.getAmountForExchangeRate(hundredUSD, USD_TO_COP)).toString()});

    //hedge user needs some USDC
    const totalAmount = hundredUSD + fee + collateral;

    await USDC.mint(hedgeUser.address, totalAmount); //100 usd
    await USDC.connect(hedgeUser).approve(HedgeManager.address, ethers.constants.MaxUint256);
    await COPC.connect(hedgeUser).approve(HedgeManager.address, ethers.constants.MaxUint256);

    const tenDays = SECONDS_IN_DAY * 10; // 10 day contract

    const hedgeTx = await HedgeManager.connect(hedgeUser).createHedge(USD_TO_COP, tenDays, hundredUSD);

    const hedge = await HedgeManager.getHedge(1);
    // console.log({hedge});

    //check hedge is created correctly

    expect(hedge.direction).to.equal(0);
    expect(hedge.id).to.equal(1);
    expect(hedge.owner).to.equal(hedgeUser.address);
    expect(hedge.amount).to.equal(ethers.BigNumber.from(hundredUSD));
    expect(hedge.collateral).to.equal(ethers.BigNumber.from(collateral));
    expect(hedge.fee).to.equal(ethers.BigNumber.from(fee));
    // expect(hedge.startDate).to.equal(ethers.BigNumber.from(collateral));
    expect(hedge.lockedInRate).to.equal(ethers.BigNumber.from(400000));
    expect(hedge.duration).to.equal(ethers.BigNumber.from(tenDays));

    //check balances are correct
    const hedgeManagerUSDCBalance = (await USDC.balanceOf(HedgeManager.address)).toString();
    expect(hedgeManagerUSDCBalance).to.equal('113000000');
    const hedgeUserUSDCBalance = (await USDC.balanceOf(hedgeUser.address)).toString();
    expect(hedgeUserUSDCBalance).to.equal('0');
    const hedgeUserCOPCBalance = (await COPC.balanceOf(hedgeUser.address)).toString();
    expect(hedgeUserCOPCBalance).to.equal('40000000000000');
  });

  it("should return all hedges for address", async function() {
    const [owner, liquidityProvider, hedgeUser] = await ethers.getSigners();
    const hedges = await HedgeManager.getHedges(hedgeUser.address);
  });

  it("should allow hedge to be closed", async function() {
    const [owner, liquidityProvider, hedgeUser] = await ethers.getSigners();

    await assertFailedTransaction(
      HedgeManager.closeHedge(1),
      'only the owner may close the hedge'
    );

    const hedges = await HedgeManager.getHedges(hedgeUser.address);
    
    await HedgeManager.connect(hedgeUser).closeHedge(1);

    const hedge = await HedgeManager.getHedge(1);
    
    const hedgeManagerUSDCBalance = (await USDC.balanceOf(HedgeManager.address)).toString();
    expect(hedgeManagerUSDCBalance).to.equal('13000000');
    const hedgeUserUSDCBalance = (await USDC.balanceOf(hedgeUser.address)).toString();
    expect(hedgeUserUSDCBalance).to.equal('100000000');
    const hedgeUserCOPCBalance = (await COPC.balanceOf(hedgeUser.address)).toString();
    expect(hedgeUserCOPCBalance).to.equal('0');

  });

});
