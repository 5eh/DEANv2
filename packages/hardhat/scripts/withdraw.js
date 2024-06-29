const hre = require("hardhat");

async function main() {
  const lockAddress = "0xB528F2041619C8a4Cc461d7B492b86C22F709654";
  console.log(`Lock address: ${lockAddress}`);
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);
  const lockedAmount = await hre.ethers.provider.getBalance(lockAddress);
  const currentBalance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`Current balance of ${deployer.address} is ${hre.ethers.formatEther(currentBalance)}ETH`);
  const lock = await hre.ethers.getContractAt("Lock", lockAddress);

  const tx = await lock.withdraw();
  await tx.wait();

  console.log(`Withdrawn ${hre.ethers.formatEther(lockedAmount)}ETH from ${lockAddress} to ${deployer.address}`);

  const posBalance = await hre.ethers.provider.getBalance(deployer.address);

  console.log(`Balance after withdrawal of ${deployer.address} is ${hre.ethers.formatEther(posBalance)}ETH`);
  console.log(`sum of previous balance and withdrawn value: ${currentBalance + lockedAmount}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
