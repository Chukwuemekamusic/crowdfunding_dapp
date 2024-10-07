import { expect } from "chai";
import hre, { viem } from "hardhat";
import { parseEther, getAddress } from "viem";

// const { expect } = require("chai");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox-viem/network-helpers");


describe("CrowdFunding Contract", function () {
  async function deployContract() {
    const crowdFunding = await hre.viem.deployContract("CrowdFunding");
    const [owner, addr1, addr2, addr3] = await hre.viem.getWalletClients();
    console.log("owner", typeof owner.account.address);
    console.log("addr1", addr1.account.address);
    console.log("addr2", addr2.account.address);
    console.log("addr3", addr3.account.address);

    const publicClient = await hre.viem.getPublicClient();
    return {
      crowdFunding,
      owner,
      publicClient,
      addr1,
      addr2,
      addr3,
    };
  }

  describe("Deployment", function () {
    it("Should set the owner correctly", async function () {
      const { crowdFunding, owner } = await loadFixture(deployContract);
      const ownerAddress = await crowdFunding.read.owner();
      expect(ownerAddress).to.equal(getAddress(owner.account.address));
    });
  });

  describe("Create Campaign", function () {
    it("Should create a campaign successfully", async function () {
      const { crowdFunding, owner, addr1 } = await loadFixture(deployContract);
      const title = "Test Campaign";
      const description = "A description of the test campaign";
      const target = parseEther("10");
      const latestTime = await time.latest(); // This returns a BigInt
      const deadline = BigInt(latestTime) + BigInt(60 * 60 * 24); // 1 day later
      const image = "test_image_url";

      // We retrieve the contract with a different account to send a transaction
      const crowdFundingAsOtherAccount = await hre.viem.getContractAt(
        "CrowdFunding",
        crowdFunding.address,
        { client: { wallet: addr1 } }
      );

      await expect(
        crowdFundingAsOtherAccount.write.createCampaign([
          title,
          description,
          target,
          deadline,
          image,
        ])
      ).to.be.fulfilled;
      // await tx.wait();

      const campaignCount = await crowdFunding.read.campaignCount();

      const campaignId = Number(campaignCount) - 1;

      const campaignData = await crowdFunding.read.campaigns([
        BigInt(campaignId),
      ]);
      console.log("campaignData", campaignData);
      const campaign = {
        owner: campaignData[0],
        title: campaignData[1],
        description: campaignData[2],
        target: campaignData[3],
        deadline: campaignData[4],
        amountCollected: campaignData[5],
        currentBalance: campaignData[6],
        image: campaignData[7],
      };

      expect(campaign.owner).to.equal(getAddress(addr1.account.address));
      expect(campaign.title).to.equal(title);
      expect(campaign.description).to.equal(description);
      expect(campaign.target).to.equal(target);
      expect(campaign.deadline).to.equal(deadline);
      expect(campaign.image).to.equal(image);
      // expect(campaign.target).to.equal(target);
      // expect(campaign.deadline).to.equal(deadline);
    });
  });
});
