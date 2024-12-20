import React, { useState, useEffect } from "react";
import Exercise from "./exerciseCard";
import ErrorMessage from "../errorMsg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import Nodata from "../Nodata";
import { IoIosAddCircleOutline } from "react-icons/io";
import IngredientsForm from "./IngredientForm";
import useHttp from "../../hooks/useHTTP";
import NoDataDashboard from "../Nodata";
import Ingredient from "./ingredientCard";
import { use } from "react";
import Loader from "../Loader"; // Import your Loader component

function Ingredients({ userId }) {
  const { get, post, del, error, data } = useHttp("http://localhost:3000");
  const [curPage, setCurPage] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const totalPages = Math.ceil(ingredients.length / 5);
  const [addIngredientsView, setAddIngredientsView] = useState(false);
  const [editIngredientsView, setEditIngredientsView] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  /////////////////////////////////////////
  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      try {
        const response = await get(`/users/${userId}/ingredients`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response: ", response);

        const fetchedIngredients = Array.isArray(response.data.ingredients)
          ? response.data.ingredients
          : [];
        setIngredients(fetchedIngredients);

        if (fetchedIngredients.length === 0) {
          setCurPage(1);
        }
      } catch (err) {
        console.error("Error fetching ingredients:", err);
        setIngredients([]);
      } finally {
        setLoading(false); // Hide loader after API call finishes
      }
    };

    fetchIngredients();
  }, []);
  /////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await del(
        "/ingredients",
        {
          ingredient_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setIngredients((prev) =>
        prev.filter((ingredient) => ingredient.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handlePreviousPage = () => {
    setCurPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };
  const rendeIngredients = () => {
    return (
      <>
        {editIngredientsView && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <IngredientsForm
              setView={setEditIngredientsView}
              edit={true}
              idToEdit={idToEdit}
              setIngredients={setIngredients}
            />
          </div>
        )}
        {addIngredientsView && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <IngredientsForm
              setIngredients={setIngredients}
              setView={setAddIngredientsView}
              userId={userId}
            />
          </div>
        )}
        <div
          className={`w-full flex flex-col min-h-screen justify-center px-12 py-3 ${
            addIngredientsView || editIngredientsView ? "opacity-50" : ""
          } `}
        >
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 pb-5 pr-10">
            {ingredients
              .slice((curPage - 1) * 5, curPage * 5)
              .map((ingredient) => (
                <div key={ingredient.id} className="cursor-pointer">
                  <Ingredient
                    id={ingredient.id}
                    name={ingredient.name}
                    fat={ingredient.fat}
                    protein={ingredient.protein}
                    carb={ingredient.carb}
                    calories={ingredient.calories}
                    setIdToEdit={setIdToEdit}
                    setEditView={setEditIngredientsView}
                    handleDelete={handleDelete}
                  />
                </div>
              ))}
            <div className="flex items-center justify-center min-w-64 max-w-64 min-h-64 h-[280px]">
              <button
                onClick={() => setAddIngredientsView(true)}
                className="text-primary hover:text-secondary transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg transform"
              >
                <IoIosAddCircleOutline size={100} />
              </button>
            </div>
          </div>

          {ingredients.length && (
            <div className=" flex justify-center items-center py-2 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={curPage === 1}
                className={`px-4 py-2 rounded-xl border ${
                  curPage === 1
                    ? " text-textColor cursor-not-allowed"
                    : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-textColor">
                Page {curPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={curPage === totalPages}
                className={`px-8 py-2 rounded-xl border ${
                  curPage === totalPages
                    ? "text-textColor cursor-not-allowed"
                    : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="w-full">{loading ? <Loader /> : rendeIngredients()}</div>
  );
}
export default Ingredients;
