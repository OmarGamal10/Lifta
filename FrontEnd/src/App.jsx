/* eslint-disable no-unused-vars */
import { React } from "react";
import Form from "./components/form";
import FormTrainee from "./components/trainee/formTrainee";
import LoginForm from "./components/loginForm";
import LandingPage from "./components/landingPage";
import FormCoach from "./components/coach/formCoach";
import CertForm from "./components/coach/certificateForm";
import UserTypeForm from "./components/userTypeForm";
import SignUpForm from "./components/signUpForm.jsx";
<<<<<<< HEAD
import { PackageCard } from "./components/packageCard.jsx";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { twMerge } from 'tailwind-merge';
import 'primeicons/primeicons.css';
import { PackageDashboard } from "./components/packageDashboard.jsx";

function App() {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind , ptOptions: { mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge } }}>
      <PackageDashboard/>
    </PrimeReactProvider>
=======
import IngForm from "./components/coach/IngredientForm.jsx";
import PkgForm from "./components/coach/packageForm.jsx";
import ExerciseForm from "./components/coach/exerciseForm.jsx";
import UserProfile from "./components/userProfile.jsx"
function App() {
  return (
    <div>
      <UserProfile />
    </div>
>>>>>>> 8d459d99cc52c3ec5a1cd2e4b414c7e4a8a5c388
  );
}

export default App;
