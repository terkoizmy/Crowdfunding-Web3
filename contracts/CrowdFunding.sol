// SPDX-License-Identifier: UNLICENSED
pragma solidity ^"0.8.17;

contract CrowdFunding {

    address public owner;

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool isDone;

    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }


    constructor() {
        // Set the contract deployer as the owner
        owner = msg.sender;
    }

    function createCampaign(address payable _owner, string memory _title, string memory _description, 
    uint256 _target, uint256 _deadline, string memory _image) public returns(uint256) {

        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.isDone = false;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }

    }

    function closeCampaign(uint256 _id) public onlyOwner {
        Campaign storage campaign = campaigns[_id];
        
        // Ensure the provided wallet address is not null
        require(campaign.owner != address(0), "Invalid wallet address");
        
        campaign.isDone = true;
    }

    function getDonators(uint256 _id) view public returns(address[] memory, uint[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }
    
    function getCampaigns() public view returns(Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    receive() external payable {}

}