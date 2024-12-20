/* eslint-disable no-unused-vars */
//  import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../output.css"; // Adjust the path as needed
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import useHttp from "../../hooks/useHTTP";
import React from "react";
import "primeicons/primeicons.css";
import { TraineeExerciseCard } from "./traineeExerciseCard";
import NoDataDashboard from "../Nodata";

export function TraineeCurrentWrokout(probs) {
  const [isDone, setIsDone] = useState(false);

  const { get: httpGet, post, del } = useHttp("http://localhost:3000");

  const [workout, setWorkout] = useState({});
  const [exercises, setExercises] = useState([]);

  async function handleMarkAsDone() {
    if (!isDone) {
      setIsDone(true);
      try {
        const response = await post(`/users/${probs.userId}/currentWorkout`, {
          traineeId: probs.userId,
          workoutId: workout.workout_id,
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    } else {
      setIsDone(false);
      try {
        const response = await del(
          `/users/${probs.userId}/currentWorkout/removeDoneWorkout`,
          {
            data: {},
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(probs.userId);
        const response = await httpGet(
          `/users/${probs.userId}/currentWorkout`,
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        if (response.data.workout.length) {
          setWorkout(response.data.workout[0]);
          const fetchedWorkout = response.data.workout[0];
          try {
            const response = await httpGet(
              `/workouts/${fetchedWorkout.workout_id}/exercises`,
              {
                headers: { "Cache-Control": "no-cache" },
              }
            );
            setExercises(response.data.exercises);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await httpGet(
          `/users/${probs.userId}/currentWorkout/status`,
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        if (
          response.data.isDone.rows.length > 0 &&
          response.data.isDone.rows[0].isDone == true
        ) {
          setIsDone(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (workout.workout_id) {
    return (
      <div className="text-textColor p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-medium">About this workout</h2>
          <p className="p-4">{workout._note}</p>
        </div>
        <div>
          <h2 className="text-2xl font-medium mb-4">Exercises</h2>
          {exercises.map((exercise) => (
            <TraineeExerciseCard
              key={exercise.exercise_id}
              name={exercise.name}
              description={exercise.description}
              sets={exercise.sets}
              reps={exercise.reps}
              muscle={exercise.musclegroup}
              gif={exercise.gif}
            />
          ))}
        </div>
        <button
          className={`px-4 py-2 border border-accent rounded-full w-fit flex gap-2 items-center justify-around
          ${
            isDone
              ? "btn-disabled cursor-not-allowed bg-accent text-backGroundColor"
              : "hover:bg-accent hover:text-backGroundColor"
          } `}
          onClick={handleMarkAsDone}
        >
          <span>{isDone ? "Mark as undone" : "Mark as done"}</span>
          {!isDone ? <span className="pi pi-check"></span> : <></>}
        </button>
      </div>
    );
  }

  return (
    <NoDataDashboard header="No Workouts today !!" />
  );
}
