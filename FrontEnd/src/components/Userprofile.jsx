import React from "react";
import NavBar from "./Navbar";
import ProfileSection from "./Profilesection";
import { SubReqDashboard } from "./coach/subReqDashboard";
import CoachSideBar from "./coach/Sidebar";
import TraineeSideBar from "./trainee/Sidebar";
import MyProfile from "./MyProfile";
import NoDataDashboard from "./Nodata";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHTTP";
import Clients from "./coach/Clients";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { Package } from "lucide-react";
import { PackageDashboard } from "./packageDashboard";

const UserProfile = ({ userId }) => {
  // State to track the selected section
  const [activeSection, setActiveSection] = useState("My Profile");
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userBio, setUserBio] = useState("");

  const { get } = useHttp("http://localhost:3000");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await get(`/users/${userId}`);
        // Assuming response.body has these values
        setUserName(response.userName);
        setUserType(response.userType);
        setUserBio(response.userBio);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []); // Run once when the component mounts

  // Function to handle button clicks from SideBar
  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  const renderSideBar = () => {
    if(userType === "Trainee") {
      return <TraineeSideBar onSidebarClick={handleSidebarClick} className="w-auto" />
    }
    else {
      return <CoachSideBar onSidebarClick={handleSidebarClick} className="w-auto" />
    }

  }
  const components =  {
    Clients: (
      <PrimeReactProvider value={{ pt: Tailwind }}>
    <Clients userId={userId} />
    </PrimeReactProvider>
    ),
    Packages: (
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <PackageDashboard/>
    </PrimeReactProvider>
    ),
    Requests: (
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <SubReqDashboard user_id={userId}/>
    </PrimeReactProvider>
    ),
    Default: <NoDataDashboard header={activeSection + " Section"} />,
  }

  // Components to render based on the active section
  const renderComponent = () => {
      return components[activeSection] || components.Default;
  };

  return (
    <div className="app overflow-x-hidden overflow-auto scrollbar-thin scrollbar-thumb-textspan scrollbar-track-textspan">
      <NavBar pref={"NotDefault"} />
      <ProfileSection userName={userName} userBio={userBio}/>
      <div className="h-[0.5px] bg-textspan "></div>
      <div className="flex h-[960px] w-full">
        {renderSideBar()}
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
