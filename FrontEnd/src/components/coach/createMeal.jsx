import React, { useState, useEffect, useRef } from "react";
import Ingredient from "./ingredientCard"; // Import the Ingredient component
import ErrorMessage from "../errorMsg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BsUpload } from "react-icons/bs";

import handleImages from "../../freqUsedFuncs/handleImages";

import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import Nodata from "../Nodata";
import useHttp from "../../hooks/useHTTP";
import { Toaster, toast } from "sonner";

function CreateMeal() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { get, post, loading, error, data } = useHttp("http://localhost:3000");
  const [mealName, updateMealName] = useState("");
  const [photo, updateMealPhoto] = useState(null);
  const [nutritionFacts, updateNutritionFacts] = useState({
    proteins: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
  });
  const [choosedIngredients, updateChoosedIngredients] = useState([]);
  const [curSelectedIngredient, updateCurSelectedIngredient] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [curIngredientInfo, setCurIngredientInfo] = useState({
    quantity: "",
  });
  const [mealError, setMealError] = useState("");
  const [isIngredientListOpen, setIsIngredientListOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [photoError, setPhotoError] = useState({});

  useEffect(() => {
    const calculateTotalNutrition = () => {
      const totalNutrition = choosedIngredients.reduce(
        (acc, chosenIngredient) => {
          const ingredient = ingredients.find(
            (ing) => ing.id === chosenIngredient.ingredient_id
          );
          if (!ingredient) return acc;

          const quantityFactor = parseFloat(chosenIngredient.quantity) / 100;

          return {
            proteins: acc.proteins + ingredient.protein * quantityFactor,
            carbs: acc.carbs + ingredient.carb * quantityFactor,
            fats: acc.fats + ingredient.fat * quantityFactor,
            calories: acc.calories + ingredient.calories * quantityFactor,
          };
        },
        { proteins: 0, carbs: 0, fats: 0, calories: 0 }
      );

      updateNutritionFacts(totalNutrition);
    };
    calculateTotalNutrition();
  }, [choosedIngredients]);

  useEffect(() => {
    const fetchExercises = async () => {
      const token = getTokenFromCookies();
      const decodedToken = token ? jwtDecode(token) : null;
      const userId = decodedToken ? decodedToken.user_id : null;

      if (!userId) {
        console.error("User ID not found in token.");
        return;
      }

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
        console.error("Error fetching Ingredients:", err);
        setIngredients([]);
      }
    };

    fetchExercises();
  }, []);

  const totalPages = Math.ceil(ingredients.length / 6);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is a valid photo type (jpeg, png, jpg)
      if (["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        updateMealPhoto(file);

        setPhotoError((prev) => {
          const { photo, ...rest } = prev;
          return rest;
        });
      } else {
        updateMealPhoto(null);
        setPhotoError((prev) => ({
          ...prev,
          photo: "Please select a valid photo file (jpeg, jpg, png).",
        }));
      }
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleSelectIngredient = (e, key) => {
    setMealError("");
    e.preventDefault();

    if (choosedIngredients.some((ingredient) => ingredient.id === key)) {
      setMealError("This ingredient is already in your meal.");
      return;
    }

    updateCurSelectedIngredient(
      ingredients.find((ingredient) => ingredient.id === key)
    );

    setCurIngredientInfo({ quantity: "" });
  };

  const handleRemoveIngredient = (ingredientId) => {
    updateChoosedIngredients(
      choosedIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };

  const handlePreviousPage = () => {
    setMealError("");
    setCurPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setMealError("");
    setCurPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const handleAddMeal = async () => {
    const newErrors = {};

    if (choosedIngredients.length === 0) {
      setMealError(
        "Please select at least one ingredient before adding a meal."
      );
      return;
    }

    if (mealName.length === 0) {
      setMealError("Please enter meal name");
      return;
    }

    if (!photo) {
      newErrors.photo = "Please upload a photo for the meal";
    }

    if (Object.keys(newErrors).length > 0) {
      setPhotoError(newErrors);
      return;
    }

    setMealError("");
    setPhotoError({});

    const photoUrl = await handleImages(photo);
    if (photo == null) {
      return;
    }
    console.log(photoUrl);

    const token = getTokenFromCookies();
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? decodedToken.user_id : null;
    console.log(userId);
    try {
      const response = await post(
        "/meals",
        {
          ingredients: [...choosedIngredients],
          name: mealName,
          picture: photoUrl,
          nutritionist_id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Meal Created Successfully", {
        style: {
          background: "white",
          color: "green",
        },
      });

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      if (err.response?.data?.message)
        setMealError(err.response?.data?.message);
      else
        toast.error("Can't Create meal", {
          style: {
            background: "white",
            color: "red",
          },
        });
    }
  };

  const toggleIngredientList = (e) => {
    e.stopPropagation();
    setIsIngredientListOpen(!isIngredientListOpen);
  };

  const handlePageClick = (e) => {
    if (
      isIngredientListOpen &&
      !e.target.closest(".ingredient-list-container") &&
      !e.target.closest(".ingredient-list-toggle")
    ) {
      setIsIngredientListOpen(false);
    }
  };

  return ingredients && ingredients.length ? (
    <>
      {" "}
      <Toaster />
      <div
        className="bg-textColor flex min-h-screen justify-center px-12 py-3 relative"
        onClick={handlePageClick}
      >
        <div className="w-3/5 grid grid-cols-3 gap-4 relative">
          {ingredients
            .slice((curPage - 1) * 6, curPage * 6)
            .map((ingredient) => (
              <div
                key={ingredient.id}
                onClick={(e) => handleSelectIngredient(e, ingredient.id)}
                className={
                  choosedIngredients.some(
                    (chosen) => chosen.ingredient_id === ingredient.id
                  )
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              >
                <Ingredient
                  readOnly={true}
                  name={ingredient.name}
                  protein={ingredient.protein}
                  carb={ingredient.carb}
                  fat={ingredient.fat}
                  calories={ingredient.calories}
                />
              </div>
            ))}

          <div className="col-span-3 absolute bottom-0 left-0 right-0 flex justify-center items-center py-2 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={curPage === 1}
              className={`px-4 py-2 rounded-xl border ${
                curPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
              }`}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {curPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={curPage === totalPages}
              className={`px-8 py-2 rounded-xl border ${
                curPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        <div className="border-l border-primary max-h-96"></div>

        <div className="w-2/5 px-10 relative">
          <button
            onClick={toggleIngredientList}
            className="w-full bg-secondary text-textColor text-sm rounded-xl py-3 mb-4 flex justify-between items-center px-3"
          >
            <span>Chosen Ingredients ({choosedIngredients.length})</span>
            <span>{isIngredientListOpen ? "▲" : "▼"}</span>
          </button>

          {isIngredientListOpen && (
            <div className="absolute z-50 w-5/6 max-h-64 overflow-y-auto bg-white border rounded-lg shadow-lg bg-textColor">
              {choosedIngredients.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No ingredients selected
                </div>
              ) : (
                choosedIngredients.map((ingredient) => {
                  const fullIngredient = ingredients.find(
                    (e) => e.id === ingredient.ingredient_id
                  );
                  return (
                    <div
                      key={ingredient.ingredient_id}
                      className="flex justify-between items-center p-3 border-b hover:bg-gray-100"
                    >
                      <div>
                        <p className="font-medium">{fullIngredient.name}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {ingredient.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveIngredient(ingredient.id)}
                        className="text-red-500 hover:text-red-700 font-bold text-xl"
                      >
                        ×
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {curSelectedIngredient ? (
            <AddIngredientToMeal
              formData={curIngredientInfo}
              setFormData={setCurIngredientInfo}
              selected={curSelectedIngredient}
              updateCurSelected={updateCurSelectedIngredient}
              choosed={choosedIngredients}
              addOne={updateChoosedIngredients}
              clearMealError={() => setMealError("")}
            />
          ) : null}
        </div>
        <div className="fixed bottom-4 right-64 z-50">
          <button
            className="bg-secondary text-textColor text-sm rounded-xl py-4 px-10 border hover:border-secondary hover:bg-textColor hover:text-secondary"
            onClick={handleAddMeal}
          >
            Add Meal
          </button>
        </div>

        <div className="fixed bottom-0 right-[500px] z-50">
          <div className="mb-6">
            <button
              type="button"
              className="w-1/2 bg-primary text-sm px-16 rounded-xl py-3 flex flex-row justify-center gap-2 align-middle hover:text-textColor"
              onClick={handleUploadButtonClick}
            >
              <span>
                <BsUpload size={25} />
              </span>
              Upload Photo
            </button>
            <input
              type="file"
              name="photo"
              accept="image/jpeg, image/png, image/jpg"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </div>
          {photoError.photo && <ErrorMessage error={photoError.photo} />}
        </div>

        <div className="fixed bottom-4 left-4 z-50">
          {mealError && <ErrorMessage error={mealError} />}
        </div>
        <div className={`absolute bottom-[90px]  right-14 flex justify-center`}>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="font-semibold">Proteins</p>
                <p>{nutritionFacts.proteins.toFixed(1)}g</p>
              </div>
              <div>
                <p className="font-semibold">Carbs</p>
                <p>{nutritionFacts.carbs.toFixed(1)}g</p>
              </div>
              <div>
                <p className="font-semibold">Fats</p>
                <p>{nutritionFacts.fats.toFixed(1)}g</p>
              </div>
              <div>
                <p className="font-semibold">Calories</p>
                <p>{nutritionFacts.calories.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-[90px]  right-[500px] flex justify-center`}
        >
          <div className="w-1/2">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Meal Name
            </h6>
            <input
              name="mealName"
              className="bg-textColor border pl-4 rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="text"
              placeholder="Enter name"
              maxLength="25"
              onChange={(e) => {
                updateMealName(e.target.value);
                setMealError("");
              }}
              value={mealName}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Nodata header="Add ingredients first" />
  );
}

function AddIngredientToMeal({
  formData,
  setFormData,
  selected,
  addOne,
  choosed,
  updateCurSelected,
  clearMealError,
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 3) return;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    clearMealError();

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addOne([
      ...choosed,
      {
        ingredient_id: selected.id,
        quantity: formData.quantity,
      },
    ]);

    setFormData({ quantity: "" });
    updateCurSelected(null);
  };

  return (
    <div className="w-full flex-col justify-center text-center">
      <div className="flex justify-center mb-5">
        <Ingredient
          readOnly={true}
          name={selected.name}
          protein={selected.protein}
          carb={selected.carb}
          fat={selected.fat}
          calories={selected.calories}
        />
      </div>
      <form action="">
        <div className="flex flex-row justify-center">
          <div className="w-1/2">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Quantity (g)
            </h6>
            <input
              name="quantity"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-3 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="number"
              placeholder="Enter Quantity"
              maxLength="3"
              onChange={handleChange}
              value={formData.quantity}
              autoComplete="off"
            />
            {errors.quantity && <ErrorMessage error={errors.quantity} />}
          </div>
        </div>
        <div className="flex flex-row mt-6 justify-center gap-x-48">
          <button
            className="w-1/4 bg-secondary text-textColor text-sm px-3 rounded-xl py-4 flex flex-row justify-center gap-2 align-middle border hover:border-secondary hover:bg-textColor hover:text-secondary"
            onClick={(e) => {
              e.preventDefault();
              setFormData({ quantity: "" });
              updateCurSelected(null);
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-1/4 bg-secondary text-textColor text-sm px-3 rounded-xl py-4 flex flex-row justify-center gap-2 align-middle border hover:border-secondary hover:bg-textColor hover:text-secondary"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateMeal;
