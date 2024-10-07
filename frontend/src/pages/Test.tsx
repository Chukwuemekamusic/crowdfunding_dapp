import contractArtifact from "../../../my_web3/artifacts/contracts/CrowdFunding.sol/CrowdFunding.json";

import { ethers } from "ethers";
import { useState } from "react";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const [account, setAccount] = useState<string | null>(null);

const blockchainData = async () => {
  if (typeof window.ethereum !== "undefined") {
    const accounts = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];
    console.log("Accounts: ", accounts);
    if (accounts && accounts.length > 0) {
      const walletAddress = accounts[0];

      console.log("Wallet Address: ", walletAddress);
      setAccount(walletAddress);
    } else {
      console.error("No accounts found or user denied access");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractArtifact.abi,
      provider
    );

    // const signer = await provider.getSigner();
    // const signerAddress = await signer.getAddress();

    // console.log("Signer Address: ", signerAddress);
    // console.log("Contract: ", contract);
    // console.log("Provider: ", signer);

    return { contract };
  }
};

const Test = () => {
  return (
    <div>
      <h1>Test</h1>
      <button onClick={blockchainData}>Get Blockchain Data</button>
      {account && <p>Account: {account}</p>}
    </div>
  );
};

export default Test;
