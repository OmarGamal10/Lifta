import React, { useState, useEffect } from "react";
import Certificate from "./Certificatecard"; // The card component we created earlier
import { IoIosAddCircleOutline } from "react-icons/io";
import useHttp from "../../hooks/useHTTP";
import Loader from "../Loader";
import { Toaster, toast } from "sonner";
import CertificateForm from "./certificateForm_profile";

function Certificates({ userId, isEditable }) {
  const { get, post, del, error, data } = useHttp("http://localhost:3000");
  const [curPage, setCurPage] = useState(1);
  const [certificates, setCertificates] = useState([]);
  const totalPages = Math.ceil(certificates.length / 5);
  const [addCertificateView, setAddCertificateView] = useState(false);
  const [editCertificateView, setEditCertificateView] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(isEditable);
  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const response = await get(`/users/${userId}/certificates`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response: ", response);

        const fetchedCertificate = response.data.certificate;
        setCertificates(fetchedCertificate);

        if (fetchedCertificate.length === 0) {
          setCurPage(1);
        }
      } catch (err) {
        toast.error("Error Loading Certificates", {
          style: {
            background: "white",
            color: "red",
          },
        });
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);
  useEffect(() => {
    console.log("Certificates: ", certificates);
  }, [certificates]);

  const handleDelete = async (id) => {
    try {
      const response = await del(
        "/certificates",
        {
          certificate_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setCertificates((prev) =>
        prev.filter((certificate) => certificate.certificate_id !== id)
      );
      toast.success("Certificate Deleted Successfully", {
        style: {
          background: "white",
          color: "green",
        },
      });
    } catch (err) {
      toast.error("Can't Delete Certificate", {
        style: {
          background: "white",
          color: "red",
        },
      });
    }
  };

  const handlePreviousPage = () => {
    setCurPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const renderCertificates = () => (
    <>
      {editCertificateView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <CertificateForm
            setView={setEditCertificateView}
            edit={true}
            idToEdit={idToEdit}
            setCertificates={setCertificates}
            userId={userId}
          />
        </div>
      )}
      {addCertificateView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <CertificateForm
            setCertificates={setCertificates}
            setView={setAddCertificateView}
            userId={userId}
          />
        </div>
      )}
      <div
        className={`w-full flex flex-col min-h-screen justify-center px-10 pb-3 ${
          addCertificateView || editCertificateView ? "opacity-50" : ""
        }`}
      >
        <Toaster />
        <h2 className="py-8 text-3xl self-start lg:text-4xl font-bold text-textColor">
          Certificates
        </h2>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 pb-5 pr-10">
          {certificates
            .slice((curPage - 1) * 5, curPage * 5)
            .map((certificate) => (
              <div key={certificate.certificate_id} className="cursor-pointer">
                <Certificate
                  id={certificate.certificate_id}
                  title={certificate.title}
                  photo={certificate.photo}
                  description={certificate.description}
                  dateIssued={certificate.date_issued}
                  setEditView={setEditCertificateView}
                  setIdToEdit={setIdToEdit}
                  isEditable={isEditable}
                  handleDelete={handleDelete}
                  view="edit"
                />
              </div>
            ))}
          {isEditable ? (
            <div className="flex items-center justify-center min-w-64 max-w-64 min-h-64 h-[400px]">
              <button
                onClick={() => setAddCertificateView(true)}
                className="text-primary hover:text-secondary transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg transform"
              >
                <IoIosAddCircleOutline size={100} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {certificates.length > 0 && (
          <div className="flex justify-center items-center py-2 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={curPage === 1}
              className={`px-4 py-2 rounded-xl border ${
                curPage === 1
                  ? "text-textColor cursor-not-allowed"
                  : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-textColor">
              Page {curPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={curPage === totalPages}
              className={`px-8 py-2 rounded-xl border ${
                curPage === totalPages
                  ? "text-textColor cursor-not-allowed"
                  : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="w-full">{loading ? <Loader /> : renderCertificates()}</div>
  );
}

export default Certificates;
