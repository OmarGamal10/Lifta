import React, { useState } from "react";
import { Link } from "react-router-dom";

const NoDataDashboard = ({ header = "No Data Dashboard" }) => (
  <div className="">
  <h1 className=" p-6 text-3xl lg:text-4xl font-bold text-textColor">
    {header}
  </h1>
  <div className="bg-backGroundColor border-l-textspan relative p-6 flex flex-col rounded-lg">
  {/* Dynamic Header */}

  {/* Centered Image */}
  <img
    src="src/assets/Nodata.png"
    alt="No Data"
    className="w-48 h-48 lg:w-64 lg:h-64 object-contain mb-6"
  />

  {/* Caption under the Image */}
  <p className="text-3xl text-center lg:text-4xl text-textspan font-semibold">
    No data to Show
  </p>
</div>
</div>
);


export default NoDataDashboard;