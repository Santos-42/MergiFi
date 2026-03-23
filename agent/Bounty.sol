// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Bounty {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Accept incoming ETH/native token to fund the contract
    receive() external payable {}
    fallback() external payable {}

    // Allow the agent (owner) to pay a specific amount to the recipient
    function payBounty(address payable recipient) public {
        require(msg.sender == owner, "Only the owner (Agent) can distribute pure bounties");
        require(address(this).balance > 0, "No funds available in the smart contract");
        
        // MVP: Hardcode or pass the bounty amount, using a fixed amount here for safety as per PRD
        uint256 amount = 0.0001 ether; 
        
        require(address(this).balance >= amount, "Insufficient funds for this bounty");
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Failed to send bounty");
    }
}
