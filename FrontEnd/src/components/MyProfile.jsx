import React, { useState, useEffect, useRef } from "react";
import getTokenFromCookie from "../freqUsedFuncs/getToken";
import ErrorMessage from "../components/errorMsg"; // Import the ErrorMessage component
import handleImages from "../freqUsedFuncs/handleImages";
import { jwtDecode } from "jwt-decode";
import useHttp from "../hooks/useHTTP";
import { Loader, Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import photo from "../assets/user-icon-on-transparent-background-free-png.webp";
const MyProfile = ({
  userId,
  userProfile,
  setUserProfile,
  setUserName,
  setUserBio,
  isEditable,
}) => {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const { get, patch } = useHttp("http://localhost:3000");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await get(`/users/${userId}/details`);
        setProfileData(response.data.details);
        setFormData(response.data.details);
        console.log("res", response.data.details);  
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleNameChange = (e) => {
    const { id, value } = e.target;

    // Validation: Only allow alphabetic characters
    const nameRegex = /^[a-zA-Z]*$/;
    if (!nameRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [id]: "Name can only contain letters.",
      }));
    } else {
      setErrors((prev) => {
        const { [id]: _, ...rest } = prev; // Destructure to exclude the key
        return rest;
      });
    }
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleChange = (e) => {
    if (!isEditable) return;
  
    const { id, value } = e.target;
  
    // Corrected condition for experience_years and client_limit
    if ((id === "experience_years" || id === "client_limit") && value.length > 2) return;
  
    // Corrected condition for weight and height
    if ((id === "weight" || id === "height") && (value.length > 3 || parseInt(value, 10) <= 0)) return;
  
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if(id === "oldPassword" || id === "newPassword" || id === "confirmPassword") {
      setErrors((prev) => {
        const { "password": _, ...rest } = prev; // Destructure to exclude the key
        return rest;
      });
    } else {
    setErrors((prev) => {
      const { [id]: _, ...rest } = prev; // Destructure to exclude the key
      return rest;
    });
  }
  };
  

  
  const handleUploadButtonClick = () => {
    if (!isEditable) return;
    fileInputRef.current.click();
  };

  const handleRemoveImage = async (e) => {
    if (!isEditable) return;

    setFormData((prevData) => ({
      ...prevData,
      photo: null, // Explicitly set photo to null
    }));
    setErrors((prevErrors) => {
      const { photo, ...rest } = prevErrors; // Remove any photo-specific errors
      return rest;
    });

    console.log("test remove", formData);
  };

  const handlePhotoChange = async (e) => {
    if (!isEditable) return;

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
      console.log("test", formData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditable) return;
    const newErrors = {};
    const allowedKeys = ["email", "first_name", "last_name", "phone_number"];
    Object.keys(formData).forEach((key) => {
      if (
        allowedKeys.includes(key) &&
        (!formData[key] || formData[key] === "")
      ) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (profileData.type === "Trainee" &&(formData.weight === "" || !formData.weight)) {
      newErrors.weight = `Weight is required.`;
    }

    if (profileData.type === "Trainee" && (formData.height === "" || !formData.height)) {
      newErrors.height = `height is required.`;
    }

    const { oldPassword, newPassword, confirmPassword } = formData;
    const allPasswordsEmpty = !oldPassword && !newPassword && !confirmPassword;
    const allPasswordsFilled = oldPassword && newPassword && confirmPassword;

    console.log("her", oldPassword, newPassword, confirmPassword);
    if (!allPasswordsEmpty && !allPasswordsFilled) {
      newErrors.password = "All password fields must be filled or left empty.";
    } else if (newPassword !== confirmPassword) {
      newErrors.password = "New password and confirmation password must match.";
    }
    console.log(newErrors, errors);

    if (newErrors && Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (errors && Object.keys(errors).length > 0) {
      return;
    }

    try {

      console.log("testpas", formData);
      const response = await patch(`/users/${userId}/details`, formData);
      console.log("yala", response);
      setUserBio(response.user.bio);
      setUserName(response.user.first_name + " " + response.user.last_name);
      setUserProfile(response.user.photo);
      setFormData((prev) => ({
        ...prev,
        ...response.user,
      }));
      setProfileData((prev) => ({
        ...prev,
        ...response.user,
      }));
      toast("Information updated successfully");
    } catch (error) {
      console.log("aaaa", error);
      if (error.response.data.message === "Please enter a valid Email") {
        setErrors({ email: "Please enter a valid Email" });
      } else if(error.response.data.message === "Please enter a valid Number")
        {
          setErrors({ phone_number: "Numbers from 0 to 9 and start by '01'" });
        }
         else if(error.response.data.message === "Please enter a positive Number")
        {
          setErrors({ client_limit: "Please enter a positive Number" });
        }
        else if (
        error.response.data.message ===
        "This email is already registered. Please use another email."
      ) {
        setErrors({
          email: "This email is already registered. Please use another email.",
        });
      } else if (error.response.data.message === "Incorrect password") {
        setErrors({ oldPassword: "Incorrect password" });
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const renderform = () => {
    return (
      <form
        className="w-full p-6 bg-backGroundColor rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-2xl text-textspan text-center mb-6">
          Personal Info
        </h2>

        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex-1">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-textspan"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              value={formData.first_name || ""}
              onChange={handleNameChange}
              disabled={!isEditable}
              placeholder="Enter First Name"
              className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
            />
            {errors.first_name && <ErrorMessage error={errors.first_name} />}
          </div>
          <div className="flex-1">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-textspan"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              value={formData.last_name || ""}
              onChange={handleNameChange}
              disabled={!isEditable}
              placeholder="Enter Last Name"
              className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
            />
            {errors.last_name && <ErrorMessage error={errors.last_name} />}
          </div>
        </div>
        {isEditable ? (
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-textspan"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email || ""}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="Enter Email"
              autoComplete="off"
              className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
            />
            {errors.email && <ErrorMessage error={errors.email} />}
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex-1">
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-textspan"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              value={formData.phone_number || ""}
              onChange={handleChange}
              disabled={!isEditable}
              maxLength="11"
              autoComplete="off"
              placeholder="Enter Phone Number"
              className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
            />
            {errors.phone_number && (
              <ErrorMessage error={errors.phone_number} />
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-textspan"
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="Enter Bio"
              maxLength="250"
              rows="4"
              className="block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
            ></textarea>
            {errors.bio && <ErrorMessage error={errors.bio} />}
          </div>
        </div>
        {isEditable ? (
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex-1">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-textspan"
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.oldPassword ? "text" : "password"}
                  id="oldPassword"
                  placeholder="Old Password"
                  onChange={handleChange}
                  value={formData.oldPassword?formData.oldPassword:""}
                  maxLength="50"
                  className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
                />
                <span
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPasswords.oldPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
              {errors.oldPassword && (
                <ErrorMessage error={errors.oldPassword} />
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-textspan"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.newPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="New Password"
                  onChange={handleChange}
                  value={formData.newPassword?formData.newPassword:""}
                  maxLength="50"
                  className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
                />
                <span
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPasswords.newPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
              {errors.password && <ErrorMessage error={errors.password} />}
            </div>

            <div className="flex-1">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-textspan"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword?formData.confirmPassword:""}
                  onChange={handleChange}
                  maxLength="50"
                  className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
                />
                <span
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPasswords.confirmPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </form>
    );
  };

  const renderBusinessForm = () => {
    if (profileData.type === "Trainer")
      return (
        <form
          className="w-full p-6 bg-backGroundColor rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-2xl text-textspan text-center mb-6">
            Experience & Client Limits
          </h2>

          <div className="flex flex-wrap gap-6 mb-6">
            {/* Experience Years Input */}
            <div className="flex-1">
              <label
                htmlFor="experience_years"
                className="block text-sm font-medium text-textspan"
              >
                Experience Years
              </label>
              <input
                type="number"
                id="experience_years"
                value={formData.experience_years || ""}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="Enter Experience in Years"
                className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
              />
            </div>

            {/* Client Limit Input */}
            <div className="flex-1">
              <label
                htmlFor="client_limit"
                className="block text-sm font-medium text-textspan"
              >
                Client Limit
              </label>
              <input
                type="number"
                id="client_limit"
                value={formData.client_limit || ""}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="Enter Client Limit"
                className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
              />
              {errors.client_limit && <ErrorMessage error={errors.client_limit} />}
            </div>
          </div>

          {/* Validation Error Messages */}
          {errors.experience_years && (
            <p className="text-red-500 text-sm mt-1">
              {errors.experience_years}
            </p>
          )}
          {errors.client_limit && (
            <p className="text-red-500 text-sm mt-1">{errors.client_limit}</p>
          )}
        </form>
      );
    else if (profileData.type === "Trainee")
      return (
        <form
          className="w-full p-6 bg-backGroundColor rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-2xl text-textspan text-center mb-6">
            Health & Fitness Info
          </h2>

          {/* Food Allergies Field */}
          <div className="mb-6">
            <label
              htmlFor="food_allergies"
              className="block text-sm font-medium text-textspan"
            >
              Food Allergies
            </label>
            <textarea
              id="food_allergies"
              value={formData.food_allergies || ""}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="Enter Food Allergies"
              rows="4"
              className="block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
            ></textarea>
          </div>

          {/* Goal Field */}
          <div className="mb-6">
            <label
              htmlFor="goal"
              className="block text-sm font-medium text-textspan"
            >
              Goal
            </label>
            <textarea
              id="goal"
              value={formData.goal || ""}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="Enter Your Goal"
              rows="4"
              className="block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
            ></textarea>
          </div>

          {/* Weight and Height Fields */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex-1">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-textspan"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={formData.weight}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="Enter Weight"
                className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="height"
                className="block text-sm font-medium text-textspan"
              >
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                value={formData.height || ""}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="Enter Height"
                className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
              />
            </div>
          </div>

          {/* Workout Preferences Dropdown */}
          <div className="mb-6">
            <label
              htmlFor="workout_preferences"
              className="block text-sm font-medium text-textspan"
            >
              Workout Preferences
            </label>
            <select
              id="workout_preferences"
              value={formData.workout_preferences || "indoor"}
              onChange={handleChange}
              disabled={!isEditable}
              className="mt-2 block w-full rounded-md border-2 border-secondary shadow-sm focus:border-accent focus:ring-accent sm:text-sm bg-backGroundColor text-textspan p-4"
            >
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>

          {/* Validation Error Messages */}
          {errors.food_allergies && (
            <p className="text-red-500 text-sm mt-1">{errors.food_allergies}</p>
          )}
          {errors.goal && (
            <p className="text-red-500 text-sm mt-1">{errors.goal}</p>
          )}
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
          )}
          {errors.height && (
            <p className="text-red-500 text-sm mt-1">{errors.height}</p>
          )}
        </form>
      );
    else return <></>;
  };
  if (!profileData) return <Loader className="mx-auto my-10" />;

  return (
    <div className=" mx-auto mt-10 bg-backGroundColor text-textColor p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <div
          className={`${
            userProfile
              ? ""
              : "bg-primary flex rounded-full items-center justify-center"
          }`}
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
            src={formData.photo ? formData.photo : photo}
            alt="Submit"
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>
        {formData.photo && isEditable && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="px-8 py-2 bg-secondary text-backGroundColor rounded-md shadow-sm hover:bg-backGroundColor hover:border-secondary hover:text-textColor focus:outline-none focus:ring-2 focus:ring-secondary mt-4"
          >
            Remove Image
          </button>
        )}

        <span className="text-sm text-textspan mt-1">
          {isEditable
            ? "Update your personal details below"
            : "Viewing profile"}
        </span>
      </div>
      <div className="w-full flex gap-6">
        <div className="flex-3">{renderform()}</div>
        <div className="flex-1">{renderBusinessForm()}</div>
      </div>
      {isEditable && (
        <div className="flex justify-center space-x-16 mt-6">
          <button
            type="reset"
            onClick={() => {
              setFormData((prev) => ({
                ...profileData,  // Keep other profile data
              }));
              setErrors({}); // Clear errors
            }}
            
            className="px-8 py-2 bg-backGroundColor text-textColor rounded-md shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-secondary text-backGroundColor rounded-md shadow-sm hover:bg-backGroundColor hover:border-secondary hover:text-textColor focus:outline-none focus:ring-2 focus:ring-secondary"
            onClick={handleSubmit}
          >
            Save
            <ToastContainer />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
