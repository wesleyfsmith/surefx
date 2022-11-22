import { useState } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { useContractRead } from 'wagmi'
import abi from '../contracts/HedgeManagerAbi.json';
import { abi as copcAbi } from '../contracts/CopcABI.json';
import { ethers } from 'ethers';

// const hedgeAddress = process.env.HEDGE_MANAGER_ADDRESS;

const LiquidityCopc = () => {
  const address: string = process.env.NEXT_PUBLIC_COPC_ADDRESS as string;
  const hedgeMaangerAddress: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data, isError, isLoading } = useContractRead({
    address,
    abi: copcAbi,
    functionName: 'balanceOf',
    args: [hedgeMaangerAddress]
  });
  const copcBalance = data ? Number(data.toString()).toLocaleString('es') : 'N/A';
  return (
    <div className="w-1/4">
      <article className="text-xs">
        Liquidity Available
      </article>
      <article className="font-bold">
        {copcBalance} COPC
      </article>
    </div>
  )
}

export const Statistics = () => {
  // console.log({ abi });
  const address: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data, isError, isLoading } = useContractRead({
    address,
    abi,
    functionName: 'getExchangeRate',
  });

  const copString = data ? data.toLocaleString('es') : "N/A";

  return (
    <div className="flex p-4 mx-4 bg-accent text-white rounded-lg justify-between">
      <div className="w-1/4">
        <article className="text-xs">
          Current Exchange Rate
        </article>
        <article className="font-bold">
          1 USD @ {copString} COP
        </article>
      </div>
      <div className="w-1/4">
        <article className="text-xs">
          Platform Fee
        </article>
        <article className="font-bold">
          3%
        </article>
      </div>
      <LiquidityCopc />
      <div className="w-1/5">
        <article className="text-xs">
          Contracts Open
        </article>
        <article className="font-bold">
          0
        </article>
      </div>
    </div>
  );
};