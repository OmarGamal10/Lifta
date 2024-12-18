import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nodata from "../assets/Nodata.png"
const NoDataDashboard = ({ header = "No Data Dashboard" }) => (
  <div className="flex gap-[40px] items-center flex-col size-full">
    {header !== "" ? (
      <h1 className=" p-8 text-3xl self-start lg:text-4xl font-bold text-textColor">
        {header}
      </h1>
    ) : (
      ""
    )}
    <div className="bg-backGroundColor border-l-textspan p-6 flex flex-col items-center rounded-lg w-full">
      {/* Dynamic Header */}

      {/* Centered Image */}
      <img
        src={Nodata}
        alt="No Data"
        className="size-[500px] object-contain mb-3"
      />

      {/* Caption under the Image */}
      <p className="text-3xl text-center lg:text-4xl text-textspan font-semibold">
        No data to Show
      </p>
    </div>
  </div>
);

export default NoDataDashboard;
