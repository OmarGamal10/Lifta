/* eslint-disable no-unused-vars */
import React from "react";
import NavBar from "./Navbar";
import ProfileSection from "./Profilesection";
import { SubReqDashboard } from "./coach/subReqDashboard";
import CoachSideBar from "./coach/Sidebar";
import TraineeSideBar from "./trainee/Sidebar";
import AdminSideBar from "./admin/Sidebar";
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
import { TraineesList } from "./admin/traineesList";
import { CoachesList } from "./admin/coachesList";
import { AdminsList } from "./admin/adminsList";
import { AdminStatistics } from "./admin/adminStatistics";
import SignUpForm from "./signUpForm";
import { CoachReviewDashboard } from "./coach/coachReviewDashboard";
import {TraineeReviewDashboard} from "./trainee/traineeReviewDashboard"
import CertificatesDashboard from './coach/Certificatesdashboard'
import NutritionHistory from "./trainee/NutritionHistory";
import WorkoutHistory from "./trainee/WorkoutHistory";
import Memberships from "./trainee/Memberships";

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
  }, [userProfile]); // Run once when the component mounts

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
    } else {
      return (
        <AdminSideBar onSidebarClick={handleSidebarClick} className="w-auto" />
      );
    }
  };

  // Components to render based on the active section
  const renderComponent = () => {
    if (userType == "Trainee") {
      switch (activeSection) {
        case "Workouts":
          return <TraineeCurrentWrokout userId={userId} />;
        case "Nutrition": 
          return <TraineeCurrentMeals userId={userId} />;
        case "Memberships": 
          return <Memberships userId={userId} />;
        case "Workout history": 
          return <WorkoutHistory userId={userId} />;
        case "Nutrition History": 
          return <NutritionHistory userId={userId} />;
        case "Reviews": 
          return (
            <PrimeReactProvider value={{pt: Tailwind}}>
          <TraineeReviewDashboard userId={userId} />
          </PrimeReactProvider>
          )
        default:
          return <MyProfile userId={userId} userProfile={userProfile} setUserName={setUserName} setUserBio={setUserBio} setUserProfile={setUserProfile}/>;
      }
    } else if (userType == "Trainer") {
      switch (activeSection) {
        case "Exercises":
          return <Exercises userId={userId} />;
        case "Ingredients":
          return <Ingredients userId={userId} />;
        case "Workouts":
          return <Workouts userId={userId} />;
        case "Meals":
          return <Meals userId={userId} />;
        case "Clients":
          return <Clients userId={userId} />;
        case "Packages":
          return (
          <PrimeReactProvider value={{ pt: Tailwind }}>
            <Packages userId={userId} />
          </PrimeReactProvider>
        );
        case "Reviews":
          return <CoachReviewDashboard userId={userId} />;
        case "Requests":
          return <SubReqDashboard userId={userId} />;
        case "Certificates":
          return <CertificatesDashboard userId={userId} isEditable={true} />;


        default:
          return <MyProfile userId={userId} userProfile={userProfile} setUserName={setUserName} setUserBio={setUserBio} setUserProfile={setUserProfile}/>;
      }
    } else {
      switch (activeSection) {
        case "Trainees":
          return <TraineesList />;
        case "Coaches": 
          return <CoachesList />;
        case "Admins": 
          return <AdminsList />;
        case "Statistics": 
          return <AdminStatistics />;
        case "Add User": 
          return <SignUpForm isAdmin={1} />;
        default:
          return <MyProfile userId={userId} userProfile={userProfile} setUserName={setUserName} setUserBio={setUserBio} setUserProfile={setUserProfile}/>;
    }
  };
}

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
