import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { ArrowUturnDownIcon } from '@heroicons/react/24/outline';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className=" flex bg-base-200 drop-shadow mb-4 p-2 justify-between">
      <div className="w-4/5 flex">
        <a className="btn btn-ghost normal-case text-xl">SureFX</a>
        <div className="flex flex-col justify-center">
          <div className="flex h-6">
            <ShieldCheckIcon />
            <article onClick={() => router.push('/dashboard')}>Hedge</article>
          </div>
        </div>
        <div className="flex flex-col justify-center ml-4">
          <div className="flex h-6">
            <ArrowUturnDownIcon />
            <article onClick={() => router.push('/stake')}>Stake</article>
          </div>
          <article></article>
        </div>
        <div className="flex flex-col justify-center ml-4">
          <div className="flex h-6">
            <CircleStackIcon />
            <article>Mint</article>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <ConnectButton />
      </div>

      {/* <div className="justify-end">
        <div className="w-1/8">

        </div>
      </div> */}
    </div>
  )
}