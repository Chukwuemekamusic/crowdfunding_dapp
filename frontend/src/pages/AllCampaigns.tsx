import  { useState, useEffect } from 'react'

import DisplayCampaigns from '../components/DisplayCampaign'
import { ParsedCampaign, useStateContext } from '../context'

const AllCampaigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<ParsedCampaign[]>([]);

  const { account, contract, loadCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await loadCampaigns();
    if (data !== undefined) {
      setCampaigns(data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [account, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default AllCampaigns