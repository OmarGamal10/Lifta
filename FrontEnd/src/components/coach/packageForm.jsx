import { useState, useEffect } from "react";
import "../output.css";
import ErrorMessage from "../errorMsg";
import { BsX } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import useHttp from "../../hooks/useHTTP";
function PackageForm({
  userId,
  edit = false,
  idToEdit = 11,
  setPackages,
  setView,
}) {
  const navigate = useNavigate();
  const { post, get, patch, loading, error, data } = useHttp(
    "http://localhost:3000"
  );
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    type: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (edit) {
      const fetchIngredient = async () => {
        try {
          const response = await get(`/packages/${idToEdit}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setFormData((prev) => ({
            ...response.data.package,
          }));
        } catch (err) {
          console.log(err);
        }
      };
      fetchIngredient();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type !== "checkbox") {
      if (
        (name === "price" && value.length > 3) ||
        (name === "duration" && value.length > 2)
      ) {
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => {
        const currentTypes = prevData.type || [];

        const updatedTypes = checked
          ? [...currentTypes, value]
          : currentTypes.filter((type) => type !== value);

        return {
          ...prevData,
          type: updatedTypes,
        };
      });
    }

    // Clear any existing errors for this field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
      submit: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key === "type") {
        if (formData[key].length === 0) {
          newErrors[key] = "At least one type is required.";
        }
      } else if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!edit) {
      const data = { ...formData };
      if (data.type.length == 2) data.type = "Both";
      else {
        data.type = data.type[0];
        data.type = data.type[0].toUpperCase() + data.type.slice(1);
      }
      console.log(formData);
      try {
        const response = await post(
          "/packages",
          {
            ...data,
            trainer_id: userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setPackages((prev) => [
          ...prev,
          {
            package_id: response.data.package.package_id,
            name: response.data.package.name,
            description: response.data.package.description,
            duration: response.data.package.duration,
            type: response.data.package.type,
            price: response.data.package.price,
            isActive: response.data.package.is_active,
          },
        ]);
        setView(false);
      } catch (err) {
        console.log(err);
        setErrors({ submit: err.response.data.message });
      }
    } else {
      try {
        const response = await patch(
          `/packages/${idToEdit}`,
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
        setPackages((prev) =>
          prev.map((pkg) =>
            pkg.package_id === idToEdit
              ? {
                  package_id: response.data.package.package_id,
                  name: response.data.package.name,
                  description: response.data.package.description,
                  duration: response.data.package.duration,
                  type: response.data.package.type,
                  price: response.data.package.price,
                  isActive: response.data.package.is_active,
                }
              : pkg
          )
        );

        setView(false);
      } catch (err) {
        console.log(err.response.data.message);
        setErrors({ submit: err.response.data.message });
      }
    }
  };
  const handleClose = (e) => {
    setFormData({
      name: "",
      price: "",
      duration: "",
      description: "",
      type: [],
    });
    setView(false);
  };

  return (
    <div
      name="pkgForm"
      className={` border-2 border-solid bg-textColor border-secondary flex flex-col items-center justify-center p-8  ${
        edit ? "max-w-sm" : "max-w-lg"
      } rounded-3xl relative`}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors duration-200"
      >
        <BsX size={30} />
      </button>
      <h1 className="text-3xl font-bold">{edit ? "Edit" : "New"} Package</h1>
      <form
        onSubmit={handleSubmit}
        className=" py-6 px-10 w-full"
        autoComplete="off"
      >
        {edit ? null : (
          <div className=" mb-6">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Name
            </h6>
            <input
              id="name-input"
              name="name"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="text"
              placeholder="Enter Name"
              maxLength="40"
              onChange={handleChange}
              value={formData.name}
              autoComplete="off"
            />

            {errors.name && <ErrorMessage error={errors.name} />}
          </div>
        )}
        <div
          className={`flex flex-row ${
            edit ? "justify-center" : "justify-between"
          } space-x-12`}
        >
          <div className="flex flex-col w-1/2">
            <div className=" mb-6">
              <h6 className="text-xs text-left text-backGroundColor mb-2">
                Price
              </h6>
              <input
                id="price-input"
                name="price"
                className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
                type="number"
                placeholder="Enter Price"
                maxLength="3"
                onChange={handleChange}
                value={formData.price}
                autoComplete="off"
              />

              {errors.price && <ErrorMessage error={errors.price} />}
            </div>
            <div className=" mb-6">
              <h6 className="text-xs text-left text-backGroundColor mb-2">
                Duration
              </h6>
              <input
                id="duration-input"
                name="duration"
                className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
                type="number"
                placeholder="Enter Duration"
                maxLength="3"
                onChange={handleChange}
                value={formData.duration}
                autoComplete="off"
              />

              {errors.duration && <ErrorMessage error={errors.duration} />}
            </div>
          </div>
          {edit ? null : (
            <div className="flex flex-col w-1/2 mt-12">
              <h6 className="text-xs text-left text-backGroundColor mb-2">
                Type
              </h6>
              <div className="relative">
                <div className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="type"
                        value="gym"
                        checked={formData.type.includes("gym")}
                        onChange={handleChange}
                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-md 
                        checked:bg-secondary checked:border-secondary 
                        focus:outline-none focus:ring-2 focus:ring-secondary 
                        transition duration-200 ease-in-out"
                      />
                      <span className="ml-3 text-sm text-backGroundColor">
                        Gym
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="type"
                        value="nutrition"
                        checked={formData.type.includes("nutrition")}
                        onChange={handleChange}
                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-md 
                        checked:bg-secondary checked:border-secondary 
                        focus:outline-none focus:ring-2 focus:ring-secondary 
                        transition duration-200 ease-in-out"
                      />
                      <span className="ml-3 text-sm text-backGroundColor">
                        Nutrition
                      </span>
                    </label>
                  </div>
                </div>
                <div className="absolute left-0 w-full">
                  {errors.type && <ErrorMessage error={errors.type} />}
                </div>
              </div>
            </div>
          )}
        </div>
        {edit ? null : (
          <div className=" ">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Description
            </h6>
            <textarea
              id="description"
              name="description"
              className="bg-textColor border px-4 w-full h-24 rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left resize-none"
              placeholder="About Package"
              maxLength="250"
              onChange={handleChange}
              value={formData.description}
              autoComplete="off"
            ></textarea>
          </div>
        )}
        {errors.description && <ErrorMessage error={errors.description} />}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className=" w-1/2 bg-secondary text-textColor text-sm px-3 rounded-xl  py-4 flex flex-row justify-center gap-2 align-middle border hover:border-secondary hover:bg-textColor hover:text-secondary"
          >
            {edit ? "Confirm Changes" : "  Add Package"}
          </button>
        </div>
        {errors.submit && <ErrorMessage error={errors.submit} />}
      </form>
    </div>
  );
}

export default PackageForm;
