import React, { useState, useEffect } from "react";
import Meal from "./mealCard";
import ErrorMessage from "../errorMsg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import Nodata from "../Nodata";
import { IoIosAddCircleOutline } from "react-icons/io";
import CreateMeal from "./createMeal";
import useHttp from "../../hooks/useHTTP";
import NoDataDashboard from "../Nodata";
import { use } from "react";
import Loader from "../Loader"; // Import your Loader component
import MealModal from "./mealModal";
import { Toaster, toast } from "sonner";

function Meals({ userId }) {
  const navigate = useNavigate();

  const { get, post, del, error, data } = useHttp("http://localhost:3000");
  const [curPage, setCurPage] = useState(1);
  const [meals, setMeals] = useState([]);
  const totalPages = Math.ceil(meals.length / 5);
  const [idToEdit, setIdToEdit] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState({
    name: "",
    id: "",
  });

  /////////////////////////////////////////
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);

        const response = await get(`/users/${userId}/meals`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response: ", response);

        const fetchedMeals = Array.isArray(response.data.meals)
          ? response.data.meals
          : [];
        setMeals(fetchedMeals);

        if (fetchedMeals.length === 0) {
          setCurPage(1);
        }
      } catch (err) {
        toast.error("Error Loading Meals", {
          style: {
            background: "white",
            color: "red",
          },
        });

        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);
  /////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      const response = await del(
        "/meals",
        {
          meal_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMeals((prev) => prev.filter((meal) => meal.id !== id));
      toast.success(" Exercise Deleted Succefully", {
        style: {
          background: "white",
          color: "green",
        },
      });
    } catch (err) {
      if (err.response?.data?.error?.code === "23503")
        toast.error("Can't Delete Meal Assigned to a Trainee", {
          style: {
            background: "white",
            color: "red",
          },
        });
      else
        toast.error("Can't Delete Meal", {
          style: {
            background: "white",
            color: "red",
          },
        });
    }
  };

  const handlePreviousPage = () => {
    setCurPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const openModal = (mealId, name) => {
    setSelectedMeal({ id: mealId, name: name });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal({
      name: "",
      id: "",
    });
  };

  const renderMeals = () => (
    <>
      {isModalOpen && (
        <MealModal
          isModalOpen={isModalOpen}
          mealId={selectedMeal.id}
          name={selectedMeal.name}
          closeModal={closeModal}
        />
      )}
      <Toaster />

      <div
        className={`w-full flex flex-col min-h-screen justify-center px-12 pb-3 
         ${isModalOpen ? "opacity-50" : ""} } `}
      >
        <h2 className="py-8 text-3xl self-start lg:text-4xl font-bold text-textColor">
          Meals
        </h2>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 pb-5 pr-10">
          {meals.slice((curPage - 1) * 5, curPage * 5).map((meal) => (
            <div
              key={meal.id}
              onClick={() => openModal(meal.id, meal.name)}
              className="cursor-pointer"
            >
              <Meal
                id={meal.id}
                name={meal.name}
                photo={meal.picture}
                facts={{
                  carb: meal.carb,
                  protein: meal.protein,
                  fat: meal.fat,
                  calories: meal.calories,
                }}
                setIdToEdit={setIdToEdit}
                handleDelete={handleDelete}
              />
            </div>
          ))}
          <div className="flex items-center justify-center min-w-64 max-w-64 min-h-64 h-[280px]">
            <button
              onClick={() => navigate("/createMeal")}
              className="text-primary hover:text-secondary transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg transform"
            >
              <IoIosAddCircleOutline size={100} />
            </button>
          </div>
        </div>

        {meals.length && (
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

  return <div className="w-full">{loading ? <Loader /> : renderMeals()}</div>;
}
export default Meals;
