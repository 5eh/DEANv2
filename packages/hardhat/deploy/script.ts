//   const title = "Test Product";
//   const description = "Test Description";
//   const photoURL = "http://example.com/photo.jpg";
//   const originsLocation = "Test Location";
//   const shippingMethod = "Test Shipping";
//   const upcharges = "None";
//   const sellerName = "Test Seller";
//   const quantity = 10;
//   const validityTime = 1000000;
//   const productPrice = 100000000; // Default value
//   const contractTimestamp = Math.floor(Date.now() / 1000);

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("CommerceContract", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const yourContract = await hre.ethers.getContract<Contract>("CommerceContract", deployer);
  console.log("📜 COMMERCE Contract Address:", yourContract.target, "📜");
};

export default deployYourContract;

deployYourContract.tags = ["CommerceContract"];
