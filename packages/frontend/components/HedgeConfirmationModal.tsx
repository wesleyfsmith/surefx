import { ArrowLongRightIcon } from "@heroicons/react/24/outline";


//TODO make this view work both ways in the UI
export const HedgeConfirmationModal = ({contractDetails}) => {
  const fee = 123;
  const colateral = 123;
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">Confirm Hedge Details</h3>
            <div className="flex justify-center">
              <div className="flex flex-col justify-center">
                <article className="text-3xl">{contractDetails.amount}</article>
                <article className="text-center">USD</article>
              </div>
              
              <ArrowLongRightIcon className="w-28" />
              <div className="flex flex-col justify-center">
                <article className="text-3xl">123127</article>
                <article className="text-center">COP</article>
              </div>
            </div>
            <div>
              <article className="text-center">
              @ 4000COP = 1USD
              </article>
            </div>
            <article className="py-2 pt-8">The contract will expire on {contractDetails.expiration.toDateString()}</article>
            <article className="py-2">Fee: {fee}</article>
            <article className="py-2">Colateral: {colateral}</article>
            <article className="py-2">USDC Total Required: {contractDetails.lockedInRate}</article>
            <button className="btn btn-primary w-full">Confirm</button>
          </div>
        </div>
    </div>
  );
}