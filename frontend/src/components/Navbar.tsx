// import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
// import { navlinks } from "../constants";
// import logo from "../assets/logo.svg";
// import menu from "../assets/menu.svg";
import search from "../assets/search.svg";
import thirdweb from "../assets/thirdweb.png";

const Navbar = () => {
  const navigate = useNavigate();
//   const [isActive, setIsActive] = useState("dashboard");
//   const [toggleDrawer, setToggleDrawer] = useState(false);

  const { account, handleConnect } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
          <button onClick={() => navigate("/all-campaigns")}>All Campaigns</button>
        
        <button onClick={() => navigate("/create-campaign")}>Create Campaign</button>
        {account ? (
          <p>Account: {account.slice(0, 6)}...{account.slice(-4)}</p>
        ) : (
          <button onClick={handleConnect}>Connect</button>
        )}

        <Link to="/">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
    </div>
  );
};

export default Navbar;
