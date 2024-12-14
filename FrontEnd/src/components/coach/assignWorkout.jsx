import React, { useState, useMemo } from "react";
import Workout from "./workoutCard";
import ErrorMessage from "../errorMsg";
import workouts from "./testDataWorkouts";
import { useNavigate } from "react-router-dom";
import Nodata from "../Nodata";

function AssignWorkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workoutId: "",
    day: "Sunday",
  });
  const [errors, setErrors] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState(null);
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

  const workoutsPerPage = 6;

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(
      selectedWorkout && selectedWorkout.id === workout.id ? null : workout
    );

    setFormData((prevData) => ({
      ...prevData,
      workoutId: workout.id === selectedWorkout?.id ? "" : workout.id,
    }));

    setErrors((prevErrors) => {
      const { workoutId, ...restErrors } = prevErrors; // Remove workoutId error
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

  const handleSubmit = (isAssign) => {
    const newErrors = {};

    if (!selectedWorkout) {
      newErrors.workoutId = "Please select a workout";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isAssign) {
      console.log("Assigning workout:", {
        workoutId: formData.workoutId,
        day: formData.day,
      });
    }

    setSelectedWorkout(null);
    setFormData({
      workoutId: "",
      day: "Sunday",
    });
    setErrors({});
    navigate("/profile");
  };

  const handleCancel = () => {
    setSelectedWorkout(null);
    setFormData({
      workoutId: "",
      day: "Sunday",
    });
    setErrors({});
    navigate("/profile");
  };

  const paginatedWorkouts = useMemo(() => {
    const startIndex = (currentPage - 1) * workoutsPerPage;
    return workouts.slice(startIndex, startIndex + workoutsPerPage);
  }, [currentPage, workouts]);

  const totalPages = Math.ceil(workouts.length / workoutsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl text-textColor font-bold mb-4">Assign Workout</h2>

      {workouts.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-5 mb-4">
            {paginatedWorkouts.map((workout) => (
              <div
                key={workout.id}
                onClick={() => handleWorkoutSelect(workout)}
                className={`cursor-pointer ${
                  selectedWorkout?.id === workout.id
                    ? "border-4 border-primary rounded-2xl"
                    : ""
                }`}
              >
                <Workout
                  name={workout.name}
                  note={workout.note}
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

          {selectedWorkout && (
            <div className="mb-4">
              <label className="block mb-2 font-medium text-textColor">
                Select Day for {selectedWorkout.name}
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
          )}

          {errors.workoutId && <ErrorMessage error={errors.workoutId} />}

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
              Assign Workout
            </button>
          </div>
        </div>
      ) : (
        <Nodata header="No Workouts Available" />
      )}
    </div>
  );
}

export default AssignWorkout;
