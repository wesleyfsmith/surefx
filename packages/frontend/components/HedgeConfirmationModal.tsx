import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import HedgeABI from '../contracts/HedgeManagerAbi.json';
import { useContractRead } from 'wagmi';
import { getUSDCDecimals, removeUSDCDecimals } from "@/utils/utils";
import { ethers } from "ethers";

//TODO make this view work both ways in the UI
export const HedgeConfirmationModal = ({ contractDetails }) => {

  // console.log({ abi });

  const address: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data: dataFee, isError, isLoading } = useContractRead({
    address,
    abi: HedgeABI.abi,
    functionName: 'getFee',
    args: [contractDetails.amount]
  });

  const { data: dataCollateral, isError: collateralIsError, isLoading: collateralIsLoading } = useContractRead({
    address,
    abi: HedgeABI.abi,
    functionName: 'getCollateralRequirement',
    args: [contractDetails.amount]
  });

  const { data: dataExchange, isError: exchangeIsError, isLoading: exchangeIsLoading } = useContractRead({
    address,
    abi: HedgeABI.abi,
    functionName: 'getAmountForCurrentExchangeRate',
    args: [contractDetails.amount, ethers.BigNumber.from("0"), contractDetails.lockedInRate * 100]
  });

  console.log({ dataExchange });

  const fee = dataFee ? Number(dataFee.toString()).toLocaleString('es') : '0';
  const colateral = dataCollateral ? Number(dataCollateral.toString()).toLocaleString('es') : '0';

  const exchangeRateAmount = dataExchange ? Number(dataExchange.toString()).toLocaleString('es') : '0';


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
          <article className="py-2">Total Required: {contractDetails.lockedInRate} {contractDetails.baseCurrency}</article>
          <button className="btn btn-primary w-full">Confirm</button>
        </div>
      </div>
    </div>
  );
}