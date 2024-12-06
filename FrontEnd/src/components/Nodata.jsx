import React, { useState } from "react";
import { Link } from "react-router-dom";

const NoDataDashboard = () => {
    return (
<div className="bg-backGroundColor border-l-textspan p-50 relative flex flex-col items-center justify-center rounded-lg shadow-lg">
  {/* Header at the top-left corner */}
  <h1 className="absolute top-4 left-4 p-6 text-3xl lg:text-4xl font-bold text-textColor">
    No Data Dashboard
  </h1>
  
  {/* Centered Image - slightly increased size */}
  <div className="flex flex-col ml-">
    <img
      src="src/assets/Nodata.png"
      alt="No Data"
      className="mb-5"
    />

    {/* Caption under the Image */}
    <p className="text-3xl text-center lg:text-4xl text-textspan font-semibold">
      No data to Show
    </p>
  </div>
</div>

    );
};

export default NoDataDashboard;