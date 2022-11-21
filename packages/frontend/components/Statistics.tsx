import { useState } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { useContractRead } from 'wagmi'
import { abi } from '../contracts/HedgeManagerAbi.json';

// const hedgeAddress = process.env.HEDGE_MANAGER_ADDRESS;

export const Statistics = () => {
  console.log({ addr: process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS });
  // console.log({ abi });
  // const address: String = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as String;
  const { data, isError, isLoading } = useContractRead({
    address: "0xF3B74e76c2E5B2770AA366CCAacd1B6955B070a7",
    abi,
    functionName: 'getExchangeRate',
  });
  console.log({ data, isError, isLoading, status })
  return (
    <div className="flex p-4 mx-4 bg-accent text-white rounded-lg justify-between">
      <div className="w-1/4">
        <article className="text-xs">
          Current Exchange Rate
        </article>
        <article className="font-bold">
          1 USD @ 4,985 COP
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
      <div className="w-1/4">
        <article className="text-xs">
          Liquidity Available
        </article>
        <article className="font-bold">
          10K USD
        </article>
      </div>
      <div className="w-1/5">
        <article className="text-xs">
          Contracts Open
        </article>
        <article className="font-bold">
          3
        </article>
      </div>
    </div>
  );
};