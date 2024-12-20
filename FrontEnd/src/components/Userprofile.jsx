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
import { TraineeCurrentWrokout } from "./trainee/traineCurrentWorkout";
import { TraineeCurrentMeals } from "./trainee/traineeCurrentMeals";
import Loader from "./Loader";
import Exercises from "./coach/Exercises";
import Ingredients from "./coach/Ingredients";
import Packages from "./coach/Packages";
import Workouts from "./coach/Workouts";
import Meals from "./coach/Meals";

const UserProfile = ({ userId }) => {
  // State to track the selected section
  const [activeSection, setActiveSection] = useState("My Profile");
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userBio, setUserBio] = useState("");
  const [coachRating, setCoachRating] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState("");
  const { get } = useHttp("http://localhost:3000");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await get(`/users/${userId}`);
        console.log(response);
        setUserName(response.userName);
        setUserType(response.userType);
        setUserBio(response.userBio);
        setUserProfile(response.userPhoto);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []); // Run once when the component mounts

  // Function to handle button clicks from SideBar
  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  const renderSideBar = () => {
    if (userType === "Trainee") {
      return (
        <TraineeSideBar
          onSidebarClick={handleSidebarClick}
          className="w-auto"
        />
      );
    } else if (userType === "Trainer") {
      return (
        <CoachSideBar onSidebarClick={handleSidebarClick} className="w-auto" />
      );
    }
  };
  const components = {
    "My Profile": <MyProfile userId={userId} />,
    Clients: (
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <Clients userId={userId} />
      </PrimeReactProvider>
    ),
    Packages: (
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <PackageDashboard />
      </PrimeReactProvider>
    ),
    Requests: (
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <SubReqDashboard user_id={userId} />
      </PrimeReactProvider>
    ),
    Workouts: <TraineeCurrentWrokout userId={userId} />,
    Nutrition: <TraineeCurrentMeals userId={userId} />,
    Default: <NoDataDashboard header={activeSection + " Section"} />,
  };

  // Components to render based on the active section
  const renderComponent = () => {
    if (userType == "Trainee") {
      if (activeSection == "Workouts") {
        return <TraineeCurrentWrokout userId={userId} />;
      }
      if (activeSection == "Nutrition") {
        return <TraineeCurrentMeals userId={userId} />;
      }
      if (activeSection) {
        return <NoDataDashboard header={`${activeSection}` + " Section"} />;
      } else {
        return <NoDataDashboard header="No Data Dashboard" />;
      }
    } else if (userType == "Trainer") {
      if (activeSection == "Exercises") return <Exercises userId={userId} />;
      if (activeSection == "Ingredients")
        return <Ingredients userId={userId} />;
      if (activeSection == "Workouts") return <Workouts userId={userId} />;
      if (activeSection == "Meals") return <Meals userId={userId} />;
      if (activeSection == "Packages") {
        return (
          <PrimeReactProvider value={{ pt: Tailwind }}>
            <Packages userId={userId} />
          </PrimeReactProvider>
        );
      }
      if (activeSection == "Clients") {
        return (
          <PrimeReactProvider value={{ pt: Tailwind }}>
            <Clients userId={userId} />
          </PrimeReactProvider>
        );
      }
    }

    return components[activeSection] || components.Default;
  };

  return (
    <div className="w-full">
      {" "}
      {Loading ? (
        <Loader />
      ) : (
        <div className="app overflow-x-hidden overflow-auto scrollbar-thin scrollbar-thumb-textspan scrollbar-track-textspan">
          <NavBar pref={"NotDefault"} />
          <ProfileSection
            userName={userName}
            userBio={userBio}
            userProfile={userProfile}
            userId={userId}
            userType={userType}
          />

          <div className="h-[0.5px] bg-textspan "></div>
          <div className="flex min-h-[960px] w-full ml-4">
            {renderSideBar()}
            <div className="bg-textspan w-[0.5px] h-auto ml-0"></div>
            {/* Vertical Divider */}
            <div className="w-full">
              {/* Render Active Component */}
              <div className="flex justify-center items-center mr-4">
                {renderComponent()}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
