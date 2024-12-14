import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/useHTTP";
import NoDataDashboard from "../Nodata";
import Loader from "../Loader"; // Import your Loader component

const Clients = ({ userId }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  const { get } = useHttp("http://localhost:3000");

  useEffect(() => {
    const LoadClients = async () => {
      setLoading(true); // Show loader when API call starts
      try {
        const response = await get(`/users/${userId}/clients`);
        setClients(response.data.clients);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Hide loader after API call finishes
      }
    };

    LoadClients();
  }, [userId]); // Ensure useEffect depends on userId

  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 4;

  // Calculate the range of clients to display on the current page
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const handleRemove = (trainee_id) => {
    setClients(clients.filter((client) => client.trainee_id !== trainee_id));
  };

  const handleAssign = (id) => {
    alert(`Assigning new package to client with ID: ${id}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderClients = () => {
    if (clients.length === 0) return <NoDataDashboard header="Clients Section" />;
    return (
      <div className="bg-backGroundColor text-textColor p-6 flex gap-16 items-center flex-col size-full">
        <h2 className="p-8 text-3xl self-start lg:text-4xl font-bold text-textColor">
          Clients Section
        </h2>
        <div className="flex flex-wrap gap-6">
          {currentClients.map((client) => (
            <div
              key={client.trainee_id}
              onClick={() => viewClient(client.trainee_id)}
              className="bg-backGroundColor p-6 rounded-lg w-64 text-center transition-transform duration-300 hover:scale-110 hover:bg-primary cursor-pointer"
            >
              <img
                src="src/assets/landingGym.svg"
                alt={client.name}
                className="w-28 h-28 rounded-full mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2">
                {client.first_name + " " + client.last_name}
              </h3>
              <p className="text-textspan mb-6">{client.name}</p>

              <div className="flex space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div's onClick from firing
                    handleRemove(client.trainee_id);
                  }}
                  className="bg-backGroundColor text-textColor py-3 px-6 rounded hover:bg-primary hover:text-backGroundColor transition-transform duration-300 hover:scale-110"
                >
                  Remove
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div's onClick from firing
                    handleAssign(client.trainee_id);
                  }}
                  className="bg-backGroundColor text-textColor py-3 px-6 rounded hover:bg-primary hover:text-backGroundColor transition-transform duration-300 hover:scale-110"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-backGroundColor text-textColor py-2 px-4 rounded hover:bg-primary transition-all duration-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-backGroundColor text-textColor py-2 px-4 rounded hover:bg-primary transition-all duration-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {loading ? <Loader /> : renderClients()} {/* Show Loader while loading */}
    </div>
  );
};

export default Clients;