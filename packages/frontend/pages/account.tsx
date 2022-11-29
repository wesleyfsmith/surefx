import { useState, useEffect } from 'react';
import HedgeABI from '../contracts/HedgeManagerAbi.json';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { bigNumReadable, getUSDCDecimals, removeUSDCDecimals, removeCOPCDecimals } from "../utils/utils";
import { PageLayout } from '../components/PageLayout';
import { usePlaidLink } from 'react-plaid-link';

const DepositUSDModal = ({ setFiatAmount }) => {

  const [currentAmount, setCurrentAmount] = useState(0);

  const updateAmount = (e) => {
    setCurrentAmount(e.target.value);
  };

  const confirmAmount = () => {
    setFiatAmount(currentAmount);
  }

  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">

        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Deposit USD</h3>
          <article className="mb-4">Deposits may take up to 24 hours to process.</article>
          <input value={currentAmount} onChange={updateAmount} type="number" placeholder="Amount" className="input w-full max-w-xs input-bordered mr-4" />
          <button htmlFor="my-modal-3" onClick={() => confirmAmount()} className="btn btn-primary">Transfer</button>

          {/* <ConfirmButton amount={contractDetails.amount} expiration={contractDetails.expiration} /> */}
          {/* <ApproveButton /> */}
        </div>
      </div>
    </div>
  )
}



const FiatAccount = ({ currencyType, fiatAmount }) => {

  const [hasLinked, setHasLinked] = useState(true);

  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    const response = await fetch('/api/create_link_token', {
      method: 'POST',
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };
  useEffect(() => {
    generateToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setHasLinked(true);
      // send public_token to server
    },
  });

  return (
    <div style={{ zIndex: -1 }} className="border rounded-lg p-4 bg-white m-4 flex justify-between">
      <div>
        <article>
          {currencyType} Account
        </article>
        <article className="prose-xl">${fiatAmount}</article>
      </div>
      <div className="flex">
        {
          hasLinked &&
          <label htmlFor="my-modal-3" className="btn btn-primary w-24 mr-2 my-auto">Deposit</label>
        }
        {
          !hasLinked &&
          <button onClick={() => open()} className="btn btn-primary w-24 mr-2 my-auto">Deposit</button>
        }


        <button className="btn btn-primary w-24 mr-2 my-auto">Withdraw</button>
      </div>
    </div>
  )
}

export default function Account() {
  const [fiatAmount, setFiatAmount] = useState(0);
  const [fiatAmountCop, setFiatAmountCop] = useState(0);
  return (
    <PageLayout>
      <DepositUSDModal setFiatAmount={setFiatAmount} />
      <article className="prose-xl mx-4">
        Account Balances
      </article>
      <FiatAccount fiatAmount={fiatAmount} currencyType={'USD'} />
      <FiatAccount fiatAmount={fiatAmountCop} currencyType={'COP'} />
    </PageLayout>
  )
};