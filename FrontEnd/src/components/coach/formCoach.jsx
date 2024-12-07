import React, { useState } from "react";
import "../output.css"; // Adjust the path as needed
import { CiImageOn } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import ErrorMessage from "../errorMsg"; // Import the ErrorMessage component
import { FaPlus } from "react-icons/fa";
import CertForm from "./certificateForm";

function FormCoach({
  formData,
  setFormData,
  setCurForm,
  certData,
  setCertData,
}) {
  const [viewCertForm, setViewCert] = useState(false);

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name == "yearsOfExperience" || name == "clientsLimit") &&
      value.length > 2
    )
      return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const handleSubmit = (e) => {
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
  };
  const handleAdd = (e) => {
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
    console.log("shady");
    setViewCert(true);
  };
  return (
    <div className="flex flex-row min-h-screen justify-center items-center bg-textColor p-16">
      {viewCertForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <CertForm
            formData={certData}
            setFormData={setCertData}
            setViewCert={setViewCert}
          />
        </div>
      )}
      <div className="container border-2 border-solid bg-backGroundColor border-primary flex flex-col items-center justify-center p-8 max-w-2xl rounded-3xl relative">
        <form
          className="bg-backGroundColor py-16 px-10 w-full"
          // onSubmit={handleSubmit}
          autoComplete="off" // Disable autocomplete globally
        >
          <div className="bg-backGroundColor mb-10">
            <h6 className="text-xs text-left text-textColor mb-2">
              Years of Experience
            </h6>
            <input
              id="YOE-input"
              name="yearsOfExperience"
              className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
              type="number"
              placeholder="Enter a number"
              onChange={handleChange}
              value={formData.yearsOfExperience}
              autoComplete="off"
            />
            {errors.yearsOfExperience && (
              <ErrorMessage error={errors.yearsOfExperience} />
            )}
          </div>

          <div className="bg-backGroundColor mb-10">
            <h6 className="text-xs text-left text-textColor mb-2">
              Clients Limit
            </h6>
            <input
              id="clientsLimit-input"
              name="clientsLimit"
              className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
              type="number"
              placeholder="Enter a number"
              onChange={handleChange}
              value={formData.clientsLimit}
              autoComplete="off"
            />
            {errors.clientsLimit && (
              <ErrorMessage error={errors.clientsLimit} />
            )}
          </div>

          <div className="bg-backGroundColor mb-5">
            <hr className="h-px mt-8 w-full bg-secondary border-0 dark:bg-secondary " />
            <div className="bg-backGroundColor flex flex-row justify-between">
              <div className="flex flex-row">
                <CiImageOn color="gray" size={120} />
                <div className="mt-6">
                  <p name="CertTitle" className="text-textColor">
                    {certData.certTitle}
                  </p>
                  <p name="certIssueDate" className="text-textColor">
                    {certData.certIssueDate}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCertData({});
                }}
              >
                <FaRegTrashAlt color="gray" size={50} />
              </button>
            </div>

            <hr className="h-px mb-8 w-full bg-secondary border-0 dark:bg-secondary " />
          </div>

          <div className="bg-backGroundColor mb-10">
            <button
              className="bg-textColor flex flex-row justify-center text-sm items-center w-5/12 py-4 rounded-lg text-backGroundColor hover:bg-backGroundColor hover:text-textColor border hover:border-textColor hover:border-1 "
              onClick={handleAdd}
            >
              <span className="mr-2">
                <FaPlus />
              </span>
              Add certificate
            </button>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-backGroundColor border w-5/12 rounded-lg border-secondary py-4 text-sm text-secondary hover:border-primary hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                setCurForm(1);
              }}
            >
              Previous
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

export default FormCoach;
