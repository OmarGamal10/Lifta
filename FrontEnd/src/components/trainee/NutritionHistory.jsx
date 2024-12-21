/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import useHttp from "../../hooks/useHTTP";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import { jwtDecode } from "jwt-decode";
const NutritionHistory = ({ userId, view = true, isEditable }) => {
  const [openDate, setOpenDate] = useState(null);
  const [openMeal, setOpenMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const { get, loading, error } = useHttp("http://localhost:3000");

  const decoded = jwtDecode(getTokenFromCookies());
  
  const fetchMeals = useCallback(async () => {
    try {
      let response;
      if (isEditable) response = await get(`/meals/log/${userId}`);
      else response = await get(`/meals/log/${userId}/trainer/${decoded.user_id}`); //trainerId da el trainer el by3ml visit ya magdy

      const mealsArray = Object.entries(response.data.meals).map(
        ([date, dayMeals]) => ({
          date,
          meals: dayMeals,
        })
      );
      setMeals(mealsArray);
      console.log(mealsArray);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const handleDateOpen = (value) =>
    setOpenDate(openDate === value ? null : value);
  const handleMealOpen = (value) =>
    setOpenMeal(openMeal === value ? null : value);

  return (
    <div className="w-full max-w-[95vw] mx-auto p-6 text-textColor">
      <h2 className="text-2xl font-medium mb-8">Nutrition History</h2>
      <div className="space-y-4">
        {meals.map((dayMeal) => {
          const allMealsCompleted = dayMeal.meals.every((meal) => meal.isDone);

          return (
            <Accordion
              key={dayMeal.date}
              open={openDate === dayMeal.date}
              className="w-full border border-secondary rounded-lg overflow-hidden"
            >
              <AccordionHeader
                onClick={() => handleDateOpen(dayMeal.date)}
                className="w-full px-6 py-4 hover:bg-secondary/20"
              >
                <div className="flex justify-between w-full items-center">
                  <span className="text-lg">
                    {new Date(dayMeal.date).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-8">
                    <span>{dayMeal.meals[0].nutritionist_name}</span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm text-accent bg-secondary/20 `}
                    >
                      {allMealsCompleted ? "Completed" : "Incomplete"}
                    </span>
                  </div>
                </div>
              </AccordionHeader>
              <AccordionBody className="px-6 py-4">
                {dayMeal.meals.map((meal) => (
                  <Accordion
                    key={meal.meal_id + meal.type}
                    open={openMeal === meal.meal_id + meal.type}
                    className="mb-4 border border-secondary/20 rounded-lg"
                  >
                    <AccordionHeader
                      onClick={() => handleMealOpen(meal.meal_id + meal.type)}
                      className="px-4 py-2 hover:bg-secondary/10"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <h3 className="text-lg font-medium text-accent">
                            {meal.type}
                          </h3>
                          <p className="text-sm text-accent rounded-full bg-secondary/20 px-2 py-1">
                            {meal.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-accent">
                            {meal.calories} kcal
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm text-accent bg-secondary/20`}
                          >
                            {meal.isDone ? "Done" : "Not Done"}
                          </span>
                        </div>
                      </div>
                    </AccordionHeader>
                    <AccordionBody className="px-4 py-2">
                      <div className="flex gap-4 text-sm mb-4">
                        <span className="px-3 py-1 text-accent font-semibold rounded-full bg-secondary/20">
                          Protein: {meal.protein}g
                        </span>
                        <span className="px-3 py-1 text-accent font-semibold rounded-full bg-secondary/20">
                          Carbs: {meal.carbs}g
                        </span>
                        <span className="px-3 py-1 text-accent font-semibold rounded-full bg-secondary/20">
                          Fats: {meal.fats}g
                        </span>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2 text-accent">
                          Ingredients:
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-400">
                          {meal.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    </AccordionBody>
                  </Accordion>
                ))}
              </AccordionBody>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionHistory;
