import { useState, useRef } from "react";
import "../output.css";
import { BsUpload } from "react-icons/bs";
import ErrorMessage from "../errorMsg";

function ExerciseForm() {
  const [formData, setFormData] = useState({
    name: "",
    muscleGroup: "",
    description: "",
    gif: "",
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "gif") {
      const file = e.target.files[0];
      if (file && file.type === "image/gif") {
        setFormData((prevData) => ({
          ...prevData,
          gif: file, // Update gif in the formData
        }));
      } else {
        alert("Please select a valid GIF file.");
      }
    } else
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleUploadButtonClick = () => {
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  return (
    <div>
      <div
        name="exerciseForm"
        className="border-2 border-solid bg-textColor border-secondary flex flex-col items-center justify-center p-8 min-w-lg max-w-lg rounded-3xl relative"
      >
        <h1 className="text-3xl font-bold">New Exercise</h1>
        <form
          onSubmit={handleSubmit}
          className="py-6 px-10 w-full"
          autoComplete="off"
        >
          <div className="mb-6">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Name
            </h6>
            <input
              id="name-input"
              name="name"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="text"
              placeholder="Enter Name"
              maxLength="15"
              onChange={handleChange}
              value={formData.name}
              autoComplete="off"
            />
            {errors.name && <ErrorMessage error={errors.name} />}
          </div>

          <div className="mb-6 w-1/2">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Muscle Group
            </h6>
            <input
              id="muscleGroup-input"
              name="muscleGroup"
              className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
              type="text"
              placeholder="Enter Muscle Group"
              maxLength="15"
              onChange={handleChange}
              value={formData.muscleGroup}
              autoComplete="off"
            />
            {errors.muscleGroup && <ErrorMessage error={errors.muscleGroup} />}
          </div>

          <div className="mb-6">
            <button
              type="button"
              className="w-1/2 bg-primary text-sm px-3 rounded-xl py-4 flex flex-row justify-center gap-2 align-middle hover:text-textColor"
              onClick={handleUploadButtonClick}
            >
              <span>
                <BsUpload size={25} />
              </span>
              Upload Gif
            </button>
            <input
              type="file"
              name="gif"
              accept="image/gif"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </div>
          {errors.gif && <ErrorMessage error={errors.gif} />}

          <div className="mb-6">
            <h6 className="text-xs text-left text-backGroundColor mb-2">
              Description
            </h6>
            <textarea
              id="description"
              name="description"
              className="bg-textColor border px-4 w-full h-24 rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left resize-none"
              placeholder="Exercise details"
              maxLength="250"
              onChange={handleChange}
              value={formData.description}
              autoComplete="off"
            ></textarea>
          </div>
          {errors.description && <ErrorMessage error={errors.description} />}
          <div className="w-full flex justify-center">
            <div className="w-1/2 mt-5">
              <button
                type="submit"
                className="bg-secondary w-full text-textColor text-sm rounded-xl py-4 border hover:border-secondary hover:bg-textColor hover:text-secondary"
              >
                Add Exercise
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExerciseForm;
