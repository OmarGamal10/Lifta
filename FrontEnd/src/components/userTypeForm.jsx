/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

import "./output.css"; // Adjust the path as needed

function UserTypeForm({ setType, setFormData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setType(e.target.name);
    setFormData((prevData) => ({
      ...prevData,
      type: e.target.name === "Coach" ? "Trainer" : "Trainee",
    }));
  };

  return (
    <div className="container border-2 border-solid bg-textColor border-secondary flex flex-col items-center justify-center p-8 max-w-md rounded-3xl relative">
      <h1 className="text-3xl font-bold mb-10">Let's get started!</h1>
      <div className="flex flex-col w-full ">
        <h2 className="text-xl text-left font-medium mb-5">Choose Your Path</h2>
        <button
          name="Coach"
          className="text-textColor font-bold border bg-secondary py-3 rounded-xl mb-4 hover:bg-textColor hover:border-secondary hover:text-secondary"
          onClick={handleSubmit}
        >
          I'm a Coach
        </button>
        <button
          name="Trainee"
          className="text-textColor font-bold border bg-secondary py-3 rounded-xl mb-4 hover:bg-textColor hover:border-secondary hover:text-secondary"
          onClick={handleSubmit}
        >
          I'm a Trainee
        </button>
        <div className="flex justify-center mt-10">
          <span className="text-secondary">
            Already have an account?{" "}
            <Link
              to="/log-in"
              replace
              className=" text-secondary text-decoration-line: underline"
            >
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserTypeForm;
