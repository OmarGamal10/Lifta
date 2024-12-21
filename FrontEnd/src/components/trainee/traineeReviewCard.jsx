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
import { Button } from "primereact/button";
import { ReviewModalForm } from "./reviewModalForm";

export function TraineeReviewCard(probs) {
  const {
    get: httpGet,
    post,
    loading,
    error,
    del,
  } = useHttp("http://localhost:3000");

  const dialogRef = useRef(null);

  const handleDelete = async () => {
    try {
      const response = await del(`/reviews/${probs.reviewId}`, {
        headers: { "Cache-Control": "no-cache" },
        body: {},
        data: {},
      });
      console.log(response);

      probs.fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // Open the dialog
  const onEditClick = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  // Close modal handler
  const handleCloseModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      probs.fetchData();
    }
  };

  return (
    <>
      <div className="flex flex-col border-[2px] border-secondary rounded-2xl text-textColor w-[307px] overflow-hidden p-8">
        <div className="flex gap-2">
          <span>To: </span>
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
          <h6 className="text-xs text-left text-backGroundColor mb-2">
            Content
          </h6>
          <textarea
            id="content"
            name="content"
            className="bg-backGroundColor border px-4 w-full h-32 rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left resize-none"
            readOnly
            value={probs.content}
          ></textarea>
        </div>
        {probs.isEditable?
        <div className="flex justify-between mt-4 ">
          <Button
            label="Delete"
            icon="pi pi-trash"
            rounded
            unstyled
            onClick={handleDelete}
            className="group"
            pt={{
              root: {
                className:
                  "w-28 text-xs border-accent hover:bg-accent text-textColor hover:bg-accent hover:text-backGroundColor focus:outline-none focus:ring-0 active:ring active:ring-accent/50",
              },
              label: {},
              icon: {
                className: "group-hover:text-backGroundColor text-accent",
              }, // OR { className: 'text-white text-2xl' }
            }}
          />
          
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            rounded
            unstyled
            onClick={onEditClick}
            className="group"
            pt={{
              root: {
                className:
                  "w-28 text-xs border-accent hover:bg-accent text-textColor hover:bg-accent hover:text-backGroundColor focus:outline-none focus:ring-0 active:ring active:ring-accent/50",
              },
              label: {},
              icon: {
                className: "group-hover:text-backGroundColor text-accent",
              }, // OR { className: 'text-white text-2xl' }
            }}
          />
        </div>
        :<></>}
      </div>

      <dialog
        ref={dialogRef}
        className="p-6 rounded-lg w-full max-w-md bg-textColor text-backGroundColor"
      >
        <ReviewModalForm
          isEdit={1}
          reviewId={probs.reviewId}
          content={probs.content}
          stars={probs.stars}
          handleCloseModal={handleCloseModal}
        />
      </dialog>
    </>
  );
}
