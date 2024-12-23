/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "../output.css"; // Adjust the path as needed
import ErrorMessage from "../errorMsg"; // Import the ErrorMessage component
import useHttp from "../../hooks/useHTTP";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function FormTrainee({
  formData,
  traineeData,
  setTraineeData,
  setCurForm,
  isAdmin,
}) {
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { post, loading, error, data } = useHttp("http://localhost:3000");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name == "weight" || name == "height") && value.length > 3) return;
    setTraineeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleWorkoutPreferencesSelect = (workoutPreferences) => {
    setTraineeData((prevData) => ({
      ...prevData,
      workoutPreferences,
    }));
    setShowDropdown(false); // Close dropdown after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(traineeData).forEach((key) => {
      if (!traineeData[key] && (key === "weight" || key === "height")) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isAdmin) {
      try {
        console.log(traineeData);
        const response = await post(
          "/users/signup",
          {
            ...formData,
            ...traineeData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Account Created Successfully", {
          style: {
            background: "white",
            color: "green",
          },
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (err) {
        if (err.response?.data?.message)
          setErrors({ ...errors, submit: err.response?.data?.message });
        else
          toast.error("Can't sign up", {
            style: {
              background: "white",
              color: "red",
            },
          });
      }
    } else {
      try {
        console.log(traineeData);
        const response = await post(
          "/users/createAccount",
          {
            ...formData,
            ...traineeData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Account Created Successfully", {
          style: {
            background: "white",
            color: "green",
          },
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (err) {
        if (err.response?.data?.message)
          setErrors({ ...errors, submit: err.response?.data?.message });
        else
          toast.error("Can't sign up", {
            style: {
              background: "white",
              color: "red",
            },
          });
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-row min-h-screen w-full justify-center items-center bg-backGroundColor p-16">
        <div className="container border-2 border-solid bg-backGroundColor border-secondary flex flex-col items-center justify-center p-8 max-w-2xl rounded-3xl relative">
          <div className="absolute top-[-65px] left-1/2 transform -translate-x-1/2"></div>
          <form
            className="bg-backGroundColor py-16 px-10 w-full"
            onSubmit={handleSubmit}
            autoComplete="off" // Disable autocomplete globally
          >
            {/* Weight */}
            <div className="bg-backGroundColor mb-10">
              <h6 className="text-xs text-left text-textColor mb-2">Weight</h6>
              <input
                id="weight-input"
                name="weight"
                className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
                type="number"
                placeholder="Enter your Weight"
                maxLength="3"
                value={traineeData.weight}
                onChange={handleChange}
                autoComplete="off" // Disable autocomplete
              />
              {errors.weight && <ErrorMessage error={errors.weight} />}
            </div>

            {/* Height */}
            <div className="bg-backGroundColor mb-10">
              <h6 className="text-xs text-left text-textColor mb-2">Height</h6>
              <input
                id="height-input"
                name="height"
                className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
                type="number"
                placeholder="Enter your height"
                maxLength="3"
                onChange={handleChange}
                value={traineeData.height}
                autoComplete="off"
              />
              {errors.height && <ErrorMessage error={errors.height} />}
            </div>

            {/* Goals */}
            <div className="bg-backGroundColor mb-10">
              <h6 className="text-xs text-left text-textColor mb-2">Goals</h6>
              <textarea
                id="goal"
                name="goal"
                className="bg-backGroundColor border px-4 w-full h-32 rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left resize-none"
                placeholder="Tell us about your goals..."
                maxLength="256"
                onChange={handleChange}
                value={traineeData.goal}
                autoComplete="off"
              ></textarea>
              {errors.goal && <ErrorMessage error={errors.goal} />}
            </div>

            {/* Food Allergies */}
            <div className="bg-backGroundColor mb-10">
              <h6 className="text-xs text-left text-textColor mb-2">
                Food Allergies
              </h6>
              <textarea
                id="foodAllergies"
                name="foodAllergies"
                className="bg-backGroundColor border px-4 w-full h-32 rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left resize-none"
                placeholder="Do you have any food allergies?"
                maxLength="256"
                onChange={handleChange}
                value={traineeData.foodAllergies}
                autoComplete="off"
              ></textarea>
              {errors.foodAllergies && (
                <ErrorMessage error={errors.foodAllergies} />
              )}
            </div>

            {/* Chronic Diseases
          <div className="bg-backGroundColor mb-10">
            <h6 className="text-xs text-left text-textColor mb-2">
              Chronic Diseases
            </h6>
            <textarea
              id="chronicDiseases"
              name="chronicDiseases"
              className="bg-backGroundColor border px-4 w-full h-32 rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left resize-none"
              placeholder="Do you have any chronic diseases?"
              maxLength="256"
              onChange={handleChange}
              value={traineeData.chronicDiseases}
              autoComplete="off"
            ></textarea>
            {errors.chronicDiseases && (
              <ErrorMessage error={errors.chronicDiseases} />
            )}
          </div> */}

            {/* Workout Preferences Dropdown */}
            <div className="bg-backGroundColor  mb-10 flex flex-col">
              <h6 className="text-xs text-left text-textColor mb-2">
                Workout preference
              </h6>

              <button
                id="dropdownDefaultButton"
                onClick={() => setShowDropdown((prev) => !prev)}
                className="text-textColor  hover:bg-secondary focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center flex flex-row justify-between "
                type="button"
              >
                {traineeData.workoutPreferences === "Home" ? "Home" : "Gym"}
                <div>
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
              </button>
              {showDropdown && (
                <div
                  id="dropdown"
                  className="z-10 bg-white divide-y divide-primary rounded-lg shadow w-full mt-2"
                >
                  <ul className="py-2  text-sm text-primary">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleWorkoutPreferencesSelect("Home")}
                        className="block w-full text-left px-4 py-2 hover:bg-secondary hover:text-backGroundColor"
                      >
                        Home
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleWorkoutPreferencesSelect("Gym")}
                        className="block w-full text-left px-4 py-2 hover:bg-secondary  hover:text-backGroundColor"
                      >
                        Gym
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              {errors.workoutPreferences && (
                <ErrorMessage error={errors.workoutPreferences} />
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-backGroundColor border px-[100px] rounded-lg border-secondary py-4 text-sm text-secondary hover:border-primary hover:text-primary  "
                onClick={(e) => {
                  e.preventDefault();
                  setCurForm(1);
                }}
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-secondary border w-5/12 rounded-lg border-secondary py-4 text-sm text-backGroundColor hover:border-primary hover:text-primary"
              >
                Create Account
              </button>
            </div>
          </form>
          {errors.submit && <ErrorMessage error={errors.submit} />}
        </div>
      </div>
    </>
  );
}

export default FormTrainee;
