import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { LockOpenIcon } from '@heroicons/react/24/outline';
// import { FooterBlack } from './employee/footer/FooterBlack';
// import { EyeIcon } from '@heroicons/react/outline';
// import { CreditCardIcon } from '@heroicons/react/outline';
// import { BadgeCheckIcon } from '@heroicons/react/outline';

import { EyeIcon } from '@heroicons/react/24/outline';
// import { CreditCardIcon}

const BankNote = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>
);


const Titlebar = () => (
  <div className="bg-neutral">
    <div className="flex mx-auto justify-between">
      {/* <img className="h-16 p-2 pl-8" src={'logo_repbase.png'}></img> */}
      <article className="prose text-2xl font-bold p-2 text-primary pl-8">
        SureFX
      </article>
      <div className="flex pr-8">
        <a className="hidden md:block w-full mx-2 my-auto" href="mailto: contact@surefx.xyz" >
          <article className="prose text-white mx-2 my-auto">
            Contact
          </article>
        </a>
      </div>

    </div>

  </div>
);

const FooterWhite = () => (
  <div className="py-16 flex flex-col">
    <article className="prose text-center text-white mx-auto ">
      {'Copyright © 2022\n'}
    </article>
    <article className="prose text-center text-white mx-auto ">
      {'All right reserved by Repbase'}
    </article>
  </div>
);

const FooterBlack = () => (
  <div className="py-16 flex flex-col">
    <article className="prose text-center mx-auto ">
      {'Copyright © 2022\n'}
    </article>
    <article className="prose text-center mx-auto ">
      {'All right reserved by SureFX'}
    </article>
  </div>
);

export default function LandingPage() {

  // md:h-full from-primary to-neutral bg-gradient-to-br

  return (
    <div>
      <div className="md:h-full bg-neutral pb-12">
        <Titlebar />
        <div className="max-w-4xl md:flex mx-auto pt-0 p-8 ">
          {/* <div className="md:w-1/2 sm:w-full my-auto mx-auto">
            <img src={'REPBASE_VERTICAL_NEGATIVO.png'} className=""></img>

          </div> */}
          <div className="md:w-1/2 sm:w-full my-auto mx-auto px-2 pt-8">
            <article className="prose text-2xl font-bold text-white text-center mb-4">
              {'Decentralized Currency Hedging For Emerging Markets'}
            </article>
            <article className="prose text-justify text-white">
              {/* {'We bring together employers and employees to create unique, non-transferable, reliable, user-owned professional reputation profiles that are stored on the blockchain.'} */}
              {'SureFX’s mission is to unlock the power of DeFi and Web3 so anyone can do business in a foreign currency without the risk of losing money when they exchange back to their local currency.'}
            </article>
            {/* <div className="form-control">
              <a className="w-full" href={`${Meteor.absoluteUrl()}repbase_whitepaper_v1.11.pdf`} download>
                <button className="btn btn-primary mt-4 w-full">Learn More</button>
              </a>
            </div> */}

          </div>
          {/* <div className="md:w-1/2 sm:w-full mt-8">
            <img className="w-64 mx-auto" src="phone.png"></img>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col mt-12 md:pb-24">
        <article className="prose text-center mx-auto pb-4 md:pt-12 md:pb-12 font-bold text-2xl md:whitespace-pre">
          {'Forex hedging for emerging markets made cheaper and easier with DeFi'}
        </article>
        <div className="flex flex-col md:flex-row justify-center mx-4 lg:w-4/5 md:mx-auto">
          <div className="mx-12">
            <ShieldCheckIcon className="w-20 mx-auto" />
            <article className="prose prose-xl font-bold text-center ">Guarantee your bottom line</article>
            <article className="prose text-center">Freeze your exchange rate in the future to protect against price volatility</article>
          </div>
          <div className="mx-12">
            <ReceiptPercentIcon className="w-20 mx-auto" />
            {/* <CreditCardIcon className="w-20 mx-auto" /> */}
            <article className="prose prose-xl font-bold text-center ">Pay less, wait less</article>
            <article className="prose text-center">DeFi let's us charge a fraction of what businesses pay today and move your money instantly 24/7</article>
          </div>
          <div className="mx-12">
            <LockOpenIcon className="w-20 mx-auto" />
            {/* <BadgeCheckIcon className="w-20 mx-auto" /> */}
            <article className="prose prose-xl font-bold text-center ">Built for everyone</article>
            <article className="prose text-center">Any business or person can easily use our protocol, with or without KYC and with a world-class UX</article>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 mt-8 pb-24">
        <img className="w-1/3 mx-auto pt-16 " src="eth_bogota.png"></img>
        <article className="text-center md:pt-4   font-bold text-2xl pb-12">
          ETH Bogotá 2022 Hackathon Winners
        </article>
        <div className="flex justify-center">
          <div className="w-96">
            <img className="mx-auto pt-1" src="Primary_Logo.svg"></img>
            <article className="text-center">Polygon Sponsor Prize</article>
          </div>
          <div className="w-80 mr-0 md:mr-16">
            <img className="mb-2 pt-3" src="Lockup.svg"></img>
            <article className="text-center pt-1">WalletConnect Sponsor Prize</article>
          </div>
          {/* <div className="w-1/2">
            
          </div>
          <div className="w-1/2">
            
          </div> */}
        </div>
      </div>
      {/* <div>
        <article>
          Meet Repbase
        </article>
      </div> */}
      <div className="bg-white px-8">
        <article className="text-center pt-8 md:pt-24 font-bold text-2xl pb-2">
          Start your journey with the SureFX Protocol
        </article>
        <article className="text-center text-xl pb-8 md:pb-12">
          Sign up for updates about open beta, future airdrop, and more!
        </article>
        <div className="flex flex-col">
          <input type="email" placeholder="E-mail personal" className=" w-full input input-bordered md:w-1/2 md:mx-auto" />
          <button className="w-full btn btn-primary mt-4 md:w-1/2 md:mx-auto">Get Updates</button>
        </div>
        <FooterBlack />

      </div>
    </div>

  );
};
