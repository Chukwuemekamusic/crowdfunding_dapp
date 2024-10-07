const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // Deploy the contract
    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
    const crowdFunding = await CrowdFunding.deploy();
    // await crowdFunding.deployed();

   

    // Read campaigns from JSON file
    const campaignsPath = path.join(__dirname, '..', 'campaigns.json');
    const campaignsData = fs.readFileSync(campaignsPath, 'utf8');
    const campaigns = JSON.parse(campaignsData);

    // Create campaigns
    for (const campaign of campaigns) {
      const tx = await crowdFunding.createCampaign(
        campaign.title,
        campaign.description,
        BigInt(campaign.target),
        BigInt(campaign.deadline) + BigInt(1000000000),
        campaign.image
      );
      await tx.wait();
      console.log(`Created campaign: ${campaign.title}`);
    }

    console.log("All campaigns created successfully");
    console.log("Deployed contract to: ", crowdFunding);
  } catch (error) {
    console.error("Error in deployment or campaign creation:", error);
  }
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });