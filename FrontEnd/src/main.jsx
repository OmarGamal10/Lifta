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
import BrowseCoaches from "./pages/BrowseCoaches.jsx";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "primeicons/primeicons.css";
import { PackageDashboard } from "./components/packageDashboard.jsx";
import Footer from "./components/Footer.jsx";
import NavBar from "./components/Navbar.jsx";
import BrowseProtectedRoute from "./BrowseProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedLoggedRoute>
        <LandingPage />
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
    path: "browse",
    element: (
      <BrowseProtectedRoute>
        <BrowseCoaches />
      </BrowseProtectedRoute>
    ),
  },
  {
    path: "browse/:coach_id/packages",
    element: (
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <BrowseProtectedRoute>
        <div>
          <NavBar pref="NotDefault" />
          <PackageDashboard />
          <Footer />
          </div>
        </BrowseProtectedRoute>
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
