import React, { useState, useEffect } from "react";
import Exercise from "./exerciseCard";
import ErrorMessage from "../errorMsg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import Nodata from "../Nodata";
import { IoIosAddCircleOutline } from "react-icons/io";
import ExerciseForm from "./exerciseForm";
import useHttp from "../../hooks/useHTTP";
import NoDataDashboard from "../Nodata";
import { use } from "react";
import Loader from "../Loader"; // Import your Loader component
import { Toaster, toast } from "sonner";
function Exercises({ userId }) {
  const navigate = useNavigate();

  const { get, post, del, error, data } = useHttp("http://localhost:3000");
  const [curPage, setCurPage] = useState(1);
  const [exercises, setExercises] = useState([]);
  const totalPages = Math.ceil(exercises.length / 5);
  const [addExerciseView, setAddExerciseView] = useState(false);
  const [editExerciseView, setEditExerciseView] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  /////////////////////////////////////////
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await get(`/users/${userId}/exercises`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response: ", response);

        const fetchedExercises = Array.isArray(response.data.exercises)
          ? response.data.exercises
          : [];
        setExercises(fetchedExercises);

        if (fetchedExercises.length === 0) {
          setCurPage(1);
        }
      } catch (err) {
        toast.error("Error Loading Exercises", {
          style: {
            background: "white",
            color: "red",
          },
        });
        setExercises([]);
      } finally {
        setLoading(false); // Hide loader after API call finishes
      }
    };

    fetchExercises();
  }, []);
  /////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      const response = await del(
        "/exercises",
        {
          exercise_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
      toast.success(" Exercise Deleted Succefully", {
        style: {
          background: "white",
          color: "green",
        },
      });
      // Remove the deleted exercise from the state
    } catch (err) {
      if (err.response?.data?.error?.code === "23503")
        toast.error("Can't Delete Exercise Assigned to a Workout", {
          style: {
            background: "white",
            color: "red",
          },
        });
      else
        toast.error("Can't Delete Exercise", {
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

  const renderExercise = () => (
    <>
      {editExerciseView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ExerciseForm
            setView={setEditExerciseView}
            edit={true}
            idToEdit={idToEdit}
            setExercises={setExercises}
          />
        </div>
      )}
      {addExerciseView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ExerciseForm
            setExercises={setExercises}
            setView={setAddExerciseView}
            userId={userId}
          />
        </div>
      )}
      <div
        className={`w-full flex flex-col min-h-screen justify-center px-10 pb-3  ${
          addExerciseView || editExerciseView ? "opacity-50" : ""
        } `}
      >
        <Toaster />
        <h2 className="py-8 text-3xl self-start lg:text-4xl font-bold text-textColor">
          Exercises
        </h2>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 pb-5 pr-10">
          {exercises.slice((curPage - 1) * 5, curPage * 5).map((exercise) => (
            <div key={exercise.id} className="cursor-pointer">
              <Exercise
                id={exercise.id}
                name={exercise.name}
                targetMuscle={exercise.musclegroup}
                description={exercise.description}
                gif={exercise.gif}
                setIdToEdit={setIdToEdit}
                setEditView={setEditExerciseView}
                handleDelete={handleDelete}
              />
            </div>
          ))}
          <div className="flex items-center justify-center min-w-64 max-w-64 min-h-64 h-[280px]">
            <button
              onClick={() => setAddExerciseView(true)}
              className="text-primary hover:text-secondary transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg transform"
            >
              <IoIosAddCircleOutline size={100} />
            </button>
          </div>
        </div>

        {exercises.length && (
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
  return (
    <div className="w-full">{loading ? <Loader /> : renderExercise()}</div>
  );
}
export default Exercises;
