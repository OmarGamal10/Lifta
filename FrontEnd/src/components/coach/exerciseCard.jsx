import { React } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

function Exercise({
  id,
  name,
  description,
  targetMuscle,
  gif,
  usage = false,
  setIdToEdit,
  setEditView,
  handleDelete,
}) {
  const handleEdit = (e) => {
    e.stopPropagation();
    setIdToEdit(id);
    setEditView(true);
  };
  return (
    <div
      className="border-2 flex flex-col text-center hover:border-primary hover:cursor-pointer bg-backGroundColor border-secondary w-full min-w-64 max-w-64 min-h-64 h-[280px] rounded-2xl p-5"
      onClick={
        usage === "addWorkout" ? undefined : () => window.open(gif, "_blank")
      }
    >
      {/* Header */}
      <div className="flex-none">
        <h3 className="text-textColor font-bold text-2xl">{name}</h3>
        <h3 className="text-textColor font-bold text-2xl mb-5">
          {targetMuscle}
        </h3>
      </div>

      {/* Description with flex-grow to push buttons down */}
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-backGroundColor hover:scrollbar-thumb-secondary/50">
        <p className="text-textColor">{description}</p>
      </div>

      {/* Buttons fixed at bottom */}
      {usage !== "addWorkout" && (
        <div className="flex-none flex flex-row justify-center gap-16 mt-4">
          <button
            className="border text-secondary border-secondary rounded-xl p-3 hover:bg-secondary hover:text-backGroundColor"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(id);
            }}
          >
            <FaRegTrashAlt size={20} />
          </button>
          <button
            className="border text-secondary border-secondary rounded-xl p-3 hover:bg-secondary hover:text-backGroundColor"
            onClick={handleEdit}
          >
            <CiEdit size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Exercise;
