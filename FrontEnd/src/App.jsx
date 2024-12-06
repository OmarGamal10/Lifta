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
import IngForm from "./components/coach/IngredientForm.jsx";
import PkgForm from "./components/coach/packageForm.jsx";
import ExerciseForm from "./components/coach/exerciseForm.jsx";
import Ingredient from "./components/coach/ingredientCard.jsx";
import Exercise from "./components/coach/exerciseCard.jsx";

function App() {
  return (
    <div>
      <Exercise
        name={"Chest Press"}
        targetMuscle={"Chest"}
        description={
          "Person lays supine on the bench, knees bent and feet flat on the floor. Grip the bar (grip can vary depending on goal) and un-rack bar. Lower the bar to the chest (around nipple level) Press the bar upward until the arms are fully extended, keep the feet on the floor."
        }
      />
    </div>
  );
}

export default App;
