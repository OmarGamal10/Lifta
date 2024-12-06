import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
<div className="flex flex-col space-y-4">
    <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="Sidebar bg-backGroundColor p-6 pr-0 rounded-lg shadow-lg w-[320px]">
            {/* First Item in a Separate Div */}
            <div className="mb-4">
                <li className="flex items-center text-textColor font-semibold text-lg hover:bg-primary hover:text-backGroundColor cursor-pointer transition-all px-3 py-2 rounded-l-md hover:rounded-l-md">
                    <img src="src/assets/sidebarIcons/Icon.png" alt="Icon" className="w-6 h-6 mr-4 transition-all hover:filter hover:brightness-0 hover:invert" />
                    My Profile
                </li>
            </div>

            {/* Gray Line Separator */}
            <div className="h-[1px] bg-textspan mb-4 mr-6"></div>

            {/* Remaining Items */}
    {/* Heading */}
    <h1 className="text-textspan text-lg font-semibold text-left ml-1">My Work</h1>
            <ul className="space-y-4 ml-4">
                <li className="flex items-center text-textColor font-semibold text-lg hover:bg-primary hover:text-backGroundColor cursor-pointer transition-all px-3 py-2 rounded-l-md hover:rounded-l-md">
                    <img src="src/assets/sidebarIcons/Treadmill.png" alt="Icon" className="w-6 h-6 mr-4 transition-all hover:filter hover:brightness-0 hover:invert" />
                    Exercises
                </li>
                <li className="flex items-center text-textColor font-semibold text-lg hover:bg-primary hover:text-backGroundColor cursor-pointer transition-all px-3 py-2 rounded-l-md hover:rounded-l-md">
                    <img src="src/assets/sidebarIcons/dumbel.png" alt="Icon" className="w-6 h-6 mr-4 transition-all hover:filter hover:brightness-0 hover:invert" />
                    Workouts
                </li>
                <li className="flex items-center text-textColor font-semibold text-lg hover:bg-primary hover:text-backGroundColor cursor-pointer transition-all px-3 py-2 rounded-l-md hover:rounded-l-md">
                    <img src="src/assets/sidebarIcons/Pills.png" alt="Icon" className="w-6 h-6 mr-4 transition-all hover:filter hover:brightness-0 hover:invert" />
                    Ingredients
                </li>
                <li className="flex items-center text-textColor font-semibold text-lg hover:bg-primary hover:text-backGroundColor cursor-pointer transition-all px-3 py-2 rounded-l-md hover:rounded-l-md">
                    <img src="src/assets/sidebarIcons/Weight Scale.png" alt="Icon" className="w-6 h-6 mr-4 transition-all hover:filter hover:brightness-0 hover:invert" />
                    Meals
                </li>
                <li className="flex items-center text-textColor font-semibold text-lg hover:bg-primary hover:text-backGroundColor cursor-pointer transition-all px-3 py-2 rounded-l-md hover:rounded-l-md">
                    <img src="src/assets/sidebarIcons/users.png" alt="Icon" className="w-6 h-6 mr-4 transition-all hover:filter hover:brightness-0 hover:invert" />
                    Clients
                </li>
                <li className="flex items-center text-textColor font-semibold text-lg hover:bg-primary hover:text-backGroundColor cursor-pointer transition-all px-3 py-2 rounded-l-md hover:rounded-l-md">
                    <img src="src/assets/sidebarIcons/packages.png" alt="Icon" className="w-6 h-6 mr-4 transition-all hover:filter hover:brightness-0 hover:invert" />
                    Packages
                </li>
                <li className="flex items-center text-textColor font-semibold text-lg hover:bg-primary hover:text-backGroundColor cursor-pointer transition-all px-3 py-2 rounded-l-md hover:rounded-l-md">
                    <img src="src/assets/sidebarIcons/review.png" alt="Icon" className="w-6 h-6 mr-4 transition-all hover:filter hover:brightness-0 hover:invert" />
                    Reviews
                </li>
            </ul>
        </nav>
    </div>
</div>

    );
};

export default SideBar;