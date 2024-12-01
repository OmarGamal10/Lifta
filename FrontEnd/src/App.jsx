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

const text="Personalized workout plans tailored to your fitness level and goals. Ideal for building strength, endurance, or weight loss with professional guidance."

function App() {
  return (
    <div>
      <PackageCard name={"starter package"} type={"Gym and Nutrition"} price={19} description={ text } duration={"3 Months"} isActive={true} />
    </div>
  );
}

export default App;
