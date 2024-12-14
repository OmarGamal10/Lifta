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

export function TraineeCurrentWrokout(probs) {
    const [ isDone, setIsDone ] = useState(false);

    function handleMarkAsDone() {
      setIsDone(true);
  }  
  
  const { get: httpGet, loading, error } = useHttp("http://localhost:3000");

  const [workout, setWorkout] = useState({});
  const [exercises, setExercises] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet(`/users/${probs.userId}/currentWorkout`, {
          headers: { "Cache-Control": "no-cache" },
        });
        setWorkout(response.data.workout[0]);
        const fetchedWorkout = response.data.workout[0];
        try {
          const response = await httpGet(`/workouts/${fetchedWorkout.workout_id}/exercises`, {
            headers: { "Cache-Control": "no-cache" },
          });
          setExercises(response.data.exercises);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
      
    };    

    fetchData();
  }, []);
  
  const objs = [
    {
      id:1,
      name: "Shoulder Press",
      description: "This exercise targets shoulders muscles, blah blah blah",
      sets: 3,
      reps: 12,
      muscle: "Shoulders",
    },
    {
      id:2,
      name: "Bench Press",
      description: "This exercise targets chest muscles, blah blah blah",
      sets: 4,
      reps: 15,
      muscle: "Chest",
    },
    {
      id:3,
      name: "Push Ups",
      description: "This exercise targets triceps muscles, blah blah blah",
      sets: 4,
      reps: 10,
      muscle: "Triceps",
    },
    {
      id:4,
      name: "Plank",
      description: "This exercise targets core muscles, blah blah blah",
      sets: 3,
      reps: 12,
      muscle: "Core",
    },
  ];

    
  return (
      <div className="text-textColor p-8 flex flex-col gap-6">
          <div>
              <h2 className="text-2xl font-medium">About this workout</h2>
              <p className="p-4">blah blah blah blah</p>
          </div>
          <div>
          <h2 className="text-2xl font-medium mb-4">
            Exercises
        </h2>
        {console.log(exercises)}
          {exercises.map((exercise) => (
            <TraineeExerciseCard
              key={exercise.exercise_id}
              name={exercise.name}
              description={exercise.description}
              sets={exercise.sets}
              reps={exercise.reps}
              muscle={exercise.musclegroup}
            />
          ))}
      </div>
      <button className={`px-4 py-2 border border-accent rounded-full w-fit flex gap-2 items-center justify-around
         ${isDone?"btn-disabled cursor-not-allowed bg-accent text-backGroundColor":"hover:bg-accent hover:text-backGroundColor"} `} onClick={handleMarkAsDone}>
          <span>{isDone?"Done":"Mark as done"}</span>
          <span
            className="pi pi-check"
          ></span>
        </button>
    </div>
  );
}
