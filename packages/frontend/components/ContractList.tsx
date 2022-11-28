import { useState } from 'react';
import HedgeABI from '../contracts/HedgeManagerAbi.json';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { bigNumReadable, getUSDCDecimals, removeUSDCDecimals, removeCOPCDecimals } from "../utils/utils";

const CloseContractButton = ({ hedgeId }) => {
  const { address: walletAddress, isConnected } = useAccount();

  const address: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { config } = usePrepareContractWrite({
    address,
    abi: HedgeABI.abi,
    functionName: 'closeHedge',
    args: [hedgeId]
  });

  if (config && config.request) {
    config.request.gasPrice = '25';
  }

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const buttonText = isLoading ? 'Processing...' : 'Close';
  const buttonCss = isLoading ? ' btn-disabled' : '';

  const sumbitTx = () => {
    write?.();
  }

  if (isSuccess) return null;

  return (
    <button onClick={sumbitTx} className={`btn btn-primary btn-outline ${buttonCss}`}>{buttonText}</button>
  );
}

const CurrentContractItem = ({ hedgeId }) => {
  const { address: walletAddress, isConnected } = useAccount();
  const contractAddress: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data: hedge, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: HedgeABI.abi,
    functionName: 'getHedge',
    args: [hedgeId]
  });

  if (isLoading) return null;

  const expirationTime = new Date((Number(hedge.startDate.toString()) + Number(hedge.duration.toString())) * 1000);

  return (
    <div className="border rounded-lg  p-4 mb-4">
      <div className="flex justify-between" >
        <div>
          <article className="text-sm">Rate</article>
          <article>{hedge.lockedInRate.toString()}</article>
        </div>
        <div>
          <article className="text-sm">Amount</article>
          <article>{bigNumReadable(hedge.amount)}</article>
        </div>
        <div>
          <article className="text-sm">Collateral</article>
          <article className="text-success font-bold">${bigNumReadable(hedge.collateral)}</article>
        </div>
        <div>
          <article className="text-sm">Expiration</article>
          <article>{expirationTime.toDateString()}</article>
        </div>
        {
          hedge.owner === walletAddress && !hedge.closed && !hedge.liquidated &&
          <CloseContractButton hedgeId={hedgeId} />
        }

      </div>
      {
        hedge.closed &&
        <article className="text-accent text-center mt-2">This hedging contract has been closed.</article>
      }
    </div>

  );
};

export const ContractList = () => {
  const { address, isConnected } = useAccount();

  const contractAddress: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data: hedges, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: HedgeABI.abi,
    functionName: 'getHedges',
    args: [address]
  });

  if (isLoading) return null;

  // const [contracts, setContracts] = useState([
  //   {
  //     rate: '$4,982',
  //     amount: '$12,000,000.00 COP',
  //     collateral: '5%',
  //     expiration: 'Dec 11, 2022'
  //   },
  //   {
  //     rate: '$4,872',
  //     amount: '$6,500,000.00 COP',
  //     collateral: '10%',
  //     expiration: 'Dec 31, 2022'
  //   },
  //   {
  //     rate: '$5,015',
  //     amount: '$4,000,000.00 COP',
  //     collateral: '5%',
  //     expiration: 'Jan 31, 2023'
  //   }
  // ]);
  let contractElements = null;
  if (hedges) {
    contractElements = hedges.map((hedge, i) => {
      return <CurrentContractItem key={i} hedgeId={hedge} />;
    }).reverse();
  }

  return (
    <div className="m-4">
      <article className="prose-xl">
        Your Hedges
      </article>
      {!isConnected &&
        <article>Log in to view your hedging contracts.</article>
      }
      {contractElements}
    </div>
  );
};