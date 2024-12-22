import { useState, useRef, useEffect } from "react";
import "../output.css";
import { BsUpload } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import { Toaster, toast } from "sonner";
import ErrorMessage from "../errorMsg";
import handleImages from "../../freqUsedFuncs/handleImages";
import useHttp from "../../hooks/useHTTP";

function CertForm({
  edit = false,
  setCertificates,
  setView,
  idToEdit,
  userId,
}) {
  const { post, get, patch, loading, error, data } = useHttp(
    "http://localhost:3000"
  );

  const [formData, setFormData] = useState({
    title: "",
    dateIssued: "",
    description: "",
    photo: "",
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (edit) {
      const fetchCertificate = async () => {
        try {
          const response = await get(`/certificates/${idToEdit}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setFormData(response.data.certificate);
          console.log(response);
        } catch (err) {
          console.log(err);
          toast.error("Error loading certificate", {
            style: {
              background: "white",
              color: "red",
            },
          });
        }
      };
      fetchCertificate();
    }
  }, []);

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

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        try {
          const photoUrl = await handleImages(file);
          if (photoUrl) {
            setFormData((prevData) => ({
              ...prevData,
              photo: photoUrl,
            }));
            setErrors((prev) => {
              const { photo, ...rest } = prev;
              return rest;
            });
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              photo: "Error uploading photo.",
            }));
          }
        } catch (err) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            photo: "Error uploading photo.",
          }));
        }
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

    if (!edit) {
      try {
        const response = await post(
          "/certificates",
          {
            ...formData,
            trainer_id: userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setCertificates((prev) => [
          ...prev,
          {
            certificate_id: response.data.certificate.certificate_id,
            title: response.data.certificate.title,
            description: response.data.certificate.description,
            date_issued: response.data.certificate.date_issued,
            photo: response.data.certificate.photo,
          },
        ]);
        toast.success("Certificate Added Successfully", {
          style: {
            background: "white",
            color: "green",
          },
        });
        setView(false);
      } catch (err) {
        toast.error("Error adding certificate", {
          style: {
            background: "white",
            color: "red",
          },
        });
        console.log(err);
      }
    } else {
      try {
        const response = await patch(
          `/certificates/${idToEdit}`,
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

        setCertificates((prev) =>
          prev.map((certificate) =>
            certificate.certificate_id === idToEdit
              ? {
                  certificate_id: response.data.certificate.certificate_id,
                  title: response.data.certificate.title,
                  description: response.data.certificate.description,
                  date_issued: response.data.certificate.date_issued,
                  photo: response.data.certificate.photo,
                }
              : certificate
          )
        );
        toast.success("Certificate Updated Successfully", {
          style: {
            background: "white",
            color: "green",
          },
        });
        setView(false);
      } catch (err) {
        toast.error("Error updating certificate", {
          style: {
            background: "white",
            color: "red",
          },
        });
        console.log(err);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      dateIssued: "",
      description: "",
      photo: "",
    });
    setView(false);
  };

  return (
    <div
      name="certForm"
      className="border-2 border-solid bg-textColor border-secondary flex flex-col items-center justify-center p-8 w-[500px] rounded-3xl relative"
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors duration-200"
      >
        <BsX size={30} />
      </button>
      <h1 className="text-3xl font-bold">
        {edit ? "Edit" : "New"} Certificate
      </h1>
      <form
        onSubmit={handleSubmit}
        className="py-6 px-10 w-full"
        autoComplete="off"
      >
        <div className="mb-6">
          <h6 className="text-xs text-left text-backGroundColor mb-2">Title</h6>
          <input
            id="title-input"
            name="title"
            className="bg-textColor border pl-4 w-full rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left"
            type="text"
            placeholder="Enter certificate title"
            maxLength="30"
            onChange={handleChange}
            value={formData.title}
            autoComplete="off"
          />
          {errors.title && <ErrorMessage error={errors.title} />}
        </div>

        <div className="mb-6">
          <h6 className="text-xs text-left text-backGroundColor mb-2">
            Description
          </h6>
          <textarea
            id="description"
            name="description"
            className="bg-textColor border px-4 w-full h-24 rounded-xl border-secondary py-4 text-sm text-backGroundColor placeholder-gray-500 text-left resize-none"
            placeholder="Certificate details"
            maxLength="250"
            onChange={handleChange}
            value={formData.description}
            autoComplete="off"
          />
          {errors.description && <ErrorMessage error={errors.description} />}
        </div>

        <div className="mb-6">
          <h6 className="text-xs text-left text-backGroundColor mb-2">
            Issue Date
          </h6>
          <input
            type="date"
            id="dateIssued"
            name="dateIssued"
            className="bg-textColor border pl-4 w-1/2 rounded-xl border-secondary py-4 text-sm text-backGroundColor text-left"
            onChange={handleChange}
            value={formData.dateIssued}
            autoComplete="off"
          />
          {errors.dateIssued && <ErrorMessage error={errors.dateIssued} />}
        </div>

        {!edit && (
          <div className="mb-6">
            <button
              type="button"
              className="w-1/2 bg-primary text-sm px-3 rounded-xl py-4 flex flex-row justify-center gap-2 align-middle hover:text-textColor"
              onClick={handleUploadButtonClick}
            >
              <span>
                <BsUpload size={25} />
              </span>
              Upload Photo
            </button>
            <input
              type="file"
              name="photo"
              accept="image/jpeg, image/png, image/jpg"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
            {errors.photo && <ErrorMessage error={errors.photo} />}
          </div>
        )}

        <div className="w-full flex justify-center">
          <div className="w-1/2 mt-5">
            <button
              type="submit"
              className="bg-secondary w-full text-textColor text-sm rounded-xl py-4 border hover:border-secondary hover:bg-textColor hover:text-secondary"
            >
              {edit ? "Confirm Changes" : "Add Certificate"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CertForm;
