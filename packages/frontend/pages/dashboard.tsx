
import { Navbar } from '../components/Navbar';

const Statistics = () => {
  return (
    <div className="flex p-4 mx-4 bg-primary text-white rounded-lg justify-between">
      <div className="w-1/4">
        <article className="text-xs">
          Current Exchange Rate
        </article>
        <article className="font-bold">
          1 USD @ 5,000 COP
        </article>
      </div>
      <div className="w-1/4">
        <article className="text-xs">
          COP - USD Rate
        </article>
        <article className="font-bold">
          1 USD @ 5,000 COP
        </article>
      </div>
      <div className="w-1/4">
        <article className="text-xs">
          USD - COP Rate
        </article>
        <article className="font-bold">
          5,000 COP @ 1 USD
        </article>
      </div>
      <div className="w-1/5">
        <article className="text-xs">
          Contracts Open
        </article>
        <article className="font-bold">
          12
        </article>
      </div>
    </div>
  )
}

const CurrencyPicker = () => {
  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">COP</span>
          <input type="radio" name="radio-6" className="radio checked:bg-red-500" checked />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">USD</span>
          <input type="radio" name="radio-6" className="radio checked:bg-blue-500" checked />
        </label>
      </div>
    </div>
  )
}

const OpenContract = () => {
  return (
    <div className="m-4">
      <article className="prose-xl">
        Create New Hedging Contract
      </article>
      <div className=" border rounded-lg p-4">

        <div className="w-1/3">
          <CurrencyPicker />
        </div>

        <article>
          Duration
        </article>
        <DurationSlider />
        <article>
          Collateral %
        </article>
        <CollateralSlider />
        <div className="flex mt-4">
          <div className="w-1/2">
            <article className="text-sm">
              Locked-in Rate
            </article>
            <article className="font-bold">
              $4,3029
            </article>
          </div>
          <div className="w-1/2">
            <button className="btn btn-primary w-full">Create</button>
          </div>
        </div>

      </div>
    </div>

  );
};

const CollateralSlider = () => {
  return (
    <div>
      <input type="range" min="0" max="15" value="0" className="range range-secondary" />
      <div className="w-full flex justify-between text-xs px-2">
        <span>0%</span>
        <span>15%</span>
      </div>
    </div>
  )
}

const DurationSlider = () => {
  return (
    <div>
      <input type="range" min="0" max="99" value="66" className="range" step="33" />
      <div className="w-full flex justify-between text-xs px-2">
        <span>30 Days</span>
        <span>90 Days</span>
        <span>180 Days</span>
      </div>
    </div>
  )
}

const CurrentContractItem = ({ }) => {
  return (
    <div className="border rounded-lg flex justify-between p-4 mb-4">
      <div>
        <article className="text-sm">Rate</article>
        <article>$4,982</article>
      </div>
      <div>
        <article className="text-sm">Collateral Threshold</article>
        <article className="text-success font-bold">80%</article>
      </div>
      <div>
        <article className="text-sm">Expiration</article>
        <article>Dec 11, 2022</article>
      </div>

      <button className="btn btn-secondary btn-outline">Close Contract</button>
    </div>
  )
}

const CurrentContracts = () => {
  return (
    <div className="m-4">
      <article className="prose-xl">
        Open Contracts
      </article>
      <CurrentContractItem />
      <CurrentContractItem />
      <CurrentContractItem />
    </div>
  );
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
      <Statistics />
      <div className="flex">
        <div className="w-1/2">
          <OpenContract />
        </div>
        <div className="w-1/2">
          <CurrentContracts />
        </div>
      </div>
    </div>
  );
}
