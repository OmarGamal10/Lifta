import React from "react";
import NavBar from "./Navbar";
import ProfileSection from "./Profilesection";
import SideBar from "./Sidebar";
import NoDataDashboard from "./Nodata";
import Footer from "./Footer";
import { useState } from "react";

const UserProfile = ({ userId, userType }) => {
  // State to track the selected section
  const [activeSection, setActiveSection] = useState("My Profile");

  // Function to handle button clicks from SideBar
  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  // Components to render based on the active section
  const renderComponent = () => {
      if(activeSection) {
        return <NoDataDashboard header= {`${activeSection}` + " Section"} />;
      } else {
        return <NoDataDashboard header="No Data Dashboard" />;
      }
  };

  return (
    <div className="app overflow-x-hidden overflow-auto scrollbar-thin scrollbar-thumb-textspan scrollbar-track-textspan">
      <NavBar />
      <ProfileSection />
      <div className="h-[0.5px] bg-textspan "></div>
      <div className="flex h-[960px] w-full">
        {/* Pass callback to SideBar */}
        <SideBar onSidebarClick={handleSidebarClick} className="w-auto" />
        <div className="bg-textspan w-[0.5px] h-auto ml-0"></div>
        {/* Vertical Divider */}
        <div className="w-full">
          {/* Render Active Component */}
          <div className="flex justify-center items-center">
            {renderComponent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
