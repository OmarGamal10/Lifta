/* eslint-disable no-unused-vars */
import { React } from "react";
import Form from "./components/mainForm.jsx";
import FormTrainee from "./components/trainee/formTrainee";
import LoginForm from "./components/loginForm";
import LandingPage from "./components/landingPage";
import FormCoach from "./components/coach/formCoach";
import CertForm from "./components/coach/certificateForm";
import UserTypeForm from "./components/userTypeForm";
import SignUpForm from "./components/signUpForm.jsx";
import IngForm from "./components/coach/IngredientForm.jsx";
import PkgForm from "./components/coach/packageForm.jsx";
import ExerciseForm from "./components/coach/exerciseForm.jsx";
import Ingredient from "./components/coach/ingredientCard.jsx";
import Exercise from "./components/coach/exerciseCard.jsx";
import CreateWorkout from "./components/coach/createWorkout.jsx";

function App() {
  return (
    <div>
      <CreateWorkout />
    </div>
  );
}

export default App;
