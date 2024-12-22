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
import Loader from "../Loader"; // Import your Loader component
import { Toaster, toast } from "sonner";
function AssignWorkout() {
  const { get, post, error, data } = useHttp("http://localhost:3000");
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

  const [loading, setLoading] = useState(true); // State to track loading

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
      setLoading(true);

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
        toast.error("Error fetching workouts", {
          style: {
            background: "white",
            color: "red",
          },
        });
        setworkouts([]);
      } finally {
        setLoading(false);
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

      setSelectedWorkout(null);

      setErrors({});
      if (response.data.workout.new)
        toast.success(`New Workout assigned successfully on ${formData.day}`, {
          style: {
            background: "white",
            color: "green",
          },
        });
      else
        toast.success(`Workout updated successfully on ${formData.day}`, {
          style: {
            background: "white",
            color: "green",
          },
        });
      setFormData({
        workoutId: "",
        day: "Sunday",
      });
    } catch (err) {
      toast.error("Error assigning workout", {
        style: {
          background: "white",
          color: "red",
        },
      });
    }
  };

  const handleCancel = () => {
    if (selectedWorkout) {
      setSelectedWorkout(null);
      setFormData({
        workoutId: "",
        day: "Sunday",
      });
      setErrors({});
    } else {
      navigate("/profile");
    }
  };

  const paginatedWorkouts = useMemo(() => {
    const startIndex = (currentPage - 1) * workoutsPerPage;
    return workouts.slice(startIndex, startIndex + workoutsPerPage);
  }, [currentPage, workouts]);

  const totalPages = Math.ceil(workouts.length / workoutsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const renderForm = () => {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <Toaster />
        <h2 className="text-2xl text-textColor font-bold mb-4">
          Assign Workout
        </h2>

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
  };
  return <div className="w-full">{loading ? <Loader /> : renderForm()}</div>;
}

export default AssignWorkout;
