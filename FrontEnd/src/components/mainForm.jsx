/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import "./output.css"; // Adjust the path as needed
import ErrorMessage from "./errorMsg"; // Import the ErrorMessage component
import handleImages from "../freqUsedFuncs/handleImages";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHTTP";
import { Toaster, toast } from "sonner";

function Form({ formData, setFormData, toNext, type }) {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showPassword, setPassState] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const { post, loading, error, data } = useHttp("http://localhost:3000");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key != "bio" && key != "photo") {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (type === "Admin") {
      try {
        const response = await post(
          "/users/createAccount",
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
        toast.success("Account Created Successfully", {
          style: {
            background: "white",
            color: "green",
          },
        });
      } catch (err) {
        console.log(err);
        toast.error("Can't create account", {
          style: {
            background: "white",
            color: "red",
          },
        });
      }
    } else {
      toNext(2);
    }
  };

  const handleGenderSelect = (gender) => {
    setFormData((prevData) => ({
      ...prevData,
      gender,
    }));
    setShowDropdown(false); // Close dropdown after selection
  };
  const handleCancle = (e) => {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      bio: "",
      gender: "M",
      birthDate: "",
    });
    navigate("/");
  };
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is a valid photo type (jpeg, png, jpg)
      if (["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        const photoUrl = await handleImages(file);
        setFormData((prevData) => ({
          ...prevData,
          photo: photoUrl, // Store the URL instead of the file
        }));

        setErrors((prev) => {
          const { ...rest } = prev;
          return rest;
        });
      } else {
        setFormData((prevData) => {
          const { photo, ...rest } = prevData;
          return rest;
        });

        setErrors((prevErrors) => ({
          ...prevErrors,
          photo: "Please select a valid photo file (jpeg, jpg, png).",
        }));
      }
    }
  };
  return (
    <div className="flex flex-row w-full min-h-screen justify-center items-center bg-backGroundColor p-16">
      <Toaster/>
      <div className="container border-2 border-solid bg-backGroundColor border-secondary flex flex-col items-center justify-center p-8 max-w-2xl rounded-3xl relative">
        <div
          className="absolute top-[-65px] left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={handleUploadButtonClick}
        >
          <input
            type="file"
            name="photo"
            accept="image/jpeg, image/png, image/jpg"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <img
            src={
              formData.photo
                ? formData.photo
                : "./src/assets/user-icon-on-transparent-background-free-png.webp"
            }
            alt="Submit"
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <form
          className="bg-backGroundColor py-16 px-10 w-full"
          onSubmit={handleSubmit}
          autoComplete="off" // Disable autocomplete globally
        >
          {/* First Name */}
          <div className="bg-backGroundColor mb-10">
            <h6 className="text-xs text-left text-textColor mb-2">
              First Name
            </h6>
            <input
              id="FName-input"
              name="firstName"
              className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
              type="text"
              placeholder="Enter first name"
              maxLength="30"
              onChange={handleChange}
              value={formData.firstName}
              autoComplete="off"
            />
            {errors.firstName && <ErrorMessage error={errors.firstName} />}
          </div>

          {/* Last Name */}
          <div className="bg-backGroundColor mb-10">
            <h6 className="text-xs text-left text-textColor mb-2">Last Name</h6>
            <input
              id="LName-input"
              name="lastName"
              className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
              type="text"
              placeholder="Enter last name"
              maxLength="30"
              onChange={handleChange}
              value={formData.lastName}
              autoComplete="off"
            />
            {errors.lastName && <ErrorMessage error={errors.lastName} />}
          </div>

          {/* Email */}
          <div className="bg-backGroundColor mb-10">
            <h6 className="text-xs text-left text-textColor mb-2">Email</h6>
            <input
              id="email"
              name="email"
              className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
              type="email"
              placeholder="Enter email"
              maxLength="65"
              onChange={handleChange}
              value={formData.email}
              autoComplete="off"
            />
            {errors.email && <ErrorMessage error={errors.email} />}
          </div>

          {/* Password */}
          <div className="bg-backGroundColor mb-10 relative">
            <h6 className="text-xs text-left text-textColor mb-2">Password</h6>
            <input
              name="password"
              className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formData.password}
              maxLength="50"
              onChange={handleChange}
            />
            <button
              type="button"
              id="toggle-password"
              className={`absolute top-10 right-4 text-sm text-${
                showPassword ? "primary" : "secondary"
              } hover:text-primary focus:outline-none`}
              onClick={() => setPassState(!showPassword)}
            >
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </button>
            {errors.password && <ErrorMessage error={errors.password} />}
          </div>

          {/* Phone Number */}
          <div className="bg-backGroundColor mb-10">
            <h6 className="text-xs text-left text-textColor mb-2">
              Phone Number
            </h6>
            <input
              id="phone"
              name="phoneNumber"
              className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
              type="tel"
              placeholder="Enter phone number"
              maxLength="11"
              onChange={handleChange}
              value={formData.phoneNumber}
              autoComplete="off"
            />
            {errors.phoneNumber && <ErrorMessage error={errors.phoneNumber} />}
          </div>

          {/* BIO */}
          <div className="bg-backGroundColor mb-10">
            <h6 className="text-xs text-left text-textColor mb-2">BIO</h6>
            <textarea
              id="bio"
              name="bio"
              className="bg-backGroundColor border px-4 w-full h-32 rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left resize-none"
              placeholder="Tell us about yourself"
              maxLength="250"
              onChange={handleChange}
              value={formData.bio}
              autoComplete="off"
            ></textarea>
            {errors.bio && <ErrorMessage error={errors.bio} />}
          </div>

          {/* Gender Dropdown */}
          <div className="bg-backGroundColor  mb-10 flex flex-col">
            <h6 className="text-xs text-left text-textColor mb-2">Gender</h6>

            <button
              id="dropdownDefaultButton"
              onClick={() => setShowDropdown((prev) => !prev)}
              className="text-textColor  hover:bg-secondary focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center flex flex-row justify-between "
              type="button"
            >
              {formData.gender === "M" ? "Male" : "Female"}
              <div>
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
            </button>
            {showDropdown && (
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-primary rounded-lg shadow w-full mt-2"
              >
                <ul className="py-2  text-sm text-primary">
                  <li>
                    <button
                      type="button"
                      onClick={() => handleGenderSelect("M")}
                      className="block w-full text-left px-4 py-2 hover:bg-secondary hover:text-backGroundColor"
                    >
                      Male
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleGenderSelect("F")}
                      className="block w-full text-left px-4 py-2 hover:bg-secondary  hover:text-backGroundColor"
                    >
                      Female
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {errors.gender && <ErrorMessage error={errors.gender} />}
          </div>

          {/* Birthdate */}
          <div className="bg-backGroundColor mb-10 flex flex-col">
            <h6 className="text-xs text-left text-textColor mb-2">Birthdate</h6>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              className="bg-backGroundColor border pl-4 w-1/2 rounded-xl border-secondary py-4 text-sm text-textColor text-left"
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.birthDate && <ErrorMessage error={errors.birthDate} />}
          </div>
          {errors.photo && <ErrorMessage error={errors.photo} />}
          {/* Buttons */}

          <div className="flex justify-between">
            <button
              className="bg-backGroundColor border w-5/12 rounded-lg border-secondary py-4 text-sm text-secondary hover:border-primary hover:text-primary"
              onClick={handleCancle}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-secondary border w-5/12 rounded-lg border-secondary py-4 text-sm text-backGroundColor hover:border-primary hover:text-primary"
              onClick={handleSubmit}
            >
              {type == "Admin" ? "Create Account" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
