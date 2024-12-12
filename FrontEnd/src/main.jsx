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


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedLoggedRoute>
      <LandingPage />
      </ProtectedLoggedRoute>
    )
  },
  {
    path: "log-in",
    element: (
      <ProtectedLoggedRoute>
      <LoginForm />
      </ProtectedLoggedRoute>
    )
  },
  {
    path: "sign-up",
    element:(
      <ProtectedLoggedRoute>
      <SignUpForm />
      </ProtectedLoggedRoute>
    ) 
  },
  {
    path: "profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    )
  },
  {
    path: "test",
    element: (
      <PrimeReactProvider value={{  pt: Tailwind  }}>
        <TraineeExerciseCard name={"Shoulder Press"} description={"blah blah blah"} sets={4} reps={12} muscle={"front shoulder"} />
      </PrimeReactProvider>
    )
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
