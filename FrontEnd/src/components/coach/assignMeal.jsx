import React, { useState, useMemo } from "react";
import Meal from "./MealCard";
import ErrorMessage from "../errorMsg";
import meals from "./testDataMeals";
import { useNavigate } from "react-router-dom";
import Nodata from "../Nodata";

function AssignMeal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mealId: "",
    day: "Sunday",
    mealType: "Breakfast",
  });
  const [errors, setErrors] = useState({});
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  const mealsPerPage = 6;

  const handleMealSelect = (meal) => {
    setSelectedMeal(selectedMeal && selectedMeal.id === meal.id ? null : meal);

    setFormData((prevData) => ({
      ...prevData,
      mealId: meal.id === selectedMeal?.id ? "" : meal.id,
    }));

    setErrors((prevErrors) => {
      const { mealId, ...restErrors } = prevErrors;
      return restErrors;
    });
  };

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      day: selectedDay,
    }));
  };

  const handleMealTypeChange = (e) => {
    const selectedMealType = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      mealType: selectedMealType,
    }));
  };

  const handleSubmit = (isAssign) => {
    const newErrors = {};

    if (!selectedMeal) {
      newErrors.mealId = "Please select a meal";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isAssign) {
      console.log("Assigning meal:", {
        mealId: formData.mealId,
        day: formData.day,
        mealType: formData.mealType,
      });
    }

    setSelectedMeal(null);
    setFormData({
      mealId: "",
      day: "Sunday",
      mealType: "Breakfast",
    });
    setErrors({});
    navigate("/profile");
  };

  const handleCancel = () => {
    setSelectedMeal(null);
    setFormData({
      mealId: "",
      day: "Sunday",
      mealType: "Breakfast",
    });
    setErrors({});
    navigate("/profile");
  };

  const paginatedMeals = useMemo(() => {
    const startIndex = (currentPage - 1) * mealsPerPage;
    return meals.slice(startIndex, startIndex + mealsPerPage);
  }, [currentPage]);

  const totalPages = Math.ceil(meals.length / mealsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl text-textColor font-bold mb-4">Assign Meal</h2>

      {meals.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-5 mb-4">
            {paginatedMeals.map((meal) => (
              <div
                key={meal.id}
                onClick={() => handleMealSelect(meal)}
                className={`cursor-pointer ${
                  selectedMeal?.id === meal.id
                    ? "border-4 border-primary rounded-2xl"
                    : ""
                }`}
              >
                <Meal
                  name={meal.name}
                  photo={meal.photo}
                  facts={meal.facts}
                  view={"display"}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-4 mb-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-secondary rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-textColor">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-secondary rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {selectedMeal && (
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 font-medium text-textColor">
                  Select Day for {selectedMeal.name}
                </label>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleDayChange}
                  className="w-full p-2 border rounded"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block mb-2 font-medium text-textColor">
                  Select Meal Type
                </label>
                <select
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleMealTypeChange}
                  className="w-full p-2 border rounded"
                >
                  {mealTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {errors.mealId && <ErrorMessage error={errors.mealId} />}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-secondary text-textColor rounded hover:bg-primary hover:text-backGroundColor"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="px-4 py-2 bg-secondary text-textColor rounded hover:bg-primary hover:text-backGroundColor"
            >
              Assign Meal
            </button>
          </div>
        </div>
      ) : (
        <Nodata header="No Meals Available" />
      )}
    </div>
  );
}

export default AssignMeal;
