/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHTTP";
import ChatLayout from "./chat/ChatLayout";
import logo from "../assets/logo.png";

const NavBar = ({ pref = "NotDefined" }) => {
  const [preference, setPreference] = useState(pref);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toBrowse, setToBrowse] = useState(false);
  const navigate = useNavigate();
  const { get, loading, err } = useHttp("http://localhost:3000");

  useEffect(() => {
    if (preference === "NotDefined") {
      const checkAuth = async () => {
        try {
          const response = await get("/users/checkAuth");
          // Assuming response.body has these values
          console.log("Nav", response.data);
          setPreference("Notdefault");
        } catch (err) {
          console.error(err);
          setPreference("default");
        }
      };

      checkAuth();
    }
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

  const handleBrowseToggle = () => {
    
    navigate("/browse");
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
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
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
          >
            Log out
          </button>
          <button
            onClick={handleChatToggle}
            className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
          >
            Chat
          </button>
          {pref === "Trainee" && (
            <button
              onClick={handleBrowseToggle}
              className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
            >
              Browse
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <nav className="relative container mx-auto p-6 text-textColor">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-3xl font-bold gap-2">
            <span>LIFTA</span>
            <img className="object-cover h-10 w-14" src={logo} alt="logo" />
          </Link>
          <div className="flex items-center gap-6">{renderComponent()}</div>
        </div>
      </nav>
      {isChatOpen && <ChatLayout />}
    </>
  );
};

export default NavBar;
