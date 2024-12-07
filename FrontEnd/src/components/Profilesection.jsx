import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileSection = ({userName, userBio}) => {
    return (
<div className="flex items-center space-x-[25px] p-10 bg-transparent rounded-lg ml-4 md:ml-6 lg:ml-14 w-full">
    <div className="bg-primary rounded-full p-6 flex items-center justify-center">
        <img 
            src="src/assets/user.png" 
            alt="User Logo" 
            className="w-24 h-24 p-3 object-cover"
        />
    </div>
    <div>
        <p className="text-[31px] md:text-[28px] lg:text-[31px] font-bold text-textColor">{ userName }</p>
        <span className="text-[25px] md:text-[25px] pl-6 lg:text-[25px] font-bold text-textspan">{ userBio }</span>
    </div>
</div>


    );
};

export default ProfileSection;