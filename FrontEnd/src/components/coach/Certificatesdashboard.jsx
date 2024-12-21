import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CertificateCard from "./Certificatecard";
import useHttp from "../../hooks/useHTTP";
import Loader from "../Loader";
import NoDataDashboard from "../Nodata";
import CertForm from "./certificateForm"; // Import the AddCertificate component

const CertificatesDashboard = ({ userId, isEditable }) => {
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editCertId, setEditCertId] = useState();
  const [showAddCertificate, setShowAddCertificate] = useState(false); // State to show AddCertificate
  const { get, post, patch, del, remove } = useHttp("http://localhost:3000");
  const certificatesPerPage = 3;

  useEffect(() => {
    fetchCertificates();
  }, []);

  const appendCertificate = async (trigger) => {
    if (!trigger && formData) {
      try {
        setLoading(true);
        const certificateData = { ...formData, trainer_id: userId };
        const response = await post(`/users/${userId}/certificates`, certificateData);

        // Append the new certificate to the state
        setCertificates((prevCerts) => [...prevCerts, response.data.certificate]);
        setShowAddCertificate(false); // Close the form after appending

        setError(null); // Reset error state if the request is successful
      } catch (err) {
        setError("Failed to add certificate. Please try again later.");
        console.error("Error adding certificate:", err);
      } finally {
        setLoading(false); // Stop loading state
      }
    }
  };

  const editCertificate = async (trigger) => {
    if (!trigger && formData) {
      try {
        setLoading(true);
        const certificateData = { ...formData};
        const response = await patch(`/users/${userId}/certificates/${editCertId}`, certificateData);
        
        // Update the certificates state by replacing the edited certificate
        setCertificates((prevCerts) =>
          prevCerts.map((cert) =>
            cert.certificate_id === editCertId ? response.data.certificate : cert
          )
        );
        setShowAddCertificate(false); // Close the form after editing
        setIsEditing(false);

        setError(null); // Reset error state if the request is successful
      } catch (err) {
        setError("Failed to update certificate. Please try again later.");
        console.error("Error updating certificate:", err);
      } finally {
        setLoading(false); // Stop loading state
      }
    }
  };

  const handleEdit = (cert) => {
    setFormData(cert); // Set the formData with the updated cert object
    setEditCertId(cert.certificate_id);
    setIsEditing(true);
    setShowAddCertificate(true); // Open the form to edit
  };
  const handleDelete = async (certId) => {
    try {
        setLoading(true);
        const response = await del(`/users/${userId}/certificates/${certId}`);
        
        // Update the certificates state by replacing the edited certificate
        setCertificates((prevCerts) =>
            prevCerts.filter((cert) => cert.certificate_id !== certId)
          );
        setIsEditing(false);

        setError(null); // Reset error state if the request is successful
      } catch (err) {
        setError("Failed to delete certificate. Please try again later.");
        console.error("Error deleting certificate:", err);
      } finally {
        setLoading(false); // Stop loading state
      }
        
  };

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await get(`/users/${userId}/certificates`);
      setCertificates(response.data.certificate);
      setError("");
    } catch (err) {
      setError("Failed to fetch certificates. Please try again later.");
      console.error("Error fetching certificates:", err);
    } finally {
      setLoading(false);
    }
  };
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  const currentCertificates = certificates.slice(indexOfFirstCertificate, indexOfLastCertificate);
  const totalPages = Math.ceil(certificates.length / certificatesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-error">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 flex items-center justify-center bg-gray-100">
      <div className="space-y-8 w-full max-w-6xl px-4 pb-16">
        {showAddCertificate ? (
          <CertForm
            formData={formData}
            setFormData={setFormData}
            setViewCert={isEditing ? editCertificate : appendCertificate}
          /> // Render AddCertificate if the state is true
        ) : (
          <>
            {/* Grid of Certificates */}
            {currentCertificates.length?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {currentCertificates.map((cert, index) => (
                <CertificateCard
                  key={cert.certificate_id || index} // Use cert.certificate_id or fallback to index
                  imageUrl={cert.photo}
                  title={cert.title}
                  description={cert.description}
                  dateIssued={new Date(cert.date_issued).toLocaleDateString()}
                  handleEdit={() => handleEdit(cert)}
                  handleDelete={() => handleDelete(cert.certificate_id)} 
                  id={cert.certificate_id}
                />
              ))}
            </div>
            :<NoDataDashboard header="" />}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 pt-8 pb-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full text-textColor hover:bg-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                        currentPage === pageNum
                          ? "bg-secondary text-textColor"
                          : "text-textspan hover:bg-secondary/20"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full text-textColor hover:bg-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Button to Add Certificate */}
            {isEditable && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAddCertificate(true)} // Show AddCertificate on click
                  className="px-6 py-3 bg-accent text-textColor rounded-md hover:bg-accent/90 transition-all duration-300"
                >
                  Add Certificate
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CertificatesDashboard;
