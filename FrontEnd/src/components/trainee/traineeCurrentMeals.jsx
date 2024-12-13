/* eslint-disable no-unused-vars */
//  import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../output.css"; // Adjust the path as needed
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import useHttp from "../../hooks/useHTTP";
import React from "react";
import "primeicons/primeicons.css";
import { TraineeMealCard } from "./traineeMealCard";
import { Knob } from "primereact/knob";

export function TraineeCurrentMeals() {
  const [knobValue, setKnobValue] = useState(0);
  //   const [doneCount, setDoneCount] = useState(0);

  const objs = [
    {
      id: 1,
      name: "Pizza",
      type: "Breakfast",
      calories: 320,
      fats: 12,
      protein: 6,
      carbs: 50,
    },
    {
      id: 2,
      name: "Pasta",
      type: "Lunch",
      calories: 320,
      fats: 12,
      protein: 6,
      carbs: 50,
    },
    {
      id: 3,
      name: "Blah",
      type: "Dinner",
      calories: 320,
      fats: 12,
      protein: 6,
      carbs: 50,
    },
    {
      id: 4,
      name: "Blahblah",
      type: "Snack",
      calories: 320,
      fats: 12,
      protein: 6,
      carbs: 50,
    },
  ];

  function incrementDoneCount() {
    setKnobValue(knobValue + (1 / objs.length) * 100);
  }

  return (
    <div className="text-textColor p-8 flex flex-col gap-6">
      {objs.map((meal) => (
        <div key={meal.id}>
          <h2 className="text-2xl font-medium mb-4">{meal.type}</h2>
          <TraineeMealCard
            key={meal.id}
            name={meal.name}
            calories={meal.calories}
            fats={meal.fats}
            carbs={meal.carbs}
            protein={meal.protein}
            incrementDoneCount={incrementDoneCount}
          />
        </div>
      ))}
      <div className="w-[75vw] flex justify-center">
        <Knob
          value={knobValue}
          valueTemplate={"{value}%"}
          readOnly
          valueColor="#B076A9"
          rangeColor="#E3E5EF"
                  textColor="#E3E5EF"
                  size={320}
        />
      </div>
    </div>
  );
}
