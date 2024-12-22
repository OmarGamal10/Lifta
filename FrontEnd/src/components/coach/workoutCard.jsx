import { React } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import "../../style/output.css";

function Workout({ id, name, note, view, handleDelete }) {
  return (
    <div
      className={`
      border-2 flex flex-col text-center hover:border-primary 
      hover:cursor-pointer bg-backGroundColor border-secondary 
      w-full min-w-64 max-w-64 rounded-2xl p-5
      ${view === "display" ? "h-[200px]" : "h-[280px]"}
      flex flex-col transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg transform
    `}
    >
      <h3 className="text-textColor font-bold text-2xl mb-5">{name}</h3>
      <p className="text-textColor mb-8 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-backGroundColor hover:scrollbar-thumb-secondary/50">
        {note}
      </p>
      {view === "display" ? (
        ""
      ) : (
        <div className="flex flex-row justify-center gap-16">
          <button
            className="border text-secondary border-secondary rounded-xl p-3 hover:bg-secondary hover:text-backGroundColor transform transition-transform duration-300 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(id);
            }}
          >
            <FaRegTrashAlt size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Workout;
