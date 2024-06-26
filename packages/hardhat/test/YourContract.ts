import { expect } from "chai";
import { ethers } from "hardhat";
import { CommerceContract } from "../typechain-types";

describe("CommerceContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let commerceContract: CommerceContract;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const commerceContractFactory = await ethers.getContractFactory("YourContract");
    commerceContract = (await commerceContractFactory.deploy(owner.address)) as CommerceContract;
    await commerceContract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await commerceContract.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await commerceContract.setGreeting(newGreeting);
      expect(await commerceContract.greeting()).to.equal(newGreeting);
    });
  });
});
