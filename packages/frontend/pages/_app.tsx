import * as React from 'react';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import '../styles/globals.css';
import '../styles/tailwind.css';

// Imports
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'


import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  Chain,
  lightTheme,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';



import { useIsMounted } from '../hooks';

// Get environment variables
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
// const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

const hardhatChain: Chain = {
  id: 31337,
  name: 'Hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Hardhat',
    symbol: 'HARD',
  },
  network: 'hardhat',
  rpcUrls: {
    default: 'http://127.0.0.1:8545',
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: 'ShHM5xifGO6sDTi8fmzz1nhkX-k2781F' })]
);

//test

// const { connectors } = getDefaultWallets({
//   appName: 'create-web3',
//   chains,
// });

const rainbowWeb3AuthConnector = ({ chains }) => ({
  id: "web3auth",
  name: "Web3Auth",
  iconUrl: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
  iconBackground: "#fff",
  createConnector: () => {
    const connector = new Web3AuthConnector({
      chains: chains,
      options: {
        socialLoginConfig: {

        },
        enableLogging: false,
        clientId: "BA_clSt7ZOqrvctbwpQPJX4oV6tbfm9st0gru2Z6-hYgvYGPThUPRg7UGL4mrL1vDl7-Mlt-Rjia-V4LotS84UA", // Get your own client id from https://dashboard.web3auth.io
        network: "testnet",
        chainId: "0x5"
      },
    });
    return {
      connector,
    };
  },
});

// const connectors = connectorsForWallets([
//   {
//     groupName: "Recommended",
//     wallets: [
//       // wallet.rainbow({ chains }),
//       // wallet.walletConnect({ chains }),
//       rainbowWeb3AuthConnector({ chains }),
//       wallet.metaMask({ chains }),
//     ],
//   },
// ]);

const wagmiClient = createClient({
  autoConnect: true,
  // connectors: [new Web3AuthConnector({
  //   chains: chains,
  //   options: {
  //     socialLoginConfig: {

  //     },
  //     enableLogging: true,
  //     clientId: "BA_clSt7ZOqrvctbwpQPJX4oV6tbfm9st0gru2Z6-hYgvYGPThUPRg7UGL4mrL1vDl7-Mlt-Rjia-V4LotS84UA", // Get your own client id from https://dashboard.web3auth.io
  //     network: "testnet",
  //     chainId: "0x5"
  //   },
  // })],
  connectors: [
    // rainbowWeb3AuthConnector({ chains }),
    new Web3AuthConnector({
      chains,
      options: {
        enableLogging: false,
        clientId: "BA_clSt7ZOqrvctbwpQPJX4oV6tbfm9st0gru2Z6-hYgvYGPThUPRg7UGL4mrL1vDl7-Mlt-Rjia-V4LotS84UA", // Get your own client id from https://dashboard.web3auth.io
        network: "testnet",
        chainId: "0x5"
      },
    }),
    new MetaMaskConnector({ chains }),
  ],
  provider,
});

const App = ({ Component, pageProps }: AppProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <WagmiConfig client={wagmiClient}>
      {isMounted &&
        <RainbowKitProvider coolMode theme={lightTheme({
          accentColor: '#0090FF',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })} chains={chains}>
          <NextHead>
            <title>SureFX</title>
          </NextHead>

          <Component {...pageProps} />

        </RainbowKitProvider>
      }
    </WagmiConfig>
  );
};

export default App;
