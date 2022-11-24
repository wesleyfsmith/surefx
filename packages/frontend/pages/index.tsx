import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { LockOpenIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
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

const Logo = () => {
  return (
    <g xmlns="http://www.w3.org/2000/svg">
      <g>
        <g>
          <path className="cls-1" d="M330.72,748.61l8.21-9.81c4.5,3.92,10.33,6.61,15.54,6.61,5.97,0,8.89-2.35,8.89-6.1,0-3.98-3.6-5.26-9.12-7.53l-8.22-3.5c-6.55-2.67-12.76-8.05-12.76-17.24,0-10.48,9.36-18.85,22.53-18.85,7.28,0,14.9,2.87,20.35,8.29l-7.22,9.01c-4.17-3.2-8.13-4.95-13.13-4.95s-8.07,2.05-8.07,5.67c0,3.88,4.14,5.29,9.66,7.49l8.06,3.26c7.72,3.12,12.55,8.27,12.55,17.2,0,10.5-8.76,19.6-23.83,19.6-8.23,0-16.98-3.12-23.43-9.14Z" />
          <path className="cls-1" d="M396.18,727.28v-33.94h14.3v35.4c0,12.38,3.9,16.66,10.98,16.66s11.21-4.28,11.21-16.66v-35.4h13.79v33.94c0,21.24-8.63,30.47-24.99,30.47s-25.28-9.24-25.28-30.47Z" />
          <path className="cls-1" d="M468.83,693.34h22.78c13.42,0,24.41,4.66,24.41,19.7s-11,20.79-24.41,20.79h-8.48v22.76h-14.3v-63.25Zm21.61,29.13c7.52,0,11.56-3.22,11.56-9.44s-4.04-8.34-11.56-8.34h-7.31v17.78h7.31Zm-1.45,7.58l9.89-9.15,20.19,35.68h-16l-14.07-26.53Z" />
          <path className="cls-1" d="M597.03,693.34h39.92v11.99h-25.62v14.66h21.88v11.99h-21.88v24.6h-14.3v-63.25Z" />
          <path className="cls-1" d="M664.06,724.04l-16.45-30.7h15.93l5.5,11.96c1.43,2.91,2.79,6.17,4.6,10.14h.39c1.46-3.97,2.79-7.23,4.05-10.14l5.02-11.96h15.26l-16.45,31.37,17.49,31.87h-15.93l-6.24-12.9c-1.59-3.27-3.05-6.53-4.74-10.41h-.39c-1.5,3.88-2.92,7.15-4.35,10.41l-5.92,12.9h-15.26l17.49-32.55Z" />
        </g>
        <g>
          <rect className="cls-1" x="532.78" y="693.31" width="45.18" height="12.43" />
          <rect className="cls-1" x="532.78" y="718.48" width="45.18" height="12.46" />
          <rect className="cls-1" x="532.78" y="744.62" width="45.1" height="12.33" />
        </g>
      </g>
      <g>
        <path className="cls-2" d="M408.23,377.78c-8.48,5.16-15.42,17.51-15.42,27.44v133.78c0,9.93,6.94,22.27,15.42,27.44l108.62,66.16c8.48,5.16,22.36,5.16,30.83,0l108.62-66.16c8.48-5.16,15.42-17.51,15.42-27.44v-133.78c0-9.93-6.94-22.27-15.42-27.44l-108.62-66.16c-8.48-5.16-22.36-5.16-30.83,0l-108.62,66.16Z" />
        <path className="cls-3" d="M370.17,399.93c-6.48,3.95-11.78,13.38-11.78,20.97v102.23c0,7.59,5.3,17.02,11.78,20.97l83.01,50.56c6.48,3.95,17.08,3.95,23.56,0l83.01-50.56c6.48-3.95,11.78-13.38,11.78-20.97v-102.23c0-7.59-5.3-17.02-11.78-20.97l-83.01-50.56c-6.48-3.95-17.08-3.95-23.56,0l-83.01,50.56Z" />
        <g>
          <path className="cls-3" d="M599.24,515.75c-1.64,0-2.98,1.34-2.98,2.98v21.81c0,1.64-1.34,2.98-2.98,2.98h-4.08c-1.64,0-2.98-1.34-2.98-2.98v-30.48c0-1.64,1.34-2.98,2.98-2.98h23.5c1.64,0,2.46,1.24,1.84,2.75l-1.31,3.17c-.63,1.51-2.48,2.75-4.12,2.75h-9.86Zm1.43,13.88c-1.64,0-2.98-1.34-2.98-2.98v-2.72c0-1.64,1.34-2.98,2.98-2.98h11.14c1.64,0,2.37,1.2,1.63,2.66l-1.7,3.36c-.74,1.46-2.69,2.66-4.32,2.66h-6.75Z" />
          <path className="cls-3" d="M645.46,509.5c.95-1.33,3.08-2.42,4.71-2.42h5.86c1.64,0,2.2,1.09,1.24,2.42l-9.57,13.36c-.95,1.33-.95,3.51,0,4.84l9.58,13.39c.95,1.33,.39,2.42-1.24,2.42h-5.86c-1.64,0-3.76-1.09-4.71-2.42l-3.68-5.13c-.95-1.33-2.51-1.33-3.47,0l-3.66,5.12c-.95,1.33-3.07,2.42-4.71,2.42h-5.86c-1.64,0-2.2-1.09-1.24-2.42l9.57-13.36c.95-1.33,.95-3.51,0-4.84l-9.58-13.39c-.95-1.33-.39-2.42,1.24-2.42h5.86c1.64,0,3.76,1.09,4.71,2.42l3.66,5.12c.95,1.33,2.51,1.33,3.47,0l3.68-5.13Z" />
        </g>
        <path className="cls-1" d="M525.57,413.83l-7.08,17.07c-1.31,3.16-4.4,5.22-7.82,5.22h-63.18c-2.32,0-4.11,.66-5.36,1.96-1.25,1.31-1.87,3.18-1.87,5.62,0,3.09,3.04,5.74,9.11,7.94,5.06,1.91,13.2,4.14,24.42,6.69,11.22,2.56,21.08,5.74,29.6,9.55,18.45,8.27,27.53,21.27,27.23,39.01-.24,12.26-5.45,21.96-15.62,29.1-8.63,6.01-18.9,9.02-30.8,9.02h-77.4c-6.04,0-10.14-6.14-7.82-11.71l7.08-17.07c1.31-3.16,4.4-5.22,7.82-5.22h70.32c2.62,0,4.52-.45,5.71-1.34,.95-.59,1.43-1.67,1.43-3.21,.06-3.75-2.02-6.55-6.25-8.39-5.18-2.38-14.43-5-27.77-7.85-13.33-2.86-24.23-6.34-32.68-10.44-15.71-7.44-23.6-19.46-23.66-36.06,0-12.67,4.88-22.97,14.64-30.88,8.75-7.14,19.37-10.71,31.87-10.71h70.26c6.04,0,10.14,6.14,7.82,11.71Z" />
      </g>
    </g>
  )
}

const Titlebar = () => (
  <div className="bg-neutral">
    <div className="flex mx-auto justify-between">
      {/* <LogoNavBar /> */}
      {/* <img className="h-16 p-2 pl-8" src={'logo_repbase.png'}></img> */}
      <img className="h-16 pl-8" src="SureFX_HORIZONTAL_NEGATIVO-02.png" />
      {/* <article className="prose text-2xl font-bold p-2 text-primary pl-8">
        SureFX
      </article> */}

      <div className="flex pr-8">
        <div className="flex flex-col justify-center">
          <a href="/dashboard" className="btn btn-primary btn-outline w-36">Launch App</a>
        </div>
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
  const router = useRouter();

  return (
    <div>
      <div className="md:h-full bg-neutral pb-12">
        <Titlebar />
        <div className="max-w-4xl md:flex mx-auto pt-0 p-8 ">
          <div className="md:w-1/2 sm:w-full my-auto mx-auto">
            <img src={'SureFX_VERTICAL_NEGATIVO.png'} className=""></img>

          </div>
          <Logo />
          <div className="md:w-1/2 sm:w-full my-auto mx-auto px-2 pt-8">
            <article className="prose text-2xl font-bold text-white text-center mb-4">
              {'Decentralized Currency Hedging For Emerging Markets'}
            </article>
            <article className="prose text-justify text-white">
              {/* {'We bring together employers and employees to create unique, non-transferable, reliable, user-owned professional reputation profiles that are stored on the blockchain.'} */}
              {'SureFX’s mission is to unlock the power of DeFi and Web3 so anyone can do business in a foreign currency without the risk of losing money when they exchange back to their local currency.'}
            </article>
            <div className="form-control">
              <a className="w-full" onClick={() => router.push('/dashboard')}>
                <button className="btn btn-primary mt-4 w-full">Hedge with SureFX</button>
              </a>
            </div>

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
