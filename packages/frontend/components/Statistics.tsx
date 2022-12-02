import { useState } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import HedgeABI from '../contracts/HedgeManagerAbi.json';
import copcAbi from '../contracts/CopcABI.json';
import { getUSDCDecimals, removeUSDCDecimals, removeCOPCDecimals } from "../utils/utils";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';

const OpenContractCount = () => {

  const { address, isConnected } = useAccount();

  const contractAddress: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data: hedges, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: HedgeABI.abi,
    functionName: 'getHedges',
    args: [address]
  });

  let contractCount = 0;

  if (hedges) {
    for (let i = 0; i < hedges.length; i++) {
      if (!hedges[i].closed) {
        contractCount++;
      }
    }
  }

  return (
    <div className="w-1/5">
      <article className="text-xs">
        Contracts Open
      </article>
      <article className="font-bold">
        {contractCount}
      </article>
    </div>
  )
}

const LiquidityUsdc = () => {
  return (
    <div className="w-1/4">
      <article className="text-xs">
        Liquidity Available
      </article>
      <article className="font-bold">
        $0 USD
      </article>
    </div>
  )
}

const LiquidityCopc = () => {
  const address: string = process.env.NEXT_PUBLIC_COPC_ADDRESS as string;
  const hedgeMaangerAddress: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data, isError, isLoading } = useContractRead({
    address,
    abi: copcAbi.abi,
    functionName: 'balanceOf',
    args: [hedgeMaangerAddress]
  });
  const copcBalance = data ? (Number(data.toString()) / 100).toLocaleString('es') : 'N/A';
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
  const address: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data, isError, isLoading } = useContractRead({
    address,
    abi: HedgeABI.abi,
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
      <LiquidityUsdc />
      <OpenContractCount />
    </div>
  );
};