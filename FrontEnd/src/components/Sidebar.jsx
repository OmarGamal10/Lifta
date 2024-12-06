import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ onSidebarClick }) => {
  const [activeItem, setActiveItem] = useState("My Profile"); // Track active item
  const menuItems = [
    { name: "Exercises", label: "Exercises", img: "src/assets/sidebarIcons/Treadmill.png" },
    { name: "Workouts", label: "Workouts", img: "src/assets/sidebarIcons/dumbel.png" },
    { name: "Ingredients", label: "Ingredients", img: "src/assets/sidebarIcons/Pills.png" },
    { name: "Meals", label: "Meals", img: "src/assets/sidebarIcons/Weight Scale.png" },
    { name: "Clients", label: "Clients", img: "src/assets/sidebarIcons/users.png" },
    { name: "Packages", label: "Packages", img: "src/assets/sidebarIcons/packages.png" },
    { name: "Reviews", label: "Reviews", img: "src/assets/sidebarIcons/review.png" },
  ];

  // Handle click and update the active item
  const handleItemClick = (name) => {
    setActiveItem(name);
    onSidebarClick(name); // Call parent handler
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="Sidebar bg-backGroundColor p-6 pr-0 rounded-lg shadow-lg w-[320px]">
          {/* First Item in a Separate Div */}
          <div className="mb-4">
            <li
              onClick={() => handleItemClick("My Profile")}
              className={`flex items-center font-semibold text-lg 
                ${activeItem === "My Profile" ? "bg-primary text-backGroundColor" : "hover:bg-primary text-textColor hover:text-backGroundColor"} 
                active:bg-primary hover:cursor-pointer transition-all px-3 py-2 rounded-l-md`}
            >
              <img
                src="src/assets/sidebarIcons/Icon.png"
                alt="Icon"
                className="w-6 h-6 mr-4 transition-all hover:filter hover:brightness-0 hover:invert"
              />
              My Profile
            </li>
          </div>

          {/* Gray Line Separator */}
          <div className="h-[1px] bg-textspan mb-4 mr-6"></div>

          {/* Remaining Items */}
          {/* Heading */}
          <h1 className="text-textspan text-2xl font-semibold text-left ml-1 mt-6 mb-6">
            My Work
          </h1>
          <ul className="space-y-4 ml-4">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => handleItemClick(item.name)} // Update active item on click
                className={`flex items-center font-semibold text-lg 
                  ${activeItem === item.name ? "bg-primary text-backGroundColor" : "hover:bg-primary text-textColor hover:text-backGroundColor"} 
                  active:bg-primary hover:cursor-pointer transition-all px-3 py-2 rounded-l-md`}
              >
                <img
                  src={item.img}
                  alt="Icon"
                  className="w-6 h-6 mr-4"
                />
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
