import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, upgrades } from "hardhat";

/**
 * Deploys a contract named "CommerceContract" using the deployer account and
 * initializes it with the deployer address.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  // Deploy the CommerceContract logic contract
  const CommerceContract = await ethers.getContractFactory("CommerceContract");
  const commerceContract = await upgrades.deployProxy(CommerceContract, [], {
    initializer: "initialize",
  });

  await commerceContract.deployed();

  console.log("CommerceContract deployed to:", commerceContract.address);
};

export default deployYourContract;

deployYourContract.tags = ["CommerceContract"];
