import React, { useState } from "react";
import Exercise from "./exerciseCard";
import ErrorMessage from "../errorMsg";
import exercises from "./testData";

function CreateWorkout() {
  const [choosedExercises, updateChoosedExercises] = useState([]);
  const [curSelectedExercise, updateCurSelectedExercise] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [curExerciseInfo, setCurExerciseInfo] = useState({
    sets: "",
    reps: "",
  });
  const [workoutError, setWorkoutError] = useState("");
  const [isExerciseListOpen, setIsExerciseListOpen] = useState(false);

  const totalPages = Math.ceil(exercises.length / 6);

  const handleSelectExercise = (e, key) => {
    setWorkoutError("");
    e.preventDefault();

    if (choosedExercises.some((exercise) => exercise.id === key)) {
      setWorkoutError("This exercise is already in your workout.");
      return;
    }

    updateCurSelectedExercise(
      exercises.find((exercise) => exercise.id === key)
    );

    setCurExerciseInfo({ sets: "", reps: "" });
  };

  const handleRemoveExercise = (exerciseId) => {
    updateChoosedExercises(
      choosedExercises.filter((exercise) => exercise.id !== exerciseId)
    );
  };

  const handlePreviousPage = () => {
    setWorkoutError("");
    setCurPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setWorkoutError("");
    setCurPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const handleAddWorkout = () => {
    if (choosedExercises.length === 0) {
      setWorkoutError(
        "Please select at least one exercise before adding a workout."
      );
      return;
    }
    console.log("Workout exercises:", choosedExercises);
    setWorkoutError("");
  };

  const toggleExerciseList = (e) => {
    e.stopPropagation();
    setIsExerciseListOpen(!isExerciseListOpen);
  };

  const handlePageClick = (e) => {
    if (
      isExerciseListOpen &&
      !e.target.closest(".exercise-list-container") &&
      !e.target.closest(".exercise-list-toggle")
    ) {
      setIsExerciseListOpen(false);
    }
  };

  return (
    <div
      className="bg-textColor flex min-h-screen justify-center px-12 py-3 relative"
      onClick={handlePageClick}
    >
      <div className="w-3/5 flex flex-col relative ">
        <div className="w-full flex flex-row flex-wrap flex-1 justify-between pb-16 pr-10">
          {exercises.slice((curPage - 1) * 6, curPage * 6).map((exercise) => (
            <div
              key={exercise.id}
              onClick={(e) => handleSelectExercise(e, exercise.id)}
              className={
                choosedExercises.some((chosen) => chosen.id === exercise.id)
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            >
              <Exercise
                name={exercise.name}
                targetMuscle={exercise.targetMuscle}
                description={exercise.description}
                usage={"addWorkout"}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-30 right-0 flex justify-center items-center py-2 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={curPage === 1}
            className={`px-4 py-2 rounded-xl border ${
              curPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
            }`}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {curPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={curPage === totalPages}
            className={`px-8 py-2 rounded-xl border ${
              curPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="border-l border-primary max-h-96"></div>

      <div className="w-2/5 px-10 relative">
        <button
          onClick={toggleExerciseList}
          className=" w-full bg-secondary text-textColor text-sm rounded-xl py-3 mb-4 flex justify-between items-center px-3"
        >
          <span>Chosen Exercises ({choosedExercises.length})</span>
          <span>{isExerciseListOpen ? "▲" : "▼"}</span>
        </button>

        {isExerciseListOpen && (
          <div className=" absolute z-50 w-5/6 max-h-64 overflow-y-auto bg-white border rounded-lg shadow-lg bg-textColor">
            {choosedExercises.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No exercises selected
              </div>
            ) : (
              choosedExercises.map((exercise) => {
                const fullExercise = exercises.find(
                  (e) => e.id === exercise.id
                );
                return (
                  <div
                    key={exercise.id}
                    className="flex justify-between items-center p-3 border-b hover:bg-gray-100"
                  >
                    <div>
                      <p className="font-medium">{fullExercise.name}</p>
                      <p className="text-sm text-gray-600">
                        Sets: {exercise.sets}, Reps: {exercise.reps}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveExercise(exercise.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl"
                    >
                      ×
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {curSelectedExercise ? (
          <AddExerciseToWorkout
            formData={curExerciseInfo}
            setFormData={setCurExerciseInfo}
            selected={curSelectedExercise}
            updateCurSelected={updateCurSelectedExercise}
            choosed={choosedExercises}
            addOne={updateChoosedExercises}
            clearWorkoutError={() => setWorkoutError("")}
          />
        ) : (
          ""
        )}
      </div>

      <div className="fixed bottom-4 right-64 z-50">
        <button
          className="bg-secondary text-textColor text-sm rounded-xl py-4 px-10 border hover:border-secondary hover:bg-textColor hover:text-secondary"
          onClick={handleAddWorkout}
        >
          Add Workout
        </button>
      </div>

      <div className="fixed bottom-4 left-4 z-50">
        {workoutError && <ErrorMessage error={workoutError} />}
      </div>
    </div>
  );
}

function AddExerciseToWorkout({
  formData,
  setFormData,
  selected,
  addOne,
  choosed,
  updateCurSelected,
  clearWorkoutError,
}) {
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 2) return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    clearWorkoutError();

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
    addOne([
      ...choosed,
      { id: selected.id, sets: formData.sets, reps: formData.reps },
    ]);
    setFormData({ sets: "", reps: "" });
    updateCurSelected(null);
  };

  return (
    <div className="w-full flex-col justify-center text-center">
      <div className="flex justify-center mb-5">
        <Exercise
          name={selected.name}
          targetMuscle={selected.targetMuscle}
          description={selected.description}
          gif={selected.gif}
          usage={"addWorkout"}
        />
      </div>
      <form action="">
        <div className="flex flex-row justify-center gap-x-20">
          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Sets
            </h6>
            <input
              id="sets-input"
              name="sets"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="Sets"
              maxLength="2"
              onChange={handleChange}
              value={formData.sets}
              autoComplete="off"
            />
            {errors.sets && <ErrorMessage error={errors.sets} />}
          </div>

          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Reps
            </h6>
            <input
              id="sets-input"
              name="reps"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="Reps"
              maxLength="2"
              onChange={handleChange}
              value={formData.reps}
              autoComplete="off"
            />
            {errors.reps && <ErrorMessage error={errors.reps} />}
          </div>
        </div>
        <div className="flex flex-row mt-10 justify-center gap-x-48">
          <button
            className=" w-1/4 bg-secondary text-textColor text-sm px-3 rounded-xl  py-4 flex flex-row justify-center gap-2 align-middle border hover:border-secondary hover:bg-textColor hover:text-secondary"
            onClick={(e) => {
              e.preventDefault();
              setFormData({ sets: "", reps: "" });
              updateCurSelected(null);
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className=" w-1/4 bg-secondary text-textColor text-sm px-3 rounded-xl  py-4 flex flex-row justify-center gap-2 align-middle border hover:border-secondary hover:bg-textColor hover:text-secondary"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateWorkout;
