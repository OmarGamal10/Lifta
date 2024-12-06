import { React } from "react";
import Form from "./components/form";
import FormTrainee from "./components/trainee/formTrainee";
import LoginForm from "./components/loginForm";
import LandingPage from "./components/landingPage";
import FormCoach from "./components/coach/formCoach";
import CertForm from "./components/coach/certificateForm";
import UserTypeForm from "./components/userTypeForm";
import SignUpForm from "./components/signUpForm.jsx";
import { PackageCard } from "./components/packageCard.jsx";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { twMerge } from 'tailwind-merge';
import 'primeicons/primeicons.css';
import { PackageDashboard } from "./components/packageDashboard.jsx";
import { SubscriptionRequestCard } from "./components/coach/subscriptionRequestCard.jsx";

function App() {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind , ptOptions: { mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge } }}>
      <SubscriptionRequestCard/>
    </PrimeReactProvider>
  );
}

export default App;
