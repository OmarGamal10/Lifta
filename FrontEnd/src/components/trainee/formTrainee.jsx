import React, { useState } from "react";
import "../output.css"; // Adjust the path as needed
import ErrorMessage from "../errorMsg"; // Import the ErrorMessage component

function FormTrainee() {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    workoutPreferences: "outdoors",
  });

  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name == "weight" || name == "height") && value.length > 3) return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleWorkoutPreferencesSelect = (workoutPreferences) => {
    setFormData((prevData) => ({
      ...prevData,
      workoutPreferences,
    }));
    setShowDropdown(false); // Close dropdown after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && (key === "weight" || key === "height")) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted successfully:", formData);
  };

  return (
    <div className="flex flex-row min-h-screen justify-center items-center bg-textColor p-16">
      <div className="container border-2 border-solid bg-backGroundColor border-primary flex flex-col items-center justify-center p-8 max-w-2xl rounded-3xl relative">
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
              value={formData.weight}
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
              value={formData.height}
              autoComplete="off"
            />
            {errors.height && <ErrorMessage error={errors.height} />}
          </div>

          {/* Goals */}
          <div className="bg-backGroundColor mb-10">
            <h6 className="text-xs text-left text-textColor mb-2">Goals</h6>
            <textarea
              id="goals"
              name="goals"
              className="bg-backGroundColor border px-4 w-full h-32 rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left resize-none"
              placeholder="Tell us about your goals..."
              maxLength="256"
              onChange={handleChange}
              value={formData.goals}
              autoComplete="off"
            ></textarea>
            {errors.goals && <ErrorMessage error={errors.goals} />}
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
              value={formData.foodAllergies}
              autoComplete="off"
            ></textarea>
            {errors.foodAllergies && (
              <ErrorMessage error={errors.foodAllergies} />
            )}
          </div>

          {/* Chronic Diseases */}
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
              value={formData.chronicDiseases}
              autoComplete="off"
            ></textarea>
            {errors.chronicDiseases && (
              <ErrorMessage error={errors.chronicDiseases} />
            )}
          </div>

          {/* Workout Preferences Dropdown */}
          <div className="bg-backGroundColor  mb-10 flex flex-col">
            <h6 className="text-xs text-left text-textColor mb-2">Gender</h6>

            <button
              id="dropdownDefaultButton"
              onClick={() => setShowDropdown((prev) => !prev)}
              className="text-textColor  hover:bg-secondary focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center flex flex-row justify-between "
              type="button"
            >
              {formData.gender === "indoor" ? "Indoor" : "Outdoor"}
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
                      onClick={() => handleWorkoutPreferencesSelect("outdoor")}
                      className="block w-full text-left px-4 py-2 hover:bg-secondary hover:text-backGroundColor"
                    >
                      Outdoor
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleWorkoutPreferencesSelect("indoor")}
                      className="block w-full text-left px-4 py-2 hover:bg-secondary  hover:text-backGroundColor"
                    >
                      Indoor
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
            <button className="bg-backGroundColor border px-[100px] rounded-lg border-secondary py-4 text-sm text-secondary hover:border-primary hover:text-primary">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-secondary border px-[100px] rounded-lg border-secondary py-4 text-sm text-backGroundColor hover:border-primary hover:text-primary"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormTrainee;
