/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import Workout from "./workoutCard";
import ErrorMessage from "../errorMsg";
import workouts from "./testDataWorkouts";
import { useNavigate } from "react-router-dom";
import Nodata from "../Nodata";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import { jwtDecode } from "jwt-decode";
import useHttp from "../../hooks/useHTTP";
import { useLocation } from "react-router-dom";

function AssignWorkout() {
  const { get, post, loading, error, data } = useHttp("http://localhost:3000");
  const location = useLocation();
  const { clientId, userId } = location.state || {};
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workoutId: "",
    day: "Sunday",
  });
  const [errors, setErrors] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [workouts, setworkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState(null);
  const [lastSelectdDay, setLastSelectedDay] = useState(null);

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
  /////////////////////
  ////////////////////////
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!userId) {
        console.error("User ID not found in token.");
        return;
      }

      try {
        const response = await get(`/users/${userId}/workouts`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response: ", response);

        const fetchedWorkouts = Array.isArray(response.data.workouts)
          ? response.data.workouts
          : [];
        setworkouts(fetchedWorkouts);

        if (fetchedWorkouts.length === 0) {
          setCurrentPage(1);
        }
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setworkouts([]);
      }
    };

    fetchWorkouts();
  }, []);
  //////////////////////////////////
  ///////////////////////
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

  const handleSubmit = async (isAssign) => {
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

    try {
      const response = await post(
        "/workouts/trainee",
        {
          workout_id: formData.workoutId,
          trainee_id: clientId,
          day: formData.day,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLastSelectedDay(formData.day);
      console.log(response.data.workout);
      setNewWorkout(response.data.workout.new);
      setSelectedWorkout(null);
      setFormData({
        workoutId: "",
        day: "Sunday",
      });
      setErrors({});
      console.log(response);
    } catch (err) {
      console.log(err.response.data.message);
      errors.workoutId = err.response.data.message;
    }
  };

  const handleCancel = () => {
    setSelectedWorkout(null);
    setFormData({
      workoutId: "",
      day: "Sunday",
    });
    setErrors({});
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
          <div className="mt-4">
            {newWorkout !== null && (
              <div className="mt-2 text-center">
                <span className={`text-sm font-semibold text-accent`}>
                  {newWorkout
                    ? "New Workout assigned for this trainee on " +
                      lastSelectdDay
                    : `Updated Workout for this trainee on ${lastSelectdDay}`}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Nodata header="No Workouts Available" />
      )}
    </div>
  );
}

export default AssignWorkout;
