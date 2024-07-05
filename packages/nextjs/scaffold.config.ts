import * as chains from "viem/chains";

import { defineChain } from "viem";

export const mevm = defineChain({
  id: 336,
  name: "Movement EVM",
  nativeCurrency: {
    decimals: 18,
    name: "Move Tokens",
    symbol: "MVMT",
  },
  rpcUrls: {
    default: {
      http: ["https://mevm.devnet.m1.movementlabs.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.movementlabs.xyz/#/?network=local" },
  },
  contracts: {
    multicall3: {
      address: "0x4821b8c6B10a12933bF790823eb992cBCb563639",
      blockCreated: 5882,
    },
  },
});

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

const scaffoldConfig = {
  // The networks on which your DApp is live
  targetNetworks: [mevm],

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
