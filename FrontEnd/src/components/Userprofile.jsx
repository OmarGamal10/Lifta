import React from "react";
import NavBar from "./Navbar";
import ProfileSection from "./Profilesection";
import SideBar from "./Sidebar";
import NoDataDashboard from "./Nodata";
import Footer from "./Footer";

const UserProfile = () => {
  return (
    <div className="app overflow-x-hidden overflow-auto scrollbar-thin scrollbar-thumb-textspan scrollbar-track-textspan">
      <NavBar />
      <ProfileSection />
      <div className="h-[0.5px] bg-textspan "></div>
      <div className="flex h-[960px]">
        {/* Sidebar - Takes only the width needed for content */}
        <SideBar className="w-auto" />

        {/* NoDataDashboard - Takes the remaining space */}
        <div className="flex flex-1">
          <div className="bg-textspan w-[0.5px] h-auto ml-0"></div>
          <NoDataDashboard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
