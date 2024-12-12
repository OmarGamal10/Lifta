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

export function TraineeExerciseCard(probs) {
  const [open, setOpen] = React.useState(0);

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
            className={`border-b-0 px-4 rounded-lg ${
              open === 1
                ? "bg-secondary bg-opacity-50 focus:ring-accent focus:ring-2"
                : "hover:bg-[#5F3C68] hover:bg-opacity-50"
            }`}
          >
            <div className="flex justify-between w-full items-center">
              <span>{probs.name}</span>
              <span className="text-sm text-accent border border-accent rounded-full p-1 px-4">
                {probs.muscle}
              </span>
              <span
                className={`${
                  open === 1 ? "pi pi-angle-up" : "pi pi-angle-down"
                }`}
              ></span>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal px-4 flex flex-col gap-6">
            <p>
              {probs.description}
            </p>
            <div>
              <strong>Repetitions and sets: </strong>
              {probs.reps} &times; {probs.sets}
            </div>
            <button className="px-4 py-2 border border-accent rounded-full w-24 flex gap-2 items-center justify-around hover:bg-accent hover:text-backGroundColor">
              <span>GIF</span>
              <span
                className="pi pi-external-link text-sm"
              ></span>
            </button>
          </AccordionBody>
        </Accordion>
      </div>
    </>
  );
}
