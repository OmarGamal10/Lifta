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
import NoDataDashboard from "../Nodata";

export function TraineeCurrentMeals(probs) {
  const [knobValue, setKnobValue] = useState(0);

  const { get: httpGet, loading, error } = useHttp("http://localhost:3000");

  const [meals, setMeals] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet(`/users/${probs.userId}/currentMeals`, {
          headers: { "Cache-Control": "no-cache" },
        });
        setMeals(response.data.meals);
      } catch (err) {
        console.log(err);
      }
      
    };    

    fetchData();
  }, []);

  function incrementDoneCount() {
    let newValue = knobValue + Math.ceil((1 / meals.length) * 100);
    if (newValue > 100) {
      newValue = 100;
    }
    setKnobValue(newValue);
  }

  if (meals.length > 0) {
    return (
      <div className="text-textColor p-8 flex flex-col gap-6">
        {meals.map((meal) => (
          <div key={[meal.meal_id, meal.type].join('-')}>
            <h2 className="text-2xl font-medium mb-4">{meal.type}</h2>
            <TraineeMealCard
              key={[meal.meal_id, meal.type].join('-')}
              mealId={meal.meal_id}
              name={meal.name}
              calories={meal.calories}
              fats={meal.fat}
              carbs={meal.carb}
              protein={meal.protein}
              incrementDoneCount={incrementDoneCount}
              userId={probs.userId}
              picture={meal.picture}
              type={meal.type}
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
 

  return (
    <NoDataDashboard header="No Meals today !!" />
  );
}
