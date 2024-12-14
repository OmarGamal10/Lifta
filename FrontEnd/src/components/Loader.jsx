import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img
        src="src/assets/logo.png" // Replace with your loader image path
        alt="Loading..."
        className="w-30 h-24 animate-spin"
      />
    </div>
  );
};

export default Loader;
