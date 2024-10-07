import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCampaign from "./pages/CreateCampaign";
import Navbar from "./components/Navbar";
import AllCampaigns from "./pages/AllCampaigns";

function App() {

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row text-secondary">
    {/* <div className="sm:flex hidden mr-10 relative">
      <Sidebar />
    </div> */}

    <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/all-campaigns" element={<AllCampaigns />} />
      </Routes>
    </div>
  </div>
  )
}

export default App
