import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileSection = ({ userName, userBio, userProfile }) => {
  return (
    <div className="flex items-center space-x-[25px] p-10 bg-transparent rounded-lg ml-4 md:ml-6 lg:ml-14 w-full">
      <div
        className={`${
          userProfile
            ? ""
            : "bg-primary flex rounded-full items-center  justify-center"
        }`}
      >
        <img
          src={`${userProfile != "" ? userProfile : "src/assets/user.png"}`}
          alt="User Logo"
          className="w-40 h-40 p-3 object-cover rounded-full"
        />
      </div>
      <div>
        <p className="text-[31px] md:text-[28px] lg:text-[31px] font-bold text-textColor">
          {userName}
        </p>
        <span className="text-[25px] md:text-[25px] pl-6 lg:text-[25px] font-bold text-textspan">
          {userBio}
        </span>
      </div>
    </div>
  );
};

export default ProfileSection;
