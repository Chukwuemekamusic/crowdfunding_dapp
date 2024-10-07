
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
// import FundCard from './FundCard';
import  loader from '../assets/loader.svg';
import { ParsedCampaign } from '../context';
import FundCard from './FundCard';

interface DisplayCampaignProps {
  title: string;
  isLoading: boolean;
  campaigns: ParsedCampaign[];
}


const DisplayCampaigns = ({ title, isLoading, campaigns }: DisplayCampaignProps) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign: ParsedCampaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={uuidv4()}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns