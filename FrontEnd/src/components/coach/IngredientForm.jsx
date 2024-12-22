import { useState, useEffect } from "react";
import "../output.css"; // Adjust the path as needed
import ErrorMessage from "../errorMsg"; // Import the ErrorMessage component
import { jwtDecode } from "jwt-decode";
import { BsUpload } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import { Toaster, toast } from "sonner";

import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHTTP";

function Ingredient({
  userId,
  setView,
  setIngredients,
  edit = false,
  idToEdit = 1,
}) {
  const navigate = useNavigate();
  const { post, get, patch, loading, error, data } = useHttp(
    "http://localhost:3000"
  );

  const [formData, setFormData] = useState({
    name: "",
    protein: "",
    carb: "",
    fat: "",
    calories: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name == "protein" || name == "carb" || name == "fat") &&
      value.length > 2
    )
      return;
    if (name == "calories" && value.length > 3) return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (value.trim() !== "" || value === "0") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };
  useEffect(() => {
    if (edit) {
      const fetchIngredient = async () => {
        try {
          const response = await get(`/ingredients/${idToEdit}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setFormData(() => ({
            ...response.data.ingredient,
          }));
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      };
      fetchIngredient();
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] === "" || formData[key] === null) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(userId);
    if (!edit) {
      try {
        const response = await post(
          "/ingredients",
          {
            ...formData,
            trainer_id: userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setIngredients((prev) => [
          ...prev,
          {
            id: response.data.ingredient.ingredient_id,
            fat: response.data.ingredient.fat,
            protein: response.data.ingredient.protein,
            carb: response.data.ingredient.carb,
            calories: response.data.ingredient.calories_serving,
            name: response.data.ingredient.name,
          },
        ]);
        toast.success("Ingredient Added Successfully", {
          style: {
            background: "white",
            color: "green",
          },
        });
        setView(false);
      } catch (err) {
        console.log(err);
        toast.error("Error adding exercise", {
          style: {
            background: "white",
            color: "red",
          },
        });
      }
    } else {
      try {
        const response = await patch(
          `/ingredients/${idToEdit}`,
          {
            ...formData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setIngredients((prev) =>
          prev.map((ingredient) =>
            ingredient.id === idToEdit
              ? {
                  id: response.data.ingredient[0].ingredient_id,
                  fat: response.data.ingredient[0].fat,
                  protein: response.data.ingredient[0].protein,
                  carb: response.data.ingredient[0].carb,
                  calories: response.data.ingredient[0].calories_serving,
                  name: response.data.ingredient[0].name,
                }
              : ingredient
          )
        );
        toast.success("Ingredient Updated Successfully", {
          style: {
            background: "white",
            color: "green",
          },
        });
        setView(false);
      } catch (err) {
        console.log(err);
        toast.error("Error updating ingredient", {
          style: {
            background: "white",
            color: "red",
          },
        });
      }
    }
  };

  const handleClose = (e) => {
    setFormData({
      name: "",
      protein: "",
      carb: "",
      fat: "",
      calories: "",
    });
    setView(false);
  };

  return (
    <div
      name="ingForm"
      className="border-2 border-solid bg-textColor border-secondary flex flex-col items-center justify-center p-8  max-w-lg rounded-3xl relative"
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors duration-200"
      >
        <BsX size={30} />
      </button>
      <h1 className="text-3xl font-bold">{edit ? "Edit" : "New"} Ingredient</h1>
      <form
        onSubmit={handleSubmit}
        className=" py-6 px-10 w-full"
        autoComplete="off" // Disable autocomplete globally
      >
        <div className=" mb-6">
          <h6 className="text-xs text-left text-backGroundColor mb-2">Name</h6>
          <input
            id="name-input"
            name="name"
            className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
            type="text"
            placeholder="Enter Name"
            maxLength="30"
            onChange={handleChange}
            value={formData.name}
            autoComplete="off"
          />
          {errors.name && <ErrorMessage error={errors.name} />}
        </div>
        <div className="flex flex-row justify-between mb-6">
          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Protiens
            </h6>
            <input
              id="protiens-input"
              name="protein"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="Proteins"
              maxLength="2"
              onChange={handleChange}
              value={formData.protein}
              autoComplete="off"
            />
            {errors.protein && <ErrorMessage error={errors.protein} />}
          </div>
          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Carbs
            </h6>
            <input
              id="carbs-input"
              name="carb"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="Carbs"
              maxLength="2"
              onChange={handleChange}
              value={formData.carb}
              autoComplete="off"
            />
            {errors.carb && <ErrorMessage error={errors.carb} />}
          </div>
          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Fats
            </h6>
            <input
              id="fats-input"
              name="fat"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="fats"
              maxLength="2"
              onChange={handleChange}
              value={formData.fat}
              autoComplete="off"
            />
            {errors.fat && <ErrorMessage error={errors.fat} />}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-1/4">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Calories
            </h6>
            <input
              id="calories-input"
              name="calories"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="calories"
              maxLength="3"
              onChange={handleChange}
              value={formData.calories}
              autoComplete="off"
            />
            {errors.calories && <ErrorMessage error={errors.calories} />}
          </div>
          <div className="w-1/2 mt-5">
            <button
              type="submit"
              className=" bg-secondary w-full text-textColor text-sm rounded-xl py-4 border hover:border-secondary hover:bg-textColor hover:text-secondary"
              onClick={handleSubmit}
            >
              {edit ? "Confirm Changes" : "Add Ingredient"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Ingredient;
