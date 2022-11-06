
import { Navbar } from '../components/Navbar';

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
  return (
    <div className="flex h-64">
      <div className="border p-4 rounded-lg mt-4 ml-4 mb-4 w-1/2 h-full">
        <article>Staking SFX helps secure the protocol in exchange for protocol incentives.</article>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">I want to stake</span>
            <span className="label-text-alt">Available: 0 SFX</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full" />
        </div>
        <button className="btn btn-primary w-full btn-disabled mt-4">Stake SFX</button>
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

const Pool = ({ name }) => {
  return (
    <div className="flex flex-col m-4 border">
      <div className=" flex justify-between p-4 ">
        <div className="flex flex-col">
          <article>{`${name} Pool`}</article>
          <article className="text-primary">0xA991...c742</article>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <article className="text-gray-400 mr-2">APY:</article>
            <article>4.5%</article>
          </div>
          <div className="flex">
            <article className="text-gray-400 mr-2">Utilization:</article>
            <article>70.2%</article>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <article className="text-gray-400 mr-2">Pool Value:</article>
            <article>1.2 M USD</article>
          </div>
          <div className="flex">
            <article className="text-gray-400 mr-2">sfUSDC Price:</article>
            <article>1.076 USD</article>
          </div>
        </div>
      </div>
      <div className="flex border p-4">
        <div className="flex flex-col justify-center">
          <article>USDC Balance: 0</article>
        </div>

        <button className="btn btn-sm btn-primary ml-2 btn-outline">{`Stake ${name}`}</button>
      </div>
    </div>

  )
}

const ProvideLiquidity = () => {
  return (
    <div className="flex flex-col">
      <Pool name="USDC" />
      <Pool name="COPC" />
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
        <div className="m-4">
          <article className="text-xl">Stake SFX</article>
          <Stats />
        </div>
        <StakeSFX />
        <div className="mt-4 ml-4">
          <article className="text-xl pt-4">Hedging Pools</article>
        </div>

        <ProvideLiquidity />
      </div>
    </div>
  );
}
