import React, { useRef, useState } from "react";
import "../output.css"; // Adjust the path as needed
import { BsUpload } from "react-icons/bs";
import ErrorMessage from "../errorMsg";

function CertForm({ formData, setFormData, setViewCert }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(formData);
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
    setViewCert(false);
  };

  return (
    <div
      name="certForm"
      className="container border-2 border-solid bg-textColor border-secondary flex flex-col items-center justify-center p-8  max-w-lg rounded-3xl relative"
    >
      <h1 className="text-3xl font-bold">New Certificate</h1>
      <form
        className=" py-6 px-10 w-full"
        autoComplete="off" // Disable autocomplete globally
      >
        <div className=" mb-6">
          <h6 className="text-xs text-left text-backGroundColor mb-2">Title</h6>
          <input
            id="title-input"
            name="certTitle"
            className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
            type="text"
            placeholder="Enter certificate title"
            maxLength="15"
            onChange={handleChange}
            value={formData.certTitle}
            autoComplete="off"
          />
          {errors.certTitle && <ErrorMessage error={errors.certTitle} />}
        </div>

        <div className=" mb-6">
          <h6 className="text-xs text-left text-backGroundColor mb-2">
            Description
          </h6>
          <textarea
            id="description"
            name="certDiscription"
            className="bg-textColor border px-4 w-full h-24 rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left resize-none"
            placeholder="Tell us about yourself"
            maxLength="250"
            onChange={handleChange}
            value={formData.certDiscription}
            autoComplete="off"
          ></textarea>
        </div>
        <div className=" mb-6 flex flex-col">
          <h6 className="text-xs text-left text-backGroundColor mb-2">
            Issue Date
          </h6>
          <input
            type="date"
            id="issueDate"
            name="certIssueDate"
            className="bg-textColor border pl-4 w-1/2 rounded-xl border-secondary py-4 text-sm text-backGroundColor text-left"
            onChange={handleChange}
            value={formData.certIssueDate}
            autoComplete="off"
          />
          {errors.certIssueDate && (
            <ErrorMessage error={errors.certIssueDate} />
          )}
        </div>
        <div className="">
          <button className=" w-1/2 bg-primary text-sm px-3 rounded-xl  py-4 flex flex-row justify-center gap-2 align-middle hover:text-textColor">
            <span>
              <BsUpload size={25} />
            </span>
            Upload Picture
          </button>
        </div>
        <div className="flex justify-center w-full mt-10">
          <button
            className=" w-1/2 bg-secondary text-textColor text-sm px-3 rounded-xl  py-4 flex flex-row justify-center gap-2 align-middle border hover:border-secondary hover:bg-textColor hover:text-secondary"
            onClick={handleSubmit}
          >
            Add Certificate
          </button>
        </div>
      </form>
    </div>
  );
}
export default CertForm;
