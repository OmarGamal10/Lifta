/* eslint-disable no-unused-vars */
//  import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../output.css"; // Adjust the path as needed
import useHttp from "../../hooks/useHTTP";
import React from "react";
import "primeicons/primeicons.css";
import { TraineeExerciseCard } from "./traineeExerciseCard";
import { BsUpload } from "react-icons/bs";
import ErrorMessage from "../errorMsg";
import handleImages from "../../freqUsedFuncs/handleImages";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import { Rating } from "primereact/rating";

export function ReviewModalForm(probs) {
  const ref = useRef();
  const [errors, setErrors] = useState({});

  const { post, get, patch, loading, error, data } = useHttp(
    "http://localhost:3000"
  );

  const [formData, setFormData] = useState({
    content: "",
  });
  const [stars, setStars] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      content: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key != "gif") {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // const token = getTokenFromCookies();
    // const decodedToken = token ? jwtDecode(token) : null;
    // const userId = decodedToken ? decodedToken.user_id : null;
    // console.log(userId);
    const content = formData.content;
    console.log(content);

    if (probs.isEdit) {
      const reviewId = probs.reviewId;
      try {
        const response = await patch(
          `/reviews/${probs.reviewId}`,
          {
            content,
            stars,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    else {
      const trainerId = probs.trainerId;
      const traineeId = probs.traineeId;
      
      try {
        const response = await post(
          "/reviews",
          {
            trainerId,
            traineeId,
            content,
            stars,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }

    probs.handleCloseModal();
  };

  useEffect(() => {
    if (probs.isEdit) {
      setFormData({ content: probs.content });
      setStars(probs.stars);      
    }
  }, []);

  return (
    
      <div className="p-6 rounded-lg w-full max-w-md bg-textColor text-backGroundColor">
        <form
          // onSubmit={handleSubmit}
          className=" py-6 px-10 w-full"
          autoComplete="off" // Disable autocomplete globally
        >
          <div className="mb-4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Content
            </h6>
            <textarea
              id="content"
              name="content"
              className="border px-4 w-full h-32 rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left resize-none"
              placeholder="Give your review"
              maxLength="250"
              onChange={handleChange}
              value={formData.content}
              autoComplete="off"
            ></textarea>
            {errors.content && <ErrorMessage error={errors.content} />}
          </div>
          <div className="">
            <Rating
              value={stars}
              onChange={(e) => setStars(e.value)}
              className="text-secondary"
              pt={{
                item: { style: { color: "#e6bd09", fontSize: "32px" } }, // Applies to each star
                cancelIcon: { style: { color: "gray" } }, // Applies to the cancel icon, if enabled
                onIcon: { style: { color: "#e6bd09" } }, // Applies to selected stars
                offIcon: { style: { color: "gray" } }, // Applies to unselected stars
              }}
            />
          </div>
          <div className="w-1/2 mt-10">
            <button
              type="submit"
              className=" border-secondary w-full text-secondary text-sm rounded-xl py-4 border-2 hover:bg-secondary hover:text-textColor font-medium  active:ring active:ring-secondary/50"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  );
}
