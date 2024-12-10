/* eslint-disable no-unused-vars */
import { React } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

function Ingredient({ name, fat, protien, carb, calories }) {
  return (
    <div className="border-2 flex flex-col text-center bg-backGroundColor border-secondary w-full max-w-64 bord rounded-2xl p-6">
      <h3 className=" text-textColor font-bold text-2xl mb-10">{name}</h3>
      <div className="flex flex-row justify-between mb-5">
        <div>
          <h6 className="text-textColor text-xl">Carbs</h6>
          <p className="text-textColor text-xl">{carb}g</p>
        </div>
        <div>
          <h6 className="text-textColor text-xl">Protien</h6>
          <p className="text-textColor text-xl">{protien}g</p>
        </div>
        <div>
          <h6 className="text-textColor text-xl">Fats</h6>
          <p className="text-textColor text-xl">{fat}g</p>
        </div>
      </div>
      <div className="flex flex-col mb-5">
        <h6 className="text-textColor text-xl ">Calories/100g</h6>
        <p className="text-textColor text-xl">{calories}kcals</p>
      </div>
      <div className="flex flex-row justify-center gap-24">
        <button className="border text-secondary border-secondary rounded-xl p-3 hover:bg-secondary hover:text-backGroundColor">
          <FaRegTrashAlt size={20} />
        </button>
        <button className="border text-secondary border-secondary rounded-xl p-3 hover:bg-secondary hover:text-backGroundColor">
          <CiEdit size={20} />
        </button>
      </div>
    </div>
  );
}
export default Ingredient;
