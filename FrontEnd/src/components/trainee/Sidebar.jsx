/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TbTreadmill } from "react-icons/tb";
import { LiaDumbbellSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { GiMedicinePills } from "react-icons/gi";
import { MdReviews } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";

const SideBar = ({ onSidebarClick, isEditable }) => {
  const [activeItem, setActiveItem] = useState("My Profile"); // Track active item
  const menuItems = [
    { name: "Workouts", label: "Workouts" },
    { name: "Nutrition", label: "Nutrition" },
    ...(isEditable ? [{ name: "Memberships", label: "Memberships" }] : []),
    { name: "Workout history", label: "Workout history" },
    { name: "Nutrition History", label: "Nutrition History" },
    { name: "Reviews", label: "Reviews" },
];


  // Handle click and update the active item
  const handleItemClick = (name) => {
    setActiveItem(name);
    onSidebarClick(name); // Call parent handler
  };

  // Components to render based on the active section
  const renderComponent = (name) => {
    switch (name) {
      case "My Profile":
        return <FiUser className="mr-2 text-2xl" />;
      case "Workouts":
        return <LiaDumbbellSolid className="mr-2 text-2xl" />;
      case "Nutrition":
        return <GiMedicinePills className="mr-2 text-2xl" />;
      case "Memberships":
        return <FaUsers className="mr-2 text-2xl" />;
      case "Workout history":
        return <LiaDumbbellSolid className="mr-2 text-2xl" />;
      case "Nutrition History":
        return <GiMedicinePills className="mr-2 text-2xl" />;
      case "Reviews":
        return <MdReviews className="mr-2 text-2xl" />;
      default:
        return <TbTreadmill className="mr-2 text-2xl" />;
    }
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
                ${
                  activeItem === "My Profile"
                    ? "bg-primary text-backGroundColor scale-110"
                    : "hover:bg-primary text-textColor hover:text-backGroundColor"
                } 
                active:bg-primary hover:cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-lg mx-3 pl-3 py-2 rounded-l-md`}
            >
              {renderComponent("My Profile")}
              Profile
            </li>
          </div>

          {/* Gray Line Separator */}
          <div className="h-[1px] bg-textspan mb-4 mr-6"></div>

          {/* Remaining Items */}
          {/* Heading */}
          <h1 className="text-textspan text-2xl font-semibold text-left ml-1 mt-6 mb-6">
            Work
          </h1>
          <ul className="space-y-4 ml-4">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => handleItemClick(item.name)} // Update active item on click
                className={`flex items-center font-semibold text-lg 
                  ${
                    activeItem === item.name
                      ? "bg-primary text-backGroundColor scale-110"
                      : "hover:bg-primary text-textColor hover:text-backGroundColor"
                  } 
                  active:bg-primary hover:cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-lg mx-3 pl-3 py-2 rounded-l-md`}
              >
                {renderComponent(item.name)}
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
