/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LoginForm from "./components/loginForm.jsx";
import SignUpForm from "./components/signUpForm.jsx";
import ProtectedLoggedRoute from "./ProtectedLoggedRoute.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import UserProfile from "./components/Userprofile.jsx";
import ProfileSection from "./components/Profilesection.jsx";
import LandingPage from "./components/landingPage.jsx";
import Banned from "./pages/Banned.jsx";
import NotFound from "./pages/Notfound.jsx";

import { TraineeExerciseCard } from "./components/trainee/traineeExerciseCard.jsx";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "primeicons/primeicons.css";
import { TraineeCurrentWrokout } from "./components/trainee/traineCurrentWorkout.jsx";
import { TraineeMealCard } from "./components/trainee/traineeMealCard.jsx";
import { TraineeCurrentMeals } from "./components/trainee/traineeCurrentMeals.jsx";
import { PackageDashboard } from "./components/packageDashboard.jsx";
import IngredientForm from "./components/coach/IngredientForm.jsx";
import IngredientCard from "./components/coach/ingredientCard.jsx";
import WorkoutCard from "./components/coach/workoutCard.jsx";
import PackageForm from "./components/coach/packageForm.jsx";
import ExerciseForm from "./components/coach/exerciseForm.jsx";
import CreateWorkout from "./components/coach/CreateWorkout.jsx";
import CreateMeal from "./components/coach/createMeal.jsx";
import AssignWorkout from "./components/coach/assignWorkout.jsx";
import AssignMeal from "./components/coach/assignMeal.jsx";
import Meal from "./components/coach/mealCard.jsx";
import { PackageCard } from "./components/packageCard.jsx";
import { View } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedLoggedRoute>
      <IngredientForm />
      // </ProtectedLoggedRoute>
    ),
  },
  {
    path: "log-in",
    element: (
      <ProtectedLoggedRoute>
        <LoginForm />
      </ProtectedLoggedRoute>
    ),
  },
  {
    path: "sign-up",
    element: (
      <ProtectedLoggedRoute>
        <SignUpForm />
      </ProtectedLoggedRoute>
    ),
  },
  {
    path: "profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "test",
    element: (
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <ProtectedRoute>
          <TraineeCurrentWrokout />
        </ProtectedRoute>
      </PrimeReactProvider>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
