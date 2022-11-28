
import { Navbar } from '../components/Navbar';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';

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

const StakeStats = () => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex">
        <article className="text-sm mr-2 text-gray-400">SFX Distributed:</article>
        <article className="text-sm"> 32.3 M SFX</article>
      </div>
      <div className="flex">
        <article className="text-sm mr-2 text-gray-400">Total SFX Staked:</article>
        <article className="text-sm"> 32.3 M SFX</article>
      </div>
      <div className="flex">
        <article className="text-sm mr-2 text-gray-400">% of TRU Supply Staked:</article>
        <article className="text-sm"> 32.3 M SFX</article>
      </div>
    </div>
  )
}

const StatBox = ({ title, value }) => {
  return (
    <div className="border rounded-lg p-4 w-1/4 mr-4">
      <article className="text-sm">{title}</article>
      <article className="font-bold text-2xl">{value}</article>
    </div>
  )
}

const Stats = () => {
  return (
    <div className="flex pt-4">
      <StatBox title="Total Value Locked (in stkSFX)" value="2.12M" />
      <StatBox title="Staking ROI (Yearly)" value="17.2%" />
      <StatBox title="Platform Fees Earned" value="2.12M" />
      <StakeStats />
    </div>
  )
};

const StakeSFX = () => {

  const { config } = usePrepareContractWrite({
    addressOrName: '0xc0f88d928760E2c4AD0DD0A060c3566C23f5fbF7',
    contractInterface: abi,
    functionName: 'stake'
  });

  if (config && config.request) {
    config.request.gasPrice = '50';
  }

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const doWrite = () => {
    write?.();
  }

  return (
    <div className="flex h-64">
      <div className="border p-4 rounded-lg mt-4 ml-4 mb-4 w-1/2 h-full">
        <article>Staking SFX helps secure the protocol in exchange for protocol incentives.</article>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">I want to stake</span>
            <span className="label-text-alt">Available: 10 SFX</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full" />
        </div>
        <button onClick={() => doWrite()} className="btn btn-primary w-full mt-4">Stake SFX</button>
      </div>
      <div className="w-full border mt-4 mr-4 mb-4 h-full flex flex-col justify-between">
        <div className="p-4 ">
          <article className="text-gray-400 pt-4">SFX Staked</article>
          <div className="flex">
            <article className="font-bold text-2xl pt-4">0</article>
            <article className="mt-auto ml-2">0 USD</article>
          </div>
          <article className="pt-4">1.0987 stkSFX = 1 SFX</article>
        </div>
        <div className="flex flex-col justify-end grow ">
          <div className="border flex justify-between p-4">
            <div className="flex">
              <article className="text-gray-400 mr-2">Cooldown period</article>
              <article>14 days</article>
            </div>
            <div className="flex">
              <article className="text-gray-400 mr-2">Unstake window</article>
              <article>5 days</article>
            </div>
            <div className="flex">
              <article className="text-gray-400 mr-2">Maximum liquidation rate</article>
              <article>15%</article>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

const Pool = ({ name, address, apy, utilization, value, price }) => {
  return (
    <div className="flex flex-col m-4 border">
      <div className=" flex justify-between p-4 ">
        <div className="flex flex-col">
          <article>{`${name} Pool`}</article>
          <article className="text-primary">{address}</article>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <article className="text-gray-400 mr-2">APY:</article>
            <article>{apy}</article>
          </div>
          <div className="flex">
            <article className="text-gray-400 mr-2">Utilization:</article>
            <article>{utilization}</article>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <article className="text-gray-400 mr-2">Pool Value:</article>
            <article>{value} {name}</article>
          </div>
          {/* <div className="flex">
            <article className="text-gray-400 mr-2">sf{name} Price:</article>
            <article>{price} {name}</article>
          </div> */}
        </div>
      </div>
      <div className="flex border p-4">
        <div className="flex flex-col justify-center">
          <article>{name} Balance: 0</article>
        </div>

        <button className="btn btn-sm btn-primary ml-2 btn-outline">{`Stake ${name}`}</button>
      </div>
    </div>

  )
}

const ProvideLiquidity = () => {
  return (
    <div className="flex flex-col">
      <Pool name="COPC" address="0xCBB2...d4a2" apy="2.3%" utilization='63.7%' value='823 K' price='5120.076' />
      <Pool name="USDC" address="0xA991...c742" apy="4.5%" utilization='70.2%' value='1.2 M' price='1.076' />
    </div>
  )
}

export default function Dashboard() {
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
        <div className="mt-4 ml-4">
          <article className="text-xl pt-4">Hedging Pools</article>
        </div>

        <ProvideLiquidity />
        {/* <div className="m-4">
          <article className="text-xl">Stake SFX</article>
          <Stats />
        </div>
        <StakeSFX /> */}

      </div>
    </div>
  );
}
