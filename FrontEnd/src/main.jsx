import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LoginForm from "./components/loginForm.jsx";
import SignUpForm from "./components/signUpForm.jsx";
import ProtectedLoggedRoute from "./ProtectedLoggedRoute.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import UserProfile from "./components/userProfile.jsx";
import ProfileSection from "./components/Profilesection.jsx";
import LandingPage from "./components/landingPage.jsx";
import Banned from "./pages/Banned.jsx";
import NotFound from "./pages/Notfound.jsx";
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
      <CreateWorkout />
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
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
