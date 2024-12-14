/* eslint-disable no-unused-vars */
import { React } from "react";
import IngForm from "./components/coach/IngredientForm.jsx";
import PkgForm from "./components/coach/packageForm.jsx";
import ExerciseForm from "./components/coach/exerciseForm.jsx";
import UserProfile from "./components/Userprofile.jsx"
import Form from "./components/mainForm";
import FormTrainee from "./components/trainee/formTrainee";
import LoginForm from "./components/loginForm";
import LandingPage from "./components/landingPage";
import FormCoach from "./components/coach/formCoach";
import CertForm from "./components/coach/certificateForm";
import workoutCard from "./components/coach/workoutCard.jsx";
import UserTypeForm from "./components/userTypeForm";
import SignUpForm from "./components/signUpForm.jsx";
import { PackageCard } from "./components/packageCard.jsx";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { twMerge } from "tailwind-merge";
import "primeicons/primeicons.css";
import { PackageDashboard } from "./components/packageDashboard.jsx";
import { SubscriptionRequestCard } from "./components/coach/subscriptionRequestCard.jsx";
import { SubReqDashboard } from "./components/coach/subReqDashboard.jsx";
import { TraineesList } from "./components/admin/traineesList.jsx";
import { CoachesList } from "./components/admin/coachesList.jsx";

function App() {
  return (
    <div>
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <PackageDashboard />
      </PrimeReactProvider>
    </div>
  );
}

export default App;
