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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedLoggedRoute>
        <div>
          <WorkoutCard
            name={"shady"}
            note={
              "ddd  dd  dddd  dd ddddd   dddd dd  ddd ddddd d  ddddddd   ddddd dddddd   ddd  dddd ddd  dd  dddd  dd ddddd   dddd dd  ddd ddddd d  ddddddd   ddddd dddddd   ddd  dddd"
            }
          />
        </div>
      </ProtectedLoggedRoute>
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
