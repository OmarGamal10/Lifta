import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className=" text-textColor flex flex-col items-center rounded-t-lg shadow-lg ">
        <div className=" bg-textspan w-screen h-[0.5px] ml-0"></div>
        {/* Top Section: Text and Buttons with Borders */}
        <div className="flex flex-col items-center space-y-6 mb-8 pt-6 pb-6">
          <div className="text-2xl lg:text-3xl font-bold text-center">
            Are You Ready For Get Started Travelling?
          </div>
          <div className="text-lg lg:text-xl text-center">
            Need Any Support For Tour And Visa?
          </div>
          <div className="mt-4 w-screen flex justify-center gap-6">
            <button className="bg-accent text-backGroundColor px-6 py-3 rounded-full font-semibold hover:bg-primary transition-all">
              Get Started
            </button>
            <button className="bg-secondary text-backGroundColor px-6 py-3 rounded-full font-semibold hover:bg-primary transition-all">
              Contact Support
            </button>
          </div>
        </div>
  
        <div
        className="w-full h-72 bg-cover bg-center flex items-center justify-center">
        {/* You can add more content here if needed */}
      </div>
      </footer>
    );
};

export default Footer;