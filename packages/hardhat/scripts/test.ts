import { ethers } from "hardhat";

async function main() {
  // Replace with your deployed CommerceFactory contract address
  const factoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Attach to the deployed CommerceFactory contract
  const CommerceFactory = await ethers.getContractFactory("CommerceFactory");
  const commerceFactory = await CommerceFactory.attach(factoryAddress);

  // Create a new CommerceContract via the factory
  let tx = await commerceFactory.createCommerceContract(
    "Sample Plant",
    "A beautiful and rare plant",
    "https://example.com/photo.jpg",
    "Tropical Rainforest",
    "Air Freight",
    "None",
    "John Doe",
    10,
    30,
    1000000000,
  );
  await tx.wait();

  // Get the number of deployed Commerce contracts
  const commerceContractsLength = await commerceFactory.getCommerceContracts().length;
  console.log("Number of deployed Commerce contracts:", commerceContractsLength);

  // Ensure there's at least one Commerce contract deployed
  if (commerceContractsLength > 0) {
    // Fetch the newly created Commerce contract address from the factory
    const commerceContractAddress = await commerceFactory.getCommerceContractAddress(commerceContractsLength - 1);
    console.log("New Commerce contract deployed at:", commerceContractAddress);

    // Interact with the newly created Commerce contract via the factory
    // Here, you can add more interaction code as needed, similar to the Greeter example
  } else {
    console.error("No Commerce contracts deployed.");
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
