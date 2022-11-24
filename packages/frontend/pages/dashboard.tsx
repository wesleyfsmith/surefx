import { Navbar } from '../components/Navbar';
import { useState } from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { CalendarPicker } from '../components/CalendarPicker';
import { HedgeConfirmationModal } from '../components/HedgeConfirmationModal';
import { ContractList } from '../components/ContractList';
import { Statistics } from '../components/Statistics';
import HedgeABI from '../contracts/HedgeManagerAbi.json';
import { useContractRead } from 'wagmi';


const CurrencyPicker = () => {
  const [currency, setCurrency] = useState('USD');
  const [oppositeCurrency, setOppositeCurrency] = useState('COP');
  const selectChange = (e: any) => {
    if (e.target.value === 'USD') {
      setCurrency('USD');
      setOppositeCurrency('COP');
    } else {
      setCurrency('COP');
      setOppositeCurrency('USD');
    }
  };
  return (
    <div>
      <div >
        <label className="label">
          <span className="label-text">Exchange</span>
        </label>
        <div className="flex justify-between">
          <div className="form-control w-48">
            <select className="select w-full select-bordered max-w-xs" onChange={selectChange}>
              <option>USD</option>
              <option>COP</option>
            </select>
          </div>
          <div className="flex flex-col justify-center">
            <article className="w-24">for</article>
          </div>
          <div className="flex flex-col justify-center">
            <article className="w-24 text-2xl">{oppositeCurrency}</article>
          </div>
        </div>
      </div>


    </div>
  );
};

const AmountInput = ({ amount, setAmount }) => {
  const updateAmount = (e) => {
    setAmount(e.target.value);
  }
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Amount</span>
      </label>
      <input type="number" value={amount} onChange={updateAmount} placeholder="Type here" className="input input-bordered w-full" />
    </div>
  );
};

const OpenContract = ({ setContractDetails }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [endDate, setEndDate] = useState(new Date());

  const address: string = process.env.NEXT_PUBLIC_HEDGE_MANAGER_ADDRESS as string;
  const { data, isError, isLoading } = useContractRead({
    address,
    abi: HedgeABI.abi,
    functionName: 'getExchangeRate',
  });

  const copString = data ? data.toLocaleString('es') : "N/A";

  const setDeets = (e) => {
    setContractDetails({
      amount,
      expiration: endDate,
      baseCurrency: 'USD',
      lockedInRate: copString
    })
  }
  return (
    <div className="m-4">

      <div className=" border rounded-lg p-4 drop-shadow bg-white">
        <article className="prose-xl">
          Create New Hedging Contract
        </article>
        <article className="mb-2">The exchange rate will be locked in until the contract expires.</article>

        {/* <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} /> */}
        {/* <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input datepicker type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
          </input>
        </div> */}
        <div>
          <label className="label">
            <span className="label-text">Expiration Date</span>
          </label>
          <CalendarPicker endDate={endDate} setEndDate={setEndDate} />
        </div>

        <CurrencyPicker />

        <AmountInput amount={amount} setAmount={setAmount} />

        {/* <CollateralSlider /> */}
        <div className="flex mt-4">
          <div className="w-1/2">
            <article className="text-sm">
              Locked-in Rate
            </article>
            <article className="font-bold">
              ${copString} COP - $1 USD
            </article>
          </div>


          <div className="w-1/2">
            <label onClick={setDeets} htmlFor="my-modal-3" className="btn btn-primary w-full">Create</label>
            {/* <button onClick={addContract} className="btn btn-primary w-full">Create</button> */}
          </div>
        </div>

      </div>
    </div>

  );
};

export default function Dashboard() {


  // const { data, error, write } = useContractWrite({
  //   addressOrName: '0xc0f88d928760E2c4AD0DD0A060c3566C23f5fbF7',
  //   contractInterface: abi,
  //   functionName: 'createContract',
  //   gasLimit: '100000'
  // });

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // })

  const [contractDetails, setContractDetails] = useState({
    amount: 1901923,
    expiration: new Date(),
    baseCurrency: 'USD',
    lockedInRate: 4000
  });

  // const { config } = usePrepareContractWrite({
  //   addressOrName: '0xc0f88d928760E2c4AD0DD0A060c3566C23f5fbF7',
  //   contractInterface: abi,
  //   functionName: 'createContract'
  // });

  // if (config && config.request) {
  //   config.request.gasPrice = '50';
  // }

  // const { data, error, isError, write } = useContractWrite(config);

  // console.log({ config, data, write });

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  // const addContract = () => {
  //   console.log({ write });
  //   write?.();
  //   // contracts.push(
  //   //   {
  //   //     rate: '$5,115',
  //   //     amount: '$1,000,000.00 COP',
  //   //     collateral: '5%',
  //   //     expiration: 'Jan 6, 2023'
  //   //   }
  //   // );
  //   // setContracts([...contracts]);
  // };


  return (
    <div className="">
      <div className="bg-warning p-4">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span className="ml-4">Contracts are currently deployed on Goerli Testnet. Make sure your wallet is connected to Goerli.</span>
        </div>
      </div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <Statistics />
        {/* <Stats /> */}
        <div className="flex">
          <div className="w-1/2">
            <OpenContract
              setContractDetails={setContractDetails}
            />
          </div>
          <div className="w-1/2">
            <ContractList />
          </div>
        </div>
        <HedgeConfirmationModal contractDetails={contractDetails} />

      </div>

    </div>
  );
}
