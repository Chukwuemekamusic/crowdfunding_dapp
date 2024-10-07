# Crowdfunding Dapp

This is a decentralized application (Dapp) that allows users to create and participate in crowdfunding campaigns. The project is built using Solidity, React, and Web3.js.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Smart Contract Deployment](#smart-contract-deployment)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a crowdfunding platform that enables users to create and participate in crowdfunding campaigns. The smart contracts are written in Solidity, with a React-based frontend for user interaction.

## Features

- Create a new crowdfunding campaign
- View all crowdfunding campaigns
- Participate in a crowdfunding campaign
- View the status of a crowdfunding campaign
- View the details of a crowdfunding campaign
- View the participants of a crowdfunding campaign
- View the owner of a crowdfunding campaign
- View the total amount of funds raised for a crowdfunding campaign

## Project Structure

The project consists of the following main components:

- `my_web3/`: Hardhat project for smart contract development and deployment
- `hardhat-boilerplate/`: Alternative Hardhat setup with Viem and TypeScript (not used in the current frontend implementation)
- `frontend/`: React-based frontend application

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MetaMask browser extension

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Chukwuemekamusic/crowdfunding_dapp.git
   cd crowdfunding_dapp
   ```

2. Install dependencies for the Hardhat project:
   ```
   cd my_web3
   npm install
   ```

3. Install dependencies for the frontend:
   ```
   cd ../frontend
   npm install
   ```

### Smart Contract Deployment

1. Start a local Hardhat node:
   ```
   cd my_web3
   npx hardhat node
   ```

2. In a new terminal, deploy the smart contract to the local network:
   ```
   cd my_web3
   npx hardhat run scripts/deploy.js --network localhost
   ```

   Note the contract address output after deployment.

### Frontend Setup

1. Create a `.env` file in the `frontend` directory with the following content:
   ```
   REACT_APP_CONTRACT_ADDRESS=<Your_Deployed_Contract_Address>
   ```

2. Start the React development server:
   ```
   cd frontend
   npm start
   ```

### MetaMask Configuration

1. Install the MetaMask browser extension if you haven't already.
2. Create a new network in MetaMask with the following details:
   - Network Name: Hardhat Local
   - New RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH
3. Import one of the private keys provided by Hardhat when you started the local node.

## Usage

1. Ensure your MetaMask is connected to the Hardhat Local network.
2. Navigate to `http://localhost:5173` in your browser (or the port specified by Vite when you start the development server).
3. Use the interface to create new campaigns or interact with existing ones.
4. For transactions, MetaMask will prompt you to confirm each action.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).