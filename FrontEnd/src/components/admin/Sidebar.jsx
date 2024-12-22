import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { SiTrainerroad } from "react-icons/si";
import { GiBabyfootPlayers } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoStatsChartSharp } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import { TbPackages } from "react-icons/tb";

const SideBar = ({ onSidebarClick }) => {
  const [activeItem, setActiveItem] = useState("My Profile"); // Track active item
  const menuItems = [
    { name: "Trainees", label: "Trainees" },
    { name: "Coaches", label: "Coaches" },
    { name: "Admins", label: "Admins" },
    { name: "Statistics", label: "Statistics" },
    { name: "Add User", label: "Add User" },
    { name: "Packages", label: "Packages" },
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
      case "Trainees":
        return <GiBabyfootPlayers className="mr-2 text-2xl" />;
      case "Coaches":
        return <SiTrainerroad className="mr-2 text-2xl" />;
      case "Admins":
        return <MdAdminPanelSettings className="mr-2 text-2xl" />;
      case "Packages":
        return <TbPackages className="mr-2 text-2xl" />;
      case "Statistics":
        return <IoStatsChartSharp className="mr-2 text-2xl" />;
      case "Add User":
        return <HiUserAdd className="mr-2 text-2xl" />;
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
