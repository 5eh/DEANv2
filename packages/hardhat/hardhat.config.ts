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
import "@openzeppelin/hardhat-upgrades"; // Import OpenZeppelin upgrades plugin

import "@nomicfoundation/hardhat-toolbox";

module.exports = {
  defaultNetwork: "m1",
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
      default: 0, // The first account in the accounts array
    },
  },
  solidity: {
    version: "0.8.26",
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
