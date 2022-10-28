
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
    <div className="border rounded-lg p-4">
      <article className="text-sm">{title}</article>
      <article className="font-bold text-2xl">{value}</article>
    </div>
  )
}

const Stats = () => {
  return (
    <div className="flex">
      <StatBox title="Total Value Locked (in stkSFX)" value="2.12M" />
      <StatBox title="Staking ROI (Yearly)" value="17.2%" />
      <StatBox title="Platform Fees Earned" value="2.12M" />
      <StakeStats />
    </div>
  )
};

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
      <Stats />
    </div>
  );
}
