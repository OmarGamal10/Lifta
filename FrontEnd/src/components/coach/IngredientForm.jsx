import React, { useState } from "react";
import "../output.css"; // Adjust the path as needed
import ErrorMessage from "../errorMsg"; // Import the ErrorMessage component

function Ingredient() {
  const [formData, setFormData] = useState({
    name: "",
    protiens: "",
    carbs: "",
    fats: "",
    calories: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name == "protiens" || name == "carbs" || name == "fats") &&
      value.length > 2
    )
      return;
    if (name == "calories" && value.length > 3) return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  return (
    <div
      name="ingForm"
      className="container border-2 border-solid bg-textColor border-secondary flex flex-col items-center justify-center p-8  max-w-lg rounded-3xl relative"
    >
      <h1 className="text-3xl font-bold">New Ingredient</h1>
      <form
        onSubmit={handleSubmit}
        className=" py-6 px-10 w-full"
        autoComplete="off" // Disable autocomplete globally
      >
        <div className=" mb-6">
          <h6 className="text-xs text-left text-backGroundColor mb-2">Name</h6>
          <input
            id="name-input"
            name="name"
            className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
            type="text"
            placeholder="Enter Name"
            maxLength="15"
            onChange={handleChange}
            value={formData.name}
            autoComplete="off"
          />
          {errors.name && <ErrorMessage error={errors.name} />}
        </div>
        <div className="flex flex-row justify-between mb-6">
          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Protiens
            </h6>
            <input
              id="protiens-input"
              name="protiens"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="Protiens"
              maxLength="2"
              onChange={handleChange}
              value={formData.protiens}
              autoComplete="off"
            />
            {errors.protiens && <ErrorMessage error={errors.protiens} />}
          </div>
          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Carbs
            </h6>
            <input
              id="carbs-input"
              name="carbs"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="Carbs"
              maxLength="2"
              onChange={handleChange}
              value={formData.carbs}
              autoComplete="off"
            />
            {errors.carbs && <ErrorMessage error={errors.carbs} />}
          </div>
          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Fats
            </h6>
            <input
              id="fats-input"
              name="fats"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="fats"
              maxLength="2"
              onChange={handleChange}
              value={formData.fats}
              autoComplete="off"
            />
            {errors.fats && <ErrorMessage error={errors.fats} />}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Calories
            </h6>
            <input
              id="calories-input"
              name="calories"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="calories"
              maxLength="3"
              onChange={handleChange}
              value={formData.calories}
              autoComplete="off"
            />
            {errors.calories && <ErrorMessage error={errors.calories} />}
          </div>
          <div className="w-1/2 mt-5">
            <button
              type="submit"
              className=" bg-secondary w-full text-textColor text-sm rounded-xl py-4 border hover:border-secondary hover:bg-textColor hover:text-secondary"
              onClick={handleSubmit}
            >
              Add Ingredient
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Ingredient;
