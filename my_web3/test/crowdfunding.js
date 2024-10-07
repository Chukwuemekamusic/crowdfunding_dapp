const { expect,  } = require("chai");
const { ethers } = require("hardhat");
const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("CrowdFunding Contract", function () {
  async function deployContract() {
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    const crowdFunding = await CrowdFunding.deploy();
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    console.log("owner", typeof owner.address);
    console.log("addr1", addr1.address);
    console.log("addr2", addr2.address);
    console.log("addr3", addr3.address);

    // const publicClient = await hre.viem.getPublicClient();
    return {
      crowdFunding,
      owner,
      addr1,
      addr2,
      addr3,
    };
  }
  describe("Deployment", function () {
    it("Should set the owner correctly", async function () {
      const { crowdFunding, owner } = await loadFixture(deployContract);
      const ownerAddress = await crowdFunding.owner();
      expect(ownerAddress).to.equal(owner.address);
    });
  });


   describe("Create Campaign", function () {
    it("Should create a campaign successfully", async function () {
      const { crowdFunding, owner, addr1 } = await loadFixture(deployContract);
      const title = "Test Campaign";
      const description = "A description of the test campaign";
      const target = ethers.parseEther("10");
      console.log("target", typeof target);
      const latestTime = await time.latest(); // This returns a BigInt
      const deadline = BigInt(latestTime) + BigInt(1 * 24 * 60 * 60); // 1 day later, in seconds

      console.log("latestTime", latestTime);
      console.log("deadline", Date.parse(deadline));
   
      const image = "test_image_url";

    

     const tx = await (
        crowdFunding.connect(addr1).createCampaign(
          title,
          description,
          target,
          deadline,
          image,
        )
      )
      console.log("tx", tx);
      await tx.wait();

      const campaignCount = await crowdFunding.campaignCount();

      const campaignId = Number(campaignCount) - 1;

      const campaign= await crowdFunding.campaigns(
        BigInt(campaignId),
      );
      console.log("campaignData", campaign);
      

      expect(campaign.owner).to.equal(addr1.address);
      expect(campaign.title).to.equal(title);
      expect(campaign.description).to.equal(description);
      expect(campaign.target).to.equal(target);
      expect(campaign.deadline).to.equal(deadline);
      expect(campaign.image).to.equal(image);
    });
  });

});