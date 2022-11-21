import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const CurrentContractItem = ({ contract }) => {
  return (
    <div className="border rounded-lg flex justify-between p-4 mb-4">
      <div>
        <article className="text-sm">Rate</article>
        <article>{contract.rate}</article>
      </div>
      <div>
        <article className="text-sm">Amount</article>
        <article>{contract.amount}</article>
      </div>
      <div>
        <article className="text-sm">Collateral Threshold</article>
        <article className="text-success font-bold">{contract.collateral}</article>
      </div>
      <div>
        <article className="text-sm">Expiration</article>
        <article>{contract.expiration}</article>
      </div>


      <button className="btn btn-secondary btn-outline">Close</button>
    </div>
  );
};

export const ContractList = () => {
  const { address, isConnected } = useAccount()
  
  const [contracts, setContracts] = useState([
    // {
    //   rate: '$4,982',
    //   amount: '$12,000,000.00 COP',
    //   collateral: '5%',
    //   expiration: 'Dec 11, 2022'
    // },
    // {
    //   rate: '$4,872',
    //   amount: '$6,500,000.00 COP',
    //   collateral: '10%',
    //   expiration: 'Dec 31, 2022'
    // },
    // {
    //   rate: '$5,015',
    //   amount: '$4,000,000.00 COP',
    //   collateral: '5%',
    //   expiration: 'Jan 31, 2023'
    // }
  ]);
  const contractElements = contracts.map((contract) => {
    return <CurrentContractItem contract={contract} />;
  });
  return (
    <div className="m-4">
      <article className="prose-xl">
        Open Contracts
      </article>
      {!isConnected &&
        <article>Log in to close any hedging contracts.</article>
      }
      {contractElements}
    </div>
  );
};