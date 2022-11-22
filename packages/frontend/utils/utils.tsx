export const getUSDCDecimals = (amount: number) => {
  return amount * 100000;
};

export const removeUSDCDecimals = (amount: number) => {
  return amount / 100000;
};

export const getCOPCDecimals = (amount: number) => {
  return amount * 100;
};

export const removeCOPCDecimals = (amount: number) => {
  return amount / 100;
};