/* eslint-disable no-unused-vars */
//  import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../output.css"; // Adjust the path as needed
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import useHttp from "../../hooks/useHTTP";
import React from "react";
import "primeicons/primeicons.css";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Card, Typography } from "@material-tailwind/react";

const tableHead = ["Ingredient", "Quantity"];

export function TraineeMealCard(probs) {
  const [open, setOpen] = React.useState(0);
  const [isDone, setIsDone] = useState(false);

  const { get: httpGet, post } = useHttp("http://localhost:3000");

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet(
          `/users/${probs.userId}/currentMeals/${probs.mealId}/ingredients`,
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        setIngredients(response.data.ingredients);
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await httpGet(
          `/users/${probs.userId}/currentMeals/${probs.mealId}/status/${probs.type}`,
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        if (
          response.data.isDone.rows.length > 0 &&
          response.data.isDone.rows[0].isDone == true
        ) {
          setIsDone(true);
          probs.incrementDoneCount();
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  async function handleMarkAsDone() {
    setIsDone(true);
    probs.incrementDoneCount();
    try {
      const response = await post(`/users/${probs.userId}/currentMeals`, {
        traineeId: probs.userId,
        mealId: probs.mealId,
        type: probs.type,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <>
      <div className="text-textColor w-[75vw]">
        <Accordion
          open={open === 1}
          className="mb-2 rounded-lg border border-secondary"
        >
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className={`border-b-0 px-4 rounded-lg overflow-hidden ${
              open === 1
                ? "bg-secondary bg-opacity-50 focus:ring-accent focus:ring-2"
                : "hover:bg-[#5F3C68] hover:bg-opacity-50"
            }`}
          >
            <div className="flex justify-between w-full items-center">
              <div className="flex gap-4">
                <span>{probs.name}</span>
                <span className="text-xs text-accent border border-accent rounded-lg flex items-center px-2">
                  {probs.calories} calories
                </span>
              </div>
              <span
                className={`${
                  open === 1 ? "pi pi-angle-up" : "pi pi-angle-down"
                }`}
              ></span>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal px-4 flex flex-col gap-6">
            {/* <img src={`${probs.picture}`} alt="" /> */}
            <div>
              <h3 className="text-lg font-medium">Ingredients</h3>
              <Card className="h-fit w-[50%] px-4">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {tableHead.map((head) => (
                        <th key={head} className="border-b border-accent p-4">
                          <Typography
                            variant="small"
                            className="font-medium leading-none"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map(
                      ({ ingredient_id, name, quantity }, index) => {
                        const isLast = index === ingredients.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-accent";
                        return (
                          <tr key={ingredient_id}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {quantity}
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </Card>
            </div>

            <div>
              <strong>Protein: </strong>
              {probs.protein} gm
            </div>
            <div>
              <strong>Carbs: </strong>
              {probs.carbs} gm
            </div>
            <div>
              <strong>Fats: </strong>
              {probs.fats} gm
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
              <span>{isDone ? "Done" : "Mark as done"}</span>
              <span className="pi pi-check"></span>
            </button>
          </AccordionBody>
        </Accordion>
      </div>
    </>
  );
}
