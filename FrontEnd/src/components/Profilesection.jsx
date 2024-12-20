import React, { useState, useEffect } from "react";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import useHttp from "../hooks/useHTTP";

const ProfileSection = ({ userName, userBio, userType, userId, userProfile }) => {
  const { get } = useHttp("http://localhost:3000");
  const [coachRating, setCoachRating] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      if (userType === "Trainer" && userId) {
        try {
          const response = await get(`/users/${userId}/reviews/rate`);
          setCoachRating(Number(response.data.rate.avg).toFixed(1) || 0);
        } catch (error) {
          console.error("Error fetching coach rating:", error);
        }
      }
    };

    fetchRating();
  }, [userId]);

  const renderRating = () => {
    if (coachRating > 0) {
      const fullStars = Math.floor(coachRating); // Number of full stars
      const hasHalfStar = coachRating % 1 !== 0; // Check if there's a decimal point

      return (
        <div className="text-[25px] flex items-center space-x-1">
          <span className="font-bold text-primary text-2xl mr-2 py-2">
            {coachRating}
          </span>
          {Array.from({ length: fullStars }, (_, index) => (
            <FaStar key={`full-star-${index}`} className=" text-primary" />
          ))}

          {/* Render half star if present */}
          {hasHalfStar && <FaRegStarHalfStroke className=" text-primary" />}
        </div>
      );
    }

    return <div></div>;
  };
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
        {renderRating()}
      </div>
    </div>
  );
};

export default ProfileSection;
