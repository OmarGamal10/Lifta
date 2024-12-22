/* eslint-disable react/prop-types */
import { useState } from "react";
import "../output.css"; // Adjust the path as needed
import { CiImageOn } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import ErrorMessage from "../errorMsg"; // Import the ErrorMessage component
import { FaPlus } from "react-icons/fa";
import CertForm from "./certificateForm";
import useHttp from "../../hooks/useHTTP";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function FormCoach({
  userData,
  formData,
  setFormData,
  setCurForm,
  certData,
  setCertData,
  isAdmin,
}) {
  const [viewCertForm, setViewCert] = useState(false);
  const navigate = useNavigate();
  const { post, loading, error, data } = useHttp("http://localhost:3000");

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name == "experienceYears" || name == "clientLimit") &&
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (Object.keys(certData).length === 0) {
      setErrors({ ...errors, submit: "Please add a certificate" });
      return;
    }

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!isAdmin) {
      try {
        const response = await post(
          "/users/signup",
          {
            ...userData,
            ...formData,
            ...certData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Account Created Successfully", {
          style: {
            background: "white",
            color: "green",
          },
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (err) {
        if (err.response?.data?.message)
          setErrors({ ...errors, submit: err.response?.data?.message });
        else
          toast.error("Can't sign up", {
            style: {
              background: "white",
              color: "red",
            },
          });
      }
    } else {
      try {
        const response = await post(
          "/users/createAccount",
          {
            ...userData,
            ...formData,
            ...certData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Account Created Successfully", {
          style: {
            background: "white",
            color: "green",
          },
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (err) {
        if (err.response?.data?.message)
          setErrors({ ...errors, submit: err.response?.data?.message });
        else
          toast.error("Can't sign up", {
            style: {
              background: "white",
              color: "red",
            },
          });
      }
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

    setViewCert(true);
  };
  return (
    <>
      <Toaster />
      <div className="flex flex-row min-h-screen w-full justify-center items-center bg-backGroundColor p-16">
        {viewCertForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <CertForm
              formData={certData}
              setFormData={setCertData}
              setViewCert={setViewCert}
            />
          </div>
        )}
        <div className="container border-2 border-solid bg-backGroundColor border-secondary flex flex-col items-center justify-center p-8 max-w-2xl rounded-3xl relative">
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
                name="experienceYears"
                className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
                type="number"
                placeholder="Enter a number"
                onChange={handleChange}
                value={formData.experienceYears}
                autoComplete="off"
              />
              {errors.experienceYears && (
                <ErrorMessage error={errors.experienceYears} />
              )}
            </div>

            <div className="bg-backGroundColor mb-10">
              <h6 className="text-xs text-left text-textColor mb-2">
                client Limit
              </h6>
              <input
                id="clientLimit-input"
                name="clientLimit"
                className="bg-backGroundColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-textColor placeholder-gray-500 text-left"
                type="number"
                placeholder="Enter a number"
                onChange={handleChange}
                value={formData.clientLimit}
                autoComplete="off"
              />
              {errors.clientLimit && (
                <ErrorMessage error={errors.clientLimit} />
              )}
            </div>

            <div className="bg-backGroundColor mb-5">
              <hr className="h-px mt-8 w-full bg-secondary border-0 dark:bg-secondary " />
              <div className="bg-backGroundColor flex flex-row justify-between">
                <div className="flex flex-row">
                  <CiImageOn color="gray" size={120} />
                  <div className="mt-6">
                    <p name="title" className="text-textColor">
                      {certData.title}
                    </p>
                    <p name="dateIssued" className="text-textColor">
                      {certData.dateIssued}
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
                onClick={(e) => {
                  e.preventDefault();
                  setErrors({ ...error, submit: "" });
                  handleAdd(e);
                }}
              >
                <span className="mr-2">
                  <FaPlus />
                </span>
                Add certificate
              </button>
            </div>
            {errors.postError && <ErrorMessage error={errors.postError} />}

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
          {errors.submit && <ErrorMessage error={errors.submit} />}
        </div>
      </div>
    </>
  );
}

export default FormCoach;
