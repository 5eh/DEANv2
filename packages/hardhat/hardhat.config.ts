import * as dotenv from "dotenv";
dotenv.config();

import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {},
    m1: {
      url: "https://mevm.devnet.m1.movementlabs.xyz",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 336,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
