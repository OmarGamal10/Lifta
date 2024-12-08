import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useHttp from "../hooks/useHTTP";
import { Navigate, useNavigate } from "react-router-dom";
const NavBar = () => {
  const [preference, setPreference] = useState();
  const navigate = useNavigate();
  const { get, loading, err } = useHttp("http://localhost:3000");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await get("/users/checkAuth");
        // Assuming response.body has these values
        setPreference("Notdefault");
      } catch (err) {
        console.error(err);
        setPreference("default");
      }
    };

    checkAuth();
  }, []); // Run once when the component mounts
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await get("/users/logout");
      navigate("/log-in");
      console.log(response);
      // Redirect or update state if logout is successful
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const renderComponent = () => {
    if (preference === "default") {
      return (
        <div className="flex gap-4">
  <Link
    to="/log-in"
    className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
  >
    Log in
  </Link>
  <Link
    to="/sign-up"
    className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
  >
    Sign Up
  </Link>
</div>

      );
    } else {
      return (
        <button
          onClick={handleLogout}
          className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
        >
          Log out
        </button>
      );
    }
  };

  return (
    <nav className="relative container mx-auto p-4 text-textColor">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center text-3xl font-bold gap-2">
          <span>LIFTA</span>
          <img
            className="object-cover h-10 w-14"
            src="src/assets/logo.png"
            alt="logo"
          />
        </Link>
        <div className="flex items-center gap-6">{renderComponent()}</div>
      </div>
    </nav>
  );
};

export default NavBar;