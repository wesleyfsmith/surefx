import { Navbar } from '../components/Navbar';
import { useState } from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { CalendarPicker } from '@/components/CalendarPicker';
import { HedgeConfirmationModal } from '@/components/HedgeConfirmationModal';
import { ContractList } from '@/components/ContractList';
import { Statistics } from '@/components/Statistics';



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

const AmountInput = ({amount, setAmount}) => {
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

const Stats = () => {
  return (
    <div className="stats shadow m-4 w-full">

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div className="stat-title">Current Exchange Rate</div>
        <div className="stat-value">1 USD @ 5,023 COP</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
        </div>
        <div className="stat-title">Platform Exchange Rate</div>
        <div className="stat-value">1 USD @ 4875 COP</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
        </div>
        <div className="stat-title">Contracts Open</div>
        <div className="stat-value">3</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>

    </div>
  );
};

const OpenContract = ({ addContract, setContractDetails }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [endDate, setEndDate] = useState(new Date())

  const setDeets = (e) => {
    setContractDetails({
      amount,
      expiration: endDate,
      baseCurrency: 'USD',
      lockedInRate: 4000
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
              $4875 COP - $1 USD
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

const abi = [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'inputs': [],
    'name': 'createContract',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'stake',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];

let rendersBig = 0;

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

  const { config } = usePrepareContractWrite({
    addressOrName: '0xc0f88d928760E2c4AD0DD0A060c3566C23f5fbF7',
    contractInterface: abi,
    functionName: 'createContract'
  });

  if (config && config.request) {
    config.request.gasPrice = '50';
  }

  const { data, error, isError, write } = useContractWrite(config);

  console.log({ config, data, write });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const addContract = () => {
    console.log({ write });
    write?.();
    // contracts.push(
    //   {
    //     rate: '$5,115',
    //     amount: '$1,000,000.00 COP',
    //     collateral: '5%',
    //     expiration: 'Jan 6, 2023'
    //   }
    // );
    // setContracts([...contracts]);
  };


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
             addContract={addContract} />
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
