import { Navbar } from '../components/Navbar';


const GoerliWarning = () => (
  <div className="bg-warning p-4">
    <div className="flex">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <span className="ml-4">Contracts are currently deployed on Goerli Testnet. Make sure your wallet is connected to Goerli.</span>
    </div>
  </div>
)

const Footer = () => (
  <div className="w-full">
    <div className="max-w-screen-xl mx-auto py-4 px-4">
      <div className="bg-neutral w-full rounded-lg p-6 flex">
        <article className="text-center text-white">
          Copyright © 2022 - All rights reserved
        </article>
      </div>
    </div>

  </div>

)

export const PageLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div >
        <GoerliWarning />
        <Navbar />
        <div className="max-w-screen-xl mx-auto">
          {children}

        </div>
      </div>
      <Footer />
    </div>
  )
}