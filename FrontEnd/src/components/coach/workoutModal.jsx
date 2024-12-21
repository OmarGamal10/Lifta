import Modal from "react-modal";
import Loader from "../Loader"; // Import your Loader component
import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/useHTTP";

function WorkoutModal({
  name,
  workoutId,
  isModalOpen,
  closeModal,
  setIsModalOpen,
}) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  const { get } = useHttp("http://localhost:3000");

  useEffect(() => {
    const loadWorkout = async () => {
      setLoading(true); // Show loader when API call starts
      try {
        const response = await get(`/workouts/${workoutId}/exercises`);
        setWorkout(response.data.exercises);
        console.log(response.data.exercises);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Hide loader after API call finishes
      }
    };

    loadWorkout();
  }, []); // Ensure useEffect depends on workoutId

  const renederModal = () => (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      className="fixed inset-0 flex items-center justify-center z-50"
      ariaHideApp={false}
      appElement={document.getElementById("root")}
    >
      <div className="relative max-w-3xl p-4 bg-textColor rounded-lg shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-2 right-1 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="p-4 max-h-[350px] overflow-y-auto">
          {workout &&
            workout.map((exercise) => (
              <div key={exercise.exercise_id}>
                <ExerciseListItem exercise={exercise} />
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="w-full">
      {loading ? <Loader /> : renederModal()} {/* Show Loader while loading */}
    </div>
  );
}

const ExerciseListItem = ({ exercise }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-shadow mb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
        <div className="flex gap-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600">Sets:</span>
            <span className="ml-1 text-sm font-bold text-gray-800">
              {exercise.sets}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600">Reps:</span>
            <span className="ml-1 text-sm font-bold text-gray-800">
              {exercise.reps}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;
