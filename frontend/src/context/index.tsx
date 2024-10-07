import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import contractArtifact from "../../../my_web3/artifacts/contracts/CrowdFunding.sol/CrowdFunding.json";

type StateContextType = {
  account: string | null;
  contract: ethers.Contract | null;
  handleConnect: () => Promise<void>;
  loadCampaigns: () => Promise<ParsedCampaign[] | undefined>;
  createCampaign: (campaignData: CampaignData) => Promise<CreateCampaignSuccess | undefined>;
};

type CampaignData = {
name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
};

interface CampaignReceived {
    owner: string;
    title: string;
    description: string;
    target: bigint;
    deadline: bigint;
    amountCollected: bigint;
    currentBalance: bigint;
    image: string;
    donators: string[];
    donations: bigint[];
  }

  export interface ParsedCampaign {
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: number;
    amountCollected: string;
    currentBalance: string;
    image: string;
    donators: string[];
    donations: bigint[];
    pId: number;
}

interface CreateCampaignSuccess {
    success: true;
    message: string;
    transactionHash: string;
    blockNumber: number;
  }

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account connection
        const accounts = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];

        if (accounts.length > 0) {
          setAccount(accounts[0]);

          // Initialize provider and contract after wallet is connected
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractInstance = new ethers.Contract(
            contractAddress,
            contractArtifact.abi,
            signer // Signer used to allow state-changing operations
          );
          setContract(contractInstance);
          console.log("signer: ", signer);
          console.log("contractInstance: ", contractInstance);
        }
      } catch (error) {
        console.error("Error connecting wallet: ", error);
      }
    } else {
      console.error("MetaMask is not installed!");
    }
  };

  // Load campaigns from contract
  const loadCampaigns = async (): Promise<ParsedCampaign[] | undefined> => {
    if (contract) {
      try {
        const campaigns : CampaignReceived[] = await contract.getCampaigns();
        console.log("Campaigns: ", campaigns[3]);

        const parsedCampaigns = campaigns.map((campaign, index: number) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.formatEther(campaign.target),
          deadline: Number(campaign.deadline),
          amountCollected: ethers.formatEther(campaign.amountCollected),
          currentBalance: ethers.formatEther(campaign.currentBalance),
          image: campaign.image,
          donators: campaign.donators,
          donations: campaign.donations,
          pId: index,
        }));

        console.log("Parsed Campaigns: ", parsedCampaigns);
        return parsedCampaigns;
      } catch (error) {
        console.error("Error loading campaigns: ", error);
        throw new Error("Error loading campaigns");
      }
    } else {
      console.error("Contract not initialized");
      throw new Error("Contract not initialized");
    }
  };

  const createCampaign = async (campaignData: CampaignData): Promise<CreateCampaignSuccess | undefined> => {
    if (contract && account ) {
        const deadline = BigInt(new Date(campaignData.deadline).getTime() / 1000);
        const target = ethers.parseEther(campaignData.target);
      try {       
        console.log("sending transaction");
        const transaction = await contract.createCampaign(
          campaignData.title,
          campaignData.description,
          target,
          deadline,
          campaignData.image
        );
        const receipt = await transaction.wait();
        console.log("Transaction completed: ", receipt);
        return {
            success: true,
            message: "Campaign created successfully!",
            transactionHash: receipt.hash,
            blockNumber: receipt.blockNumber,
          };
        
      } catch (error: any) {
        console.error("Error creating campaign: ", error);
        if (error?.error && error?.error?.message) {
          console.error("Error message:", error.error.message);
        }
        if (error?.transaction) {
          console.error("Failed transaction:", error.transaction);
        }
      }
    } else {
      console.error("Contract not initialized");
    }
  };
  return (
    <StateContext.Provider value={{ account, contract, handleConnect, loadCampaigns, createCampaign }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateContextProvider");
  }
  return context;
};
