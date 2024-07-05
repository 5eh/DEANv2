import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys the CommerceFactory contract.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployCommerceFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  // Deploy the factory contract
  const deploymentResult = await deploy("CommerceFactory", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  // Check if the deployment was successful
  if (deploymentResult.newlyDeployed) {
    console.log("🏭 COMMERCE Factory deployed at:", deploymentResult.address, "🏭");
  } else {
    console.log("🏭 COMMERCE Factory already deployed at:", deploymentResult.address, "🏭");
  }

  try {
    // Fetch the deployment details directly
    const deployedFactory = await get("CommerceFactory");

    // Get the deployed factory contract to interact with it
    const commerceFactory: Contract = await hre.ethers.getContractAt(deployedFactory.abi, deployedFactory.address);
    console.log("🏭 COMMERCE Factory Address from ethers.getContractAt:", commerceFactory.address, "🏭");
  } catch (error) {
    console.error("❌ Error fetching the factory contract instance:", error);
  }
};

export default deployCommerceFactory;

deployCommerceFactory.tags = ["CommerceFactory"];
