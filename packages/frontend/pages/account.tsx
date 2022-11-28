import { useState } from 'react';
import HedgeABI from '../contracts/HedgeManagerAbi.json';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { bigNumReadable, getUSDCDecimals, removeUSDCDecimals, removeCOPCDecimals } from "../utils/utils";
import { Navbar } from '../components/Navbar';

//create a function that returns the amount of COPC or USDC in the account
// const CryptoAccount = ({ currencyType }) => {
//   const { account } = useAccount();
//   const hedgeManagerAddress: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
//   const { data: balance } = useContractRead({
//     address: hedgeManagerAddress,
//     abi: HedgeABI.abi,
//     functionName: 'getBalance',
//     args: [account, currencyType],
//   });
//   const { data: allowance } = useContractRead({
//     address: hedgeManagerAddress,
//     abi: HedgeABI.abi,
//     functionName: 'getAllowance',
//     args: [account, currencyType],
//   });
//   const { data: totalBalance } = useContractRead({
//     address: hedgeManagerAddress,
//     abi: HedgeABI.abi,
//     functionName: 'getTotalBalance',
//     args: [currencyType],
//   });

const FiatAccount = ({ currencyType }) => {
  return (
    <div className="border rounded-lg p-4 drop-shadow bg-white m-4 flex justify-between">
      <div>
        <article>
          {currencyType} Account
        </article>
        <article className="prose-xl">$5,4234</article>
      </div>
      <div className="flex">
        <button className="btn btn-primary w-24 mr-2 my-auto">Deposit</button>
        <button className="btn btn-primary w-24 mr-2 my-auto">Withdraw</button>
      </div>
    </div>
  )
}

export default function Account() {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <article className="prose-xl mx-4">
          Account Balances
        </article>
        <FiatAccount currencyType={'USD'} />
        <FiatAccount currencyType={'COPC'} />
      </div>
    </div>

  )
};