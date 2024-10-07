// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrowdFunding is ERC721, Ownable {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        uint256 currentBalance;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount = 0;

    constructor() ERC721("CrowdFunding", "CF") Ownable(msg.sender) {}

    event CampaignCreated(
        uint256 id,
        address owner,
        string title,
        string description,
        uint256 target,
        uint256 deadline,
        string image
    );

    event CampaignDonated(uint256 id, address donator, uint256 amount);

    event FundsWithdrawn(uint256 id, address owner, uint256 amount);

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage newCampaign = campaigns[campaignCount];

        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future."
        );
        require(_target > 0, "Target amount must be greater than 0");

        newCampaign.owner = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;
        newCampaign.currentBalance = 0;
        newCampaign.image = _image;
        newCampaign.donators = new address[](0);
        newCampaign.donations = new uint256[](0);
        campaignCount++;
        emit CampaignCreated(
            campaignCount - 1,
            msg.sender,
            _title,
            _description,
            _target,
            _deadline,
            _image
        );
        return campaignCount - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        require(msg.value > 0, "Donation amount must be greater than 0.");
        require(campaigns[_id].deadline != 0, "Campaign does not exist.");
        require(
            campaign.deadline > block.timestamp,
            "The campaign has already ended."
        );
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;
        campaign.currentBalance += msg.value;
        emit CampaignDonated(_id, msg.sender, msg.value);
    }

    modifier onlyCampaignOwner(uint256 _id) {
        require(
            msg.sender == campaigns[_id].owner,
            "Only the owner can call this function."
        );
        _;
    }

    function withdrawFunds(uint256 _id) public onlyCampaignOwner(_id) {
        Campaign storage campaign = campaigns[_id];
        require(campaign.amountCollected > 0, "No funds to withdraw.");
        require(campaign.currentBalance > 0, "No funds to withdraw.");
        (bool sent, ) = payable(campaign.owner).call{
            value: campaign.currentBalance
        }("");
        require(sent, "Failed to send Ether");
        campaign.currentBalance = 0;
        emit FundsWithdrawn(_id, msg.sender, campaign.currentBalance);
    }

    function sendFundsToCampaignOwner(uint256 _id) public onlyOwner {
        Campaign storage campaign = campaigns[_id];
        require(campaign.amountCollected > 0, "No funds to withdraw.");
        require(campaign.currentBalance > 0, "No funds to withdraw.");
        require(
            campaign.deadline < block.timestamp,
            "The campaign has not ended yet."
        );
        (bool sent, ) = payable(campaign.owner).call{
            value: campaign.currentBalance
        }("");
        require(sent, "Failed to send Ether");
        campaign.currentBalance = 0;
        // emit FundsWithdrawn(_id, msg.sender, campaign.currentBalance);
    }

    function amountPaidToOwner(uint256 _id) public view returns (uint256) {
        Campaign storage campaign = campaigns[_id];
        return campaign.amountCollected - campaign.currentBalance;
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        Campaign storage campaign = campaigns[_id];
        return (campaign.donators, campaign.donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCount);
        for (uint256 i = 0; i < campaignCount; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }
}
