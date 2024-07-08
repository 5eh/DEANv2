import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployCommerceFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy the factory contract
  const deploymentResult = await deploy("CommerceFactory", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  if (deploymentResult.newlyDeployed) {
    console.log("🏭 Commerce Factory deployed at:", deploymentResult.address, "🏭");
  } else {
    console.log("🏭 Commerce Factory already deployed at:", deploymentResult.address, "🏭");
  }

  try {
    const commerceFactory = await ethers.getContractAt("CommerceFactory", deploymentResult.address);
    console.log("🏭 Commerce Factory Address from ethers.getContractAt:", commerceFactory, "🏭");

    // Create a new CommerceContract through the factory
    const tx = await commerceFactory.createCommerceContract(
      "1",
      "2",
      ".jpg",
      "w",
      "Air",
      "None",
      "John Doe",
      100000000,
      300000000,
      1000000000,
    );
    await tx.wait();

    // Get all deployed CommerceContract addresses
    const allContracts = await commerceFactory.getCommerceContracts();
    console.log("🏭 All Commerce Contracts:", allContracts);

    for (const contractAddress of allContracts) {
      const contractInstance = await ethers.getContractAt("CommerceContract", contractAddress);
      const productData = await contractInstance.getContractInfo();
      console.log(`📦 Product Data for contract ${contractAddress}:`, productData);
    }
  } catch (error) {
    console.error("❌ Error interacting with the factory contract instance:", error);
  }
};

export default deployCommerceFactory;

deployCommerceFactory.tags = ["CommerceFactory"];
