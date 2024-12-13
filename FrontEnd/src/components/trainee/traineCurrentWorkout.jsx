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
  
  const objs = [
    {
      name: "Shoulder Press",
      description: "This exercise targets shoulders muscles, blah blah blah",
      sets: 3,
      reps: 12,
      muscle: "Shoulders",
    },
    {
      name: "Bench Press",
      description: "This exercise targets chest muscles, blah blah blah",
      sets: 4,
      reps: 15,
      muscle: "Chest",
    },
    {
      name: "Push Ups",
      description: "This exercise targets triceps muscles, blah blah blah",
      sets: 4,
      reps: 10,
      muscle: "Triceps",
    },
    {
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
          {objs.map((exercise) => (
            <TraineeExerciseCard
              name={exercise.name}
              description={exercise.description}
              sets={exercise.sets}
              reps={exercise.reps}
              muscle={exercise.muscle}
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
