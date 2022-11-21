import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { ArrowUturnDownIcon } from '@heroicons/react/24/outline';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Web3AuthLoginButton from './Login';
import Web3 from 'web3';
import { Web3Auth } from '@web3auth/modal';
import { useAccount, useConnect, useDisconnect } from 'wagmi'


export const Navbar = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount()
  console.log({ address, isConnected });

  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect()

  const connectWallet = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <div className="bg-neutral">
      <div className="flex max-w-screen-xl mx-auto text-white drop-shadow mb-4 p-2 justify-between">
        <img className="h-16" src="SureFX_HORIZONTAL_NEGATIVO-02.png" />
        <div className="w-4/5 flex">
          {/* <a className="btn btn-ghost normal-case text-xl">SureFX</a> */}
          <div className="flex flex-col justify-center">
            <div className="flex h-6">
              <ShieldCheckIcon />
              <article className="ml-1" onClick={() => router.push('/dashboard')}>Hedge</article>
            </div>
          </div>
          <div className="flex flex-col justify-center ml-4">
            <div className="flex h-6">
              <ArrowUturnDownIcon />
              <article className="ml-1" onClick={() => router.push('/stake')}>Stake</article>
            </div>
            <article></article>
          </div>
          {/* <div className="flex flex-col justify-center ml-4">
          <div className="flex h-6">
            <CircleStackIcon />
            <article>Mint</article>
          </div>
        </div> */}
        </div>
        <div className="flex flex-col justify-center w-48">
          <ConnectButton />
        </div>

        <div className="flex flex-col justify-center">
          {/* <Web3AuthLoginButton /> */}
          {!isConnected &&
            <button className="btn btn-outline btn-primary w-24 mr-2" onClick={() => connectWallet()}>Sign In</button>
          }
          {isConnected &&
            <button className="btn btn-outline btn-primary" onClick={() => disconnect()}>Sign Out</button>
          }

        </div>

        {/* <div className="justify-end">
        <div className="w-1/8">

        </div>
      </div> */}
      </div>
    </div>

  )
}