import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbSalad } from "react-icons/tb";
import { GiBiceps } from "react-icons/gi";
import { GiWeightLiftingUp } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className=" text-textColor flex flex-col items-center rounded-t-lg shadow-lg ">
      <div className=" bg-textspan w-screen h-[0.5px] ml-0"></div>
      <div className="flex justify-around space-x-6 items-center w-full p-6">
        {/* Column 1 */}
        <div className="flex items-center space-x-4  w-full">
          <div className="w-16 h-16 flex items-center justify-center bg-secondary text-white rounded-full">
            {/* Replace with an icon */}
            <GiBiceps className="text-2xl" />
          </div>
          <div className="text-gray-800 w-full text-lg">
            <span className="block  py-6 font-bold">Strong today, stronger tomorrow. Your only competition is who you were yesterday</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex items-center space-x-4  w-full">
          <div className="w-16 h-16 flex items-center justify-center bg-secondary text-white rounded-full">
            {/* Replace with an icon */}
            <GiWeightLiftingUp className="text-2xl" />
          </div>
          <div className="text-gray-800 text-lg w-full">
            <span className="block  py-6 font-bold">No shortcuts. Just sweat, determination, and the relentless pursuit of greatness</span>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex items-center space-x-4  w-full">
          <div className="w-16 h-16 flex items-center justify-center bg-secondary text-white rounded-full">
            {/* Replace with an icon */}
            <TbSalad className="text-2xl" />
          </div>
          <div className="text-gray-800 text-lg w-full">
            <span className="block  py-6 font-bold">Fuel your body with the right choices, because every bite is a step toward your best self</span>
          </div>
        </div>
      </div>

      <div className=" bg-textspan w-screen h-[0.5px] ml-0"></div>
      <div
        className="w-full h-72 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('src/assets/FooterImage.png')",
        }}
      >
        {/* You can add more content here if needed */}
      </div>
    </footer>
  );
};

export default Footer;
