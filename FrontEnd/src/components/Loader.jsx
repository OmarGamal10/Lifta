import React from "react";
import logo from "../assets/logo.png"
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img
        src={logo} // Replace with your loader image path
        alt="Loading..."
        className="w-30 h-24 animate-spin"
      />
    </div>
  );
};

export default Loader;
