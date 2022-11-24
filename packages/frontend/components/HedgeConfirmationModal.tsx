import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import HedgeABI from '../contracts/HedgeManagerAbi.json';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { getUSDCDecimals, removeUSDCDecimals, removeCOPCDecimals } from "@/utils/utils";
import { BigNumber, ethers } from "ethers";

const SECONDS_IN_DAY = 86400;

const ConfirmButton = ({ expiration, amount }) => {

  let differenceIndays = Math.ceil((expiration.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  console.log({ amount });



  const address: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { config } = usePrepareContractWrite({
    address,
    abi: HedgeABI.abi,
    functionName: 'createHedge',
    args: [0, SECONDS_IN_DAY * differenceIndays, getUSDCDecimals(amount)]
  });

  // if (config && config.request) {
  //   config.request.gasPrice = '50';
  // }

  const { data, error, isError, write } = useContractWrite(config);

  console.log({ config, data, write });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });


  const buttonText = isLoading ? 'Processing...' : 'Confirm';

  const sumbitTx = () => {
    console.log({ write });
    // write?.();
  }

  return (
    <button onClick={sumbitTx} className="btn btn-primary w-full">{buttonText}</button>
  )
}

//TODO make this view work both ways in the UI
export const HedgeConfirmationModal = ({ contractDetails }) => {

  // console.log({ abi });

  const address: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data: dataFee, isError, isLoading } = useContractRead({
    address,
    abi: HedgeABI.abi,
    functionName: 'getFee',
    args: [getUSDCDecimals(contractDetails.amount)]
  });

  const { data: dataCollateral, isError: collateralIsError, isLoading: collateralIsLoading } = useContractRead({
    address,
    abi: HedgeABI.abi,
    functionName: 'getCollateralRequirement',
    args: [getUSDCDecimals(contractDetails.amount)]
  });

  const { data: dataExchange, isError: exchangeIsError, isLoading: exchangeIsLoading } = useContractRead({
    address,
    abi: HedgeABI.abi,
    functionName: 'getAmountForExchangeRate',
    args: [getUSDCDecimals(contractDetails.amount), ethers.BigNumber.from("0"), contractDetails.lockedInRate * 100]
  });

  console.log({ dataExchange });

  const fee = dataFee ? removeUSDCDecimals(Number(dataFee.toString())).toLocaleString('es') : '0';
  const colateral = dataCollateral ? removeUSDCDecimals(Number(dataCollateral.toString())).toLocaleString('es') : '0';

  const exchangeRateAmount = dataExchange ? removeCOPCDecimals(Number(dataExchange.toString())).toLocaleString('es') : '0';

  let totalRequired = 'N/A';

  if (dataFee && dataCollateral && dataExchange) {
    const bigNumTotal: BigNumber = dataFee.add(dataCollateral).add(dataExchange);
    console.log({ bigNumTotal: bigNumTotal.toString() })
    totalRequired = (Number(fee) + Number(colateral) + Number(contractDetails.amount)).toString();
  }
  100000000
  43210000000
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Confirm Hedge Details</h3>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              <article className="text-3xl">{Number(contractDetails.amount).toLocaleString('es')}</article>
              <article className="text-center">USD</article>
            </div>

            <ArrowLongRightIcon className="w-28" />
            <div className="flex flex-col justify-center">
              <article className="text-3xl">{exchangeRateAmount}</article>
              <article className="text-center">COP</article>
            </div>
          </div>
          <div>
            <article className="text-center">
              @ {contractDetails.lockedInRate}COP = 1USD
            </article>
          </div>
          <article className="py-2 pt-8">The contract will expire on {contractDetails.expiration.toDateString()}</article>
          <article className="py-2">Fee: {fee} {contractDetails.baseCurrency}</article>
          <article className="py-2">Colateral: {colateral} {contractDetails.baseCurrency}</article>
          <article className="py-2">Total Required: {totalRequired} {contractDetails.baseCurrency}</article>
          <ConfirmButton amount={contractDetails.amount} expiration={contractDetails.expiration} />
        </div>
      </div>
    </div>
  );
}