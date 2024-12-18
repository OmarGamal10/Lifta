/* eslint-disable react/prop-types */
import { useState } from "react";
import "../output.css"; // Adjust the path as needed
import ErrorMessage from "../errorMsg"; // Import the ErrorMessage component

function AdminForm({ formData, setFormData }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPassword, setPassState] = useState(false);
  const [errors, setErrors] = useState({});
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
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
      
    // try {
    //     console.log(formData);
    //     const response = await post(
    //       "/users/signup",
    //       {
    //         ...formData,
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     // navigate("/profile");
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  const handleCancle = (e) => {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="flex flex-row min-h-screen justify-center items-center bg-backGroundColor p-16">
      <div className="container border-2 border-solid bg-backGroundColor border-secondary flex flex-col items-center justify-center p-8 max-w-2xl rounded-3xl relative">
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
              maxLength="15"
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
              maxLength="15"
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
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminForm;
