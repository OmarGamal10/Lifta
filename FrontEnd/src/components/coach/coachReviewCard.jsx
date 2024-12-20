/* eslint-disable no-unused-vars */
//  import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../output.css"; // Adjust the path as needed
import useHttp from "../../hooks/useHTTP";
import React from "react";
import "primeicons/primeicons.css";
import { BsUpload } from "react-icons/bs";
import ErrorMessage from "../errorMsg";
import handleImages from "../../freqUsedFuncs/handleImages";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

export function CoachReviewCard(probs) {
  return (
    <div className="flex flex-col border-[2px] border-secondary rounded-2xl text-textColor w-[307px] overflow-hidden p-8">
      <div className="flex flex-col gap-2">
        <Link to="#" className="font-bold">
          {`${probs.firstName} ${probs.lastName}`}
        </Link>
      </div>
      <div className="mt-4">
        <Rating
          value={probs.stars}
          readOnly
          cancel={false}
          className="text-secondary"
          pt={{
            item: { style: { color: "#e6bd09", fontSize: "32px" } }, // Applies to each star
            onIcon: { style: { color: "#e6bd09" } }, // Applies to selected stars
            offIcon: { style: { color: "gray" } }, // Applies to unselected stars
          }}
        />
      </div>
      <div>
        <h6 className="text-xs text-left text-backGroundColor mb-2">Content</h6>
        <textarea
          id="content"
          name="content"
          className="bg-backGroundColor border px-4 w-full h-32 rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left resize-none"
          readOnly
          value={probs.content}
        ></textarea>
      </div>
    </div>
  );
}
