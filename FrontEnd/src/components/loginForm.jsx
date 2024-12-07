/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";

import "./output.css"; // Adjust the path as needed
import ErrorMessage from "./errorMsg"; // Import the ErrorMessage component
import useHttp from "../hooks/useHTTP";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setPassState] = useState(false);

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
      if (!formData[key] && key != "bio") {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log(formData);
      const response = await post("/users/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-row min-h-screen justify-center items-center bg-textColor p-16">
      <div className="container border-2 border-solid bg-backGroundColor border-primary flex flex-col items-center justify-center p-12 max-w-2xl rounded-3xl relative">
        <div className="flex flex-row items-center">
          <h1 className="text-textColor text-3xl">LIFTA</h1>
          <img className="w-24" src="src/assets/image.png" alt="" />
        </div>
        <form
          className="bg-backGroundColor py-16 px-10 w-full"
          onSubmit={handleSubmit}
          autoComplete="off" // Disable autocomplete globally
        >
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
          <div className="flex flex-col justify-center items-center ">
            <button
              type="submit"
              className="bg-secondary border px-[100px] w-1/2 rounded-lg border-secondary py-4 text-md text-backGroundColor hover:border-primary hover:text-primary mb-4"
              onClick={handleSubmit}
            >
              Log in
            </button>
            <span className="text-textColor">
              Don’t have an account?{" "}
              <Link
                to="/sign-up"
                replace
                className=" text-textColor text-decoration-line: underline"
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
