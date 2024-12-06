import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <nav className="relative container mx-auto p-4 text-textColor">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-3xl font-bold gap-2">
            <span>LIFTA</span>
            <img
              className="object-cover h-10 w-14"
              src="src/assets/logo.png"
              alt="logo"
            />
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="log-in"
              className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
            >
              Log in
            </Link>

            <Link
              to="sign-up"
              className="w-32 h-5 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    );
};

export default NavBar;