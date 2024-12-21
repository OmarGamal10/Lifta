import Modal from "react-modal";
import Loader from "../Loader"; // Import your Loader component
import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/useHTTP";

function MealModal({ name, mealId, isModalOpen, closeModal }) {
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  Modal.setAppElement("#root");
  const { get } = useHttp("http://localhost:3000");

  useEffect(() => {
    const loadMeal = async () => {
      setLoading(true); // Show loader when API call starts
      try {
        const response = await get(`/meals/${mealId}/ingredients`);
        setMeal(response.data.ingredients);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Hide loader after API call finishes
      }
    };

    loadMeal();
  }, []);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      className="fixed inset-0 flex items-center justify-center z-50"
      ariaHideApp={false}
      appElement={document.getElementById("root")}
    >
      <div className="relative max-w-3xl max-h-[400px] p-4 bg-textColor rounded-lg shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-2 right-1 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl pr-2 font-bold">{name}</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="p-4 max-h-[350px] overflow-y-auto">
            {meal?.map(
              (ingredient) => (
                console.log(ingredient),
                (
                  <div key={ingredient.ingredient_id}>
                    <IngredientListItem ingredient={ingredient} />
                  </div>
                )
              )
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

const IngredientListItem = ({ ingredient }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-shadow mb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg pr-3 font-semibold text-gray-800">
          {ingredient.name}
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600">Carbs:</span>
            <span className="ml-1 text-sm font-bold text-gray-800">
              {ingredient.carb}g
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600">Fat:</span>
            <span className="ml-1 text-sm font-bold text-gray-800">
              {ingredient.fat}g
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600">Protein:</span>
            <span className="ml-1 text-sm font-bold text-gray-800">
              {ingredient.protein}g
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600">Calories:</span>
            <span className="ml-1 text-sm font-bold text-gray-800">
              {ingredient.calories_serving}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealModal;
