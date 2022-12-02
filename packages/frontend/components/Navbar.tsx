import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { ArrowUturnDownIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Web3AuthLoginButton from './Login';
import Web3 from 'web3';
import { Web3Auth } from '@web3auth/modal';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Link from 'next/link';

const Logo = () => (
  <Link href="/">
    <svg className="ml-2 mr-8" width="140" viewBox="0 0 644 259" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1_25)">
        <path d="M285.17 148.08L293.05 138.66C297.37 142.42 302.97 145 307.96 145C313.69 145 316.49 142.74 316.49 139.14C316.49 135.32 313.04 134.09 307.74 131.91L299.85 128.55C293.56 125.99 287.6 120.82 287.6 112C287.6 101.94 296.59 93.91 309.22 93.91C316.21 93.91 323.52 96.67 328.75 101.87L321.82 110.52C317.82 107.45 314.02 105.77 309.22 105.77C304.42 105.77 301.48 107.74 301.48 111.21C301.48 114.93 305.45 116.29 310.75 118.4L318.49 121.53C325.9 124.53 330.53 129.46 330.53 138.04C330.53 148.12 322.13 156.86 307.66 156.86C299.76 156.86 291.37 153.87 285.17 148.08V148.08Z" fill="#F9F9F9" />
        <path d="M347.99 127.61V95.04H361.71V129.02C361.71 140.91 365.46 145.01 372.25 145.01C379.04 145.01 383.01 140.9 383.01 129.02V95.04H396.24V127.61C396.24 147.99 387.96 156.86 372.25 156.86C356.54 156.86 347.99 147.99 347.99 127.61Z" fill="#F9F9F9" />
        <path d="M417.73 95.03H439.59C452.47 95.03 463.02 99.5001 463.02 113.93C463.02 128.36 452.47 133.89 439.59 133.89H431.45V155.74H417.73V95.03V95.03ZM438.48 122.99C445.7 122.99 449.58 119.9 449.58 113.93C449.58 107.96 445.7 105.92 438.48 105.92H431.46V122.99H438.48ZM437.09 130.27L446.58 121.49L465.95 155.74H450.59L437.08 130.28L437.09 130.27Z" fill="#F9F9F9" />
        <path d="M540.78 95.03H579.09V106.54H554.5V120.62H575.5V132.13H554.5V155.74H540.78V95.03V95.03Z" fill="#F9F9F9" />
        <path d="M605.11 124.5L589.32 95.03H604.61L609.89 106.51C611.26 109.3 612.56 112.43 614.31 116.24H614.68C616.08 112.43 617.35 109.3 618.57 106.51L623.39 95.03H638.04L622.25 125.14L639.04 155.73H623.75L617.76 143.35C616.24 140.22 614.83 137.08 613.21 133.36H612.84C611.41 137.09 610.04 140.22 608.67 143.35L602.99 155.73H588.34L605.13 124.49L605.11 124.5Z" fill="#F9F9F9" />
        <path d="M522.48 95H479.11V106.93H522.48V95Z" fill="#F9F9F9" />
        <path d="M522.48 119.16H479.11V131.12H522.48V119.16Z" fill="#F9F9F9" />
        <path d="M522.4 144.25H479.11V156.08H522.4V144.25Z" fill="#F9F9F9" />
        <path d="M42.1899 53.65C35.7399 57.58 30.46 66.97 30.46 74.52V176.26C30.46 183.81 35.7399 193.2 42.1899 197.13L124.8 247.44C131.25 251.37 141.8 251.37 148.25 247.44L230.86 197.13C237.31 193.2 242.59 183.81 242.59 176.26V74.52C242.59 66.97 237.31 57.58 230.86 53.65L148.25 3.33996C141.8 -0.590044 131.25 -0.590044 124.8 3.33996L42.1899 53.65Z" fill="#003258" />
        <path d="M13.24 70.49C8.30999 73.49 4.28003 80.6699 4.28003 86.4399V164.19C4.28003 169.96 8.30999 177.14 13.24 180.14L76.37 218.59C81.3 221.59 89.36 221.59 94.29 218.59L157.42 180.14C162.35 177.14 166.38 169.96 166.38 164.19V86.4399C166.38 80.6699 162.35 73.49 157.42 70.49L94.29 32.04C89.36 29.04 81.3 29.04 76.37 32.04L13.24 70.49Z" fill="#0090FF" />
        <path d="M187.45 158.57C186.2 158.57 185.19 159.59 185.19 160.83V177.42C185.19 178.67 184.17 179.68 182.93 179.68H179.82C178.57 179.68 177.56 178.66 177.56 177.42V154.24C177.56 152.99 178.58 151.98 179.82 151.98H197.69C198.94 151.98 199.56 152.92 199.09 154.07L198.09 156.48C197.61 157.63 196.2 158.57 194.96 158.57H187.46H187.45ZM188.54 169.13C187.29 169.13 186.28 168.11 186.28 166.87V164.8C186.28 163.55 187.3 162.54 188.54 162.54H197.01C198.26 162.54 198.81 163.45 198.25 164.56L196.96 167.11C196.4 168.22 194.92 169.13 193.67 169.13H188.54Z" fill="#0090FF" />
        <path d="M222.6 153.82C223.33 152.81 224.94 151.98 226.18 151.98H230.64C231.89 151.98 232.31 152.81 231.59 153.82L224.31 163.98C223.58 164.99 223.58 166.65 224.31 167.66L231.59 177.84C232.31 178.85 231.89 179.68 230.64 179.68H226.18C224.93 179.68 223.32 178.85 222.6 177.84L219.8 173.94C219.07 172.93 217.89 172.93 217.16 173.94L214.38 177.84C213.66 178.85 212.04 179.68 210.8 179.68H206.34C205.09 179.68 204.67 178.85 205.39 177.84L212.67 167.68C213.4 166.67 213.4 165.01 212.67 164L205.39 153.82C204.67 152.81 205.09 151.98 206.34 151.98H210.8C212.05 151.98 213.66 152.81 214.38 153.82L217.16 157.72C217.88 158.73 219.07 158.73 219.8 157.72L222.6 153.82Z" fill="#0090FF" />
        <path d="M131.42 81.0601L126.04 94.04C125.04 96.45 122.69 98.01 120.09 98.01H72.04C70.27 98.01 68.9199 98.51 67.9699 99.5C67.0199 100.5 66.54 101.92 66.54 103.78C66.54 106.13 68.8499 108.15 73.4699 109.82C77.3199 111.27 83.51 112.97 92.04 114.91C100.57 116.86 108.08 119.28 114.55 122.17C128.58 128.46 135.49 138.35 135.26 151.84C135.08 161.16 131.12 168.54 123.38 173.97C116.82 178.54 109.01 180.83 99.9499 180.83H41.0799C36.4899 180.83 33.3699 176.16 35.1299 171.92L40.51 158.94C41.51 156.53 43.8599 154.97 46.4599 154.97H99.9399C101.93 154.97 103.38 154.63 104.29 153.95C105.01 153.5 105.38 152.68 105.38 151.51C105.42 148.66 103.84 146.53 100.63 145.13C96.69 143.32 89.65 141.33 79.51 139.16C69.37 136.99 61.09 134.34 54.66 131.22C42.71 125.56 36.71 116.42 36.67 103.79C36.67 94.15 40.38 86.32 47.81 80.3C54.46 74.87 62.54 72.15 72.05 72.15H125.48C130.07 72.15 133.19 76.8201 131.43 81.0601H131.42Z" fill="#F9F9F9" />
      </g>
      <defs>
        <filter id="filter0_d_1_25" x="0.280029" y="0.392456" width="642.76" height="257.995" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_25" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_25" result="shape" />
        </filter>
      </defs>
    </svg>
  </Link>
)

export const Navbar = () => {
  const router = useRouter();
  const { address, isConnected, connector } = useAccount()

  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  // console.log({ connectors });

  console.log({ address });

  const connectWallet = () => {
    connect({ connector: connectors[0] });
  };

  const connectMetamask = () => {
    connect({ connector: connectors[1] });
  }

  const web3AuthConnected = connector ? connector.id === 'web3Auth' : false;
  const metamaskConnect = connector ? connector.id === 'metaMask' : false;

  const isLinkSelected = (href: string): string => {
    return router.asPath == href ? 'border-b-2 border-primary' : '';
  }

  return (
    <div className="bg-neutral">
      <div className="flex max-w-screen-xl mx-auto text-white drop-shadow mb-4 p-2 justify-between">
        {/* <img className="h-16" src="SureFX_HORIZONTAL_NEGATIVO-02.png" /> */}

        <Logo />
        <div className="w-4/5 flex">
          {/* <a className="btn btn-ghost normal-case text-xl">SureFX</a> */}
          <div onClick={() => router.push('/dashboard')} className={`flex flex-col justify-center ${isLinkSelected('/dashboard')} hover:text-gray-300`}>
            <div className="flex h-6 ">
              <ShieldCheckIcon />
              <article className="ml-1" >Hedge</article>
            </div>
          </div>
          <div onClick={() => router.push('/stake')} className={`flex flex-col justify-center ml-4 ${isLinkSelected('/stake')} hover:text-gray-300`}>
            <div className="flex h-6">
              <ArrowUturnDownIcon />
              <article className="ml-1" >Pool</article>
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
        {
          isConnected && metamaskConnect &&
          <div className="flex flex justify-end mr-2 w-64 my-1">
            <ConnectButton showBalance={{ smallScreen: false, largeScreen: false }} />
          </div>
        }
        {
          isConnected && web3AuthConnected &&
          <div className="flex">
            <div className="flex flex-col justify-center mr-2">
              <div className="dropdown dropdown-end" style={{ zIndex: 100 }}>
                <label tabIndex={0}>
                  <UserCircleIcon className="h-8" />
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black">
                  <li><Link href="/account">Account Balances</Link></li>
                  <li onClick={() => disconnect()}><a>Logout</a></li>
                </ul>
              </div>
            </div>
            {/* <div className="flex flex-col justify-center">
            <article className="ml-1">Account</article>
          </div> */}
          </div>
        }


        {/* <button className="btn btn-outline btn-primary w-24 mr-2 my-auto" onClick={() => connectMetamask()}>Account</button> */}


        {!isConnected &&
          <div className="flex justify-center">
            {/* <Web3AuthLoginButton /> */}
            <button className="btn btn-outline btn-primary w-24 mr-2 my-auto" onClick={() => connectMetamask()}>Connect Metamask</button>
            <button className="btn btn-outline btn-primary w-24 mr-2 my-auto" onClick={() => connectWallet()}>Log In</button>

            {/* {isConnected &&
            <button className="btn btn-outline btn-primary" onClick={() => disconnect()}>Sign Out</button>
          } */}

          </div>
        }

        {/* <div className="justify-end">
        <div className="w-1/8">

        </div>
      </div> */}
      </div>
    </div>

  )
}