/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import "../output.css"; // Adjust the path as needed
import { BsUpload } from "react-icons/bs";
import ErrorMessage from "../errorMsg";
import handlesImage from "../../freqUsedFuncs/handleImages";
import { BsX } from "react-icons/bs";
function CertForm({ formData, setFormData, setViewCert }) {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

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
  const handleUploadButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });
    console.log(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setViewCert(false);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is a valid photo type (jpeg, png, jpg)
      if (["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        const photoUrl = await handlesImage(file);
        setFormData((prevData) => ({
          ...prevData,
          certificatePhoto: photoUrl, // Store the URL instead of the file
        }));

        setErrors((prev) => {
          const { certificatePhoto, ...rest } = prev;
          return rest;
        });
      } else {
        setFormData((prevData) => {
          const { certificatePhoto, ...rest } = prevData;
          return rest;
        });

        setErrors((prevErrors) => ({
          ...prevErrors,
          photo: "Please select a valid photo file (jpeg, jpg, png).",
        }));
      }
    }
  };
  const handleClose = (e) => {
    setFormData({
      title: "",
      dateIssued: "",
      description: "",
      certificatePhoto: "",
    });
    setViewCert(false);
  };

  return (
    <div
      name="certForm"
      className="border-2 border-solid bg-textColor border-secondary flex flex-col items-center justify-center p-8 w-lg min-w-[32rem] max-w-[32rem] rounded-3xl relative"
    >
      {" "}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors duration-200"
      >
        <BsX size={30} />
      </button>
      <h1 className="text-3xl font-bold">New Certificate</h1>
      <form
        className=" py-6 px-10 w-full"
        autoComplete="off" // Disable autocomplete globally
      >
        <div className=" mb-6">
          <h6 className="text-xs text-left text-backGroundColor mb-2">Title</h6>
          <input
            id="title-input"
            name="title"
            className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
            type="text"
            placeholder="Enter certificate title"
            maxLength="15"
            onChange={handleChange}
            value={formData.title}
            autoComplete="off"
          />
          {errors.title && <ErrorMessage error={errors.title} />}
        </div>

        <div className=" mb-6">
          <h6 className="text-xs text-left text-backGroundColor mb-2">
            Description
          </h6>
          <textarea
            id="description"
            name="description"
            className="bg-textColor border px-4 w-full h-24 rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left resize-none"
            placeholder="Tell us about yourself"
            maxLength="250"
            onChange={handleChange}
            value={formData.description}
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
            name="dateIssued"
            className="bg-textColor border pl-4 w-1/2 rounded-xl border-secondary py-4 text-sm text-backGroundColor text-left"
            onChange={handleChange}
            value={formData.dateIssued}
            autoComplete="off"
          />
          {errors.dateIssued && <ErrorMessage error={errors.dateIssued} />}
        </div>
        <div className="">
          <button
            className=" w-1/2 bg-primary text-sm px-3 rounded-xl  py-4 flex flex-row justify-center gap-2 align-middle hover:text-textColor"
            onClick={handleUploadButtonClick}
          >
            <span>
              <BsUpload size={25} />
            </span>
            Upload Picture
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
