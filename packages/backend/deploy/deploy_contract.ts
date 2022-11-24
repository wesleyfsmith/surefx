import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
const hre = require("hardhat");

const main: DeployFunction = async function ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // const args = ['Hello!!!!!!!!'];
  // await deploy('Greeter', {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   args: args,
  //   from: deployer,
  //   log: true,
  // });

  // await deploy('HedgeManager', {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   // args: args,
  //   from: deployer,
  //   log: true,
  // });

  // const HedgeFactory = await hre.ethers.getContractFactory("HedgeManager");
  // const HedgeContract = await HedgeFactory.deploy();


  // console.log({ "contract address": HedgeContract.address });

  // await HedgeContract.deployed();

  console.log('scripts');
};

const deploy = async () => {

  const FakeUSDC = await hre.ethers.getContractFactory("BasicERC20");
  const FakeUSDCContract = await FakeUSDC.deploy("FakeUSDC", "FUSDC", 6);

  const COPCFactory = await hre.ethers.getContractFactory("COPC");
  const COPC = await COPCFactory.deploy("COPC", "COPC", 6);

  const HedgeFactory = await hre.ethers.getContractFactory("HedgeManager");
  const HedgeContract = await HedgeFactory.deploy(FakeUSDCContract.address, COPC.address);

  await HedgeContract.deployed();

  console.log({ "HedgeManager address": HedgeContract.address });
  console.log({ "Fake USDC address": FakeUSDCContract.address });
  console.log({ "COPC address": COPC.address });


};

deploy();

export default main;

export const tags = ['all', 'greeter'];
