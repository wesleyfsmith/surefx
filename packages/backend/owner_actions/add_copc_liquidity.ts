import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
const hre = require("hardhat");

// {
//   'HedgeManager address': '0xF3B74e76c2E5B2770AA366CCAacd1B6955B070a7'
// }
// { 'Fake USDC address': '0x819D8BEbA7B239f83c0D7281f2f946ecE656e5aa' }
// { 'COPC address': '0x84816Be3FF18Ee7eC403571434419ac6ffBF38A1' }

const contractAbi = require("../artifacts/contracts/HedgeManager.sol/HedgeManager.json");
const contractAbi2 = require("../artifacts/contracts/BasicERC20.sol/BasicERC20.json");

const addLiquidity = async () => {
  const [ownerWallet] = await hre.ethers.getSigners();

  const HedgeManager = new hre.ethers.Contract('0xF3B74e76c2E5B2770AA366CCAacd1B6955B070a7', contractAbi.abi, ownerWallet);
  const COPC = new hre.ethers.Contract('0x84816Be3FF18Ee7eC403571434419ac6ffBF38A1', contractAbi2.abi, ownerWallet);

  await COPC.approve(HedgeManager.address, hre.ethers.constants.MaxUint256);
  // console.log(ownerWallet.address);

  // 10000000000
  // const tx = await HedgeManager.addCopcLiquidity(100000000);

  // console.log({ receipt: await tx.wait() });

}

addLiquidity();