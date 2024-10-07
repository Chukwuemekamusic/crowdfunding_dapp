
import { useStateContext } from "../context";
import { ethers } from "ethers";

const Home = () => {
    const { loadCampaigns, handleConnect, account } = useStateContext();


    async function checkBlockNumber() {
      if (!window.ethereum) {
        console.error("MetaMask not installed");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const blockNumber = await provider.getBlockNumber();
      console.log("Current block number:", blockNumber);
    }
    

    return (
        <div>
            <h1>Home</h1>
            {account ? <p>Account: {account}</p> : <button onClick={handleConnect}>Connect</button>}
            <div>
                <button onClick={loadCampaigns}>Load Campaigns</button>
            </div>
            <button onClick={checkBlockNumber}>Check Block Number</button>
        </div>
    )
    
}

export default Home;