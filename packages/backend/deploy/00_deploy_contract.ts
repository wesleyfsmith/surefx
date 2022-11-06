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
  const HedgeFactory = await hre.ethers.getContractFactory("HedgeManager");
  const HedgeContract = await HedgeFactory.deploy();


  console.log({ "contract address": HedgeContract.address });

  await HedgeContract.deployed();
}

deploy();

export default main;

export const tags = ['all', 'greeter'];
