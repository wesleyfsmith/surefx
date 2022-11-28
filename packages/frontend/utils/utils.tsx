import { BigNumber } from "ethers";

export const getUSDCDecimals = (amount: number) => {
  return amount * 1000000;
};

export const removeUSDCDecimals = (amount: number) => {
  return amount / 1000000;
};

export const getCOPCDecimals = (amount: number) => {
  return amount * 1000000;
};

export const removeCOPCDecimals = (amount: number) => {
  return amount / 1000000;
};

export const bigNumReadable = (amount: BigNumber) => {
  return removeUSDCDecimals(Number(amount.toString()));
}