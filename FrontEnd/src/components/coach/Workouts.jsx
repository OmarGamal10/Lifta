import React, { useState, useEffect } from "react";
import Workout from "./workoutCard";
import ErrorMessage from "../errorMsg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import Nodata from "../Nodata";
import { IoIosAddCircleOutline } from "react-icons/io";
import CreateWorkout from "./createWorkout";
import useHttp from "../../hooks/useHTTP";
import NoDataDashboard from "../Nodata";
import { use } from "react";
import Loader from "../Loader"; // Import your Loader component
import WorkoutModal from "./workoutModal";
import { Toaster, toast } from "sonner";

function Workouts({ userId }) {
  const navigate = useNavigate();

  const { get, post, del, error, data } = useHttp("http://localhost:3000");
  const [curPage, setCurPage] = useState(1);
  const [workouts, setWorkouts] = useState([]);
  const totalPages = Math.ceil(workouts.length / 5);
  const [idToEdit, setIdToEdit] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState({
    name: "",
    id: "",
  });

  /////////////////////////////////////////
  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
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
        setWorkouts(fetchedWorkouts);

        if (fetchedWorkouts.length === 0) {
          setCurPage(1);
        }
      } catch (err) {
        toast.error("Error Loading Workouts", {
          style: {
            background: "white",
            color: "red",
          },
        });
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);
  /////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      const response = await del(
        "/workouts",
        {
          workout_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
      toast.success("Workout Deleted Succefully", {
        style: {
          background: "white",
          color: "green",
        },
      });
    } catch (err) {
      if (err.response?.data?.error?.code === "23503")
        toast.error("Can't Delete Workout Assigned to a Trainee", {
          style: {
            background: "white",
            color: "red",
          },
        });
      else
        toast.error("Can't Delete Workout", {
          style: {
            background: "white",
            color: "red",
          },
        });
    }
  };

  const handlePreviousPage = () => {
    setCurPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const openModal = (workoutId, name) => {
    setSelectedWorkout({ id: workoutId, name: name });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkout({
      name: "",
      id: "",
    });
  };
  const renderWorkouts = () => {
    return (
      <>
        <Toaster />

        {isModalOpen && (
          <WorkoutModal
            isModalOpen={isModalOpen}
            workoutId={selectedWorkout.id}
            name={selectedWorkout.name}
            closeModal={closeModal}
          />
        )}
        <div
          className={`w-full flex flex-col min-h-screen justify-center px-12 pb-3 
        } ${isModalOpen ? "opacity-50" : ""}`}
        >
          <h2 className="py-8 text-3xl self-start lg:text-4xl font-bold text-textColor">
            Workouts
          </h2>
          <div
            className={`w-full grid grid-cols-2 lg:grid-cols-3 gap-4 pb-5 pr-10 `}
          >
            {workouts.slice((curPage - 1) * 5, curPage * 5).map((workout) => (
              <div
                key={workout.id}
                onClick={() => openModal(workout.id, workout.name)}
                className="cursor-pointer"
              >
                <Workout
                  id={workout.id}
                  name={workout.name}
                  note={workout.note}
                  setIdToEdit={setIdToEdit}
                  handleDelete={handleDelete}
                />
              </div>
            ))}
            <div className="flex items-center justify-center min-w-64 max-w-64 min-h-64 h-[280px]">
              <button
                onClick={() => navigate("/createWorkout")}
                className="text-primary hover:text-secondary transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg transform"
              >
                <IoIosAddCircleOutline size={100} />
              </button>
            </div>
          </div>

          {workouts.length && (
            <div className=" flex justify-center items-center py-2 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={curPage === 1}
                className={`px-4 py-2 rounded-xl border ${
                  curPage === 1
                    ? " text-textColor cursor-not-allowed"
                    : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-textColor">
                Page {curPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={curPage === totalPages}
                className={`px-8 py-2 rounded-xl border ${
                  curPage === totalPages
                    ? "text-textColor cursor-not-allowed"
                    : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="w-full">{loading ? <Loader /> : renderWorkouts()}</div>
  );
}
export default Workouts;
