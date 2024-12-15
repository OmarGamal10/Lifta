import { React } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

function Exersize({ name, description, targetMuscle, gif, usage = false }) {
  return (
    <div
      className="border-2 flex flex-col  text-center hover:border-primary hover:cursor-pointer bg-backGroundColor border-secondary w-full min-w-64 max-w-64 min-h-64 rounded-2xl p-5"
      onClick={
        usage === "addWorkout" ? undefined : () => window.open(gif, "_blank")
      }
    >
      <h3 className="text-textColor font-bold text-2xl mb">{name}</h3>
      <h3 className="text-textColor font-bold text-2xl mb-5">{targetMuscle}</h3>
      <p
        className="text-textColor mb-8 max-h-32 overflow-y-auto 
        scrollbar-thin
        scrollbar-thumb-primary/30 
         scrollbar-track-backGroundColor 
        hover:scrollbar-thumb-secondary/50"
      >
        {description}
      </p>
      {usage === "addWorkout" ? (
        ""
      ) : (
        <div className="flex flex-row justify-center gap-16">
          <button className="border text-secondary border-secondary rounded-xl p-3 hover:bg-secondary hover:text-backGroundColor">
            <FaRegTrashAlt size={20} />
          </button>
          <button className="border text-secondary border-secondary rounded-xl p-3 hover:bg-secondary hover:text-backGroundColor">
            <CiEdit size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Exersize;
