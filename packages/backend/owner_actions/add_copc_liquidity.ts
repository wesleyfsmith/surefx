import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
const hre = require("hardhat");

// {
//   'HedgeManager address': '0xF3B74e76c2E5B2770AA366CCAacd1B6955B070a7'
// }
// { 'Fake USDC address': '0x819D8BEbA7B239f83c0D7281f2f946ecE656e5aa' }
// { 'COPC address': '0x84816Be3FF18Ee7eC403571434419ac6ffBF38A1' }

// {
//   'HedgeManager address': '0xfaA160915aD5cdD5848f238D5e084C8C7D95Be69'
// }
// { 'Fake USDC address': '0x07109d90Ff47f5062981d271b0c4d55a9105Bf22' }
// { 'COPC address': '0xdF53D402Ff4e3f85821BF2680C00a1eaE6dbbcEd' }\

// verify commands
// npx hardhat verify --contract contracts/COPC.sol:COPC --network goerli 0xdF53D402Ff4e3f85821BF2680C00a1eaE6dbbcEd COPC COPC 6
// npx hardhat verify --contract contracts/BasicERC20.sol:BasicERC20 --network goerli 0x07109d90Ff47f5062981d271b0c4d55a9105Bf22 FakeUSDC FUSDC 6
// npx hardhat verify --contract contracts/HedgeManager.sol:HedgeManager --network goerli 0xfaA160915aD5cdD5848f238D5e084C8C7D95Be69 0x07109d90Ff47f5062981d271b0c4d55a9105Bf22 0xdF53D402Ff4e3f85821BF2680C00a1eaE6dbbcEd

const contractAbi = require("../artifacts/contracts/HedgeManager.sol/HedgeManager.json");
const contractAbi2 = require("../artifacts/contracts/BasicERC20.sol/BasicERC20.json");

const addLiquidity = async () => {
  const [ownerWallet] = await hre.ethers.getSigners();

  const HedgeManager = new hre.ethers.Contract('0xfaA160915aD5cdD5848f238D5e084C8C7D95Be69', contractAbi.abi, ownerWallet);
  const COPC = new hre.ethers.Contract('0xdF53D402Ff4e3f85821BF2680C00a1eaE6dbbcEd', contractAbi2.abi, ownerWallet);

  const tx = await COPC.approve(HedgeManager.address, hre.ethers.constants.MaxUint256);
  // console.log(ownerWallet.address);

  // 10000000000
  // const tx = await HedgeManager.addCopcLiquidity(100000000);

  console.log({ receipt: await tx.wait() });

}

addLiquidity();