import Head from 'next/head';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { GetGreeter, SetGreeter } from '../components/contract';

export default function Home() {
  return (
    <div className="from-primary to-secondary text-primary-content bg-gradient-to-br h-screen">
      <div className="flex flex-col justify-center h-full">
        <article className="prose-xl font-bold w-full text-center">
          SureFX
        </article>
        <article className="text-center">
          Forex hedging for emerging markets, powered by defi.
        </article>
        <div className="w-1/3 mx-auto flex ">
          <button className="btn btn-primary w-1/2 mr-2">Learn More</button>
          <button className="btn btn-secondary w-1/2 ml-2">Launch App</button>
        </div>
      </div>

    </div>
    // <div className={''}>

    //   <Head>
    //     <title>Create-Web3 App</title>
    //     <meta name="description" content="Generated by npx create-web3" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <header style={{ padding: '1rem' }}>
    //     <ConnectButton />
    //   </header>

    //   <main
    //     style={{
    //       minHeight: '60vh',
    //       flex: '1',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <GetGreeter />
    //     <SetGreeter />
    //   </main>
    // </div>
  );
}