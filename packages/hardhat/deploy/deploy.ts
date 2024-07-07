import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployCommerceContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy the CommerceFactory contract
  const factoryDeployment = await deploy("CommerceFactory", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  // Check if the deployment was successful
  if (factoryDeployment.newlyDeployed) {
    console.log("🏭 Commerce Factory deployed at:", factoryDeployment.address, "🏭");
  } else {
    console.log("🏭 Commerce Factory potentially already deployed:", factoryDeployment.address);
  }

  // Deploy the CommerceContract through the factory
  try {
    // Get the deployed factory contract to interact with it
    const commerceFactory = await ethers.getContractAt("CommerceFactory", factoryDeployment.address);
    console.log("🏭 Commerce Factory Address from ethers.getContractAt:", commerceFactory.address, "🏭");

    // Create a new CommerceContract through the factory
    const tx = await commerceFactory.createCommerceContract(
      "Sample Plant",
      "A beautiful and rare plant",
      1000, // price
      10, // quantity
      "SelectionType1",
      "https://example.com/photo.jpg",
    );
    await tx.wait();

    // Get all deployed CommerceContract addresses
    const allContracts = await commerceFactory.getCommerceContracts();
    console.log("🏭 All Commerce Contracts:", allContracts);

    // Iterate over all contracts and get their product data
    for (const contractAddress of allContracts) {
      const productData = await commerceFactory.getProductData(contractAddress);
      console.log(`📦 Product Data for contract ${contractAddress}:`, productData);
    }
  } catch (error) {
    console.error("❌ Error interacting with the factory contract instance:", error);
  }
};

export default deployCommerceContracts;
