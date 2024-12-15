import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/useHTTP";
import NoDataDashboard from "../Nodata";
import Loader from "../Loader"; // Import your Loader component
import { Paginator } from "primereact/paginator";

const Clients = ({ userId }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 4;

  const { get } = useHttp("http://localhost:3000");

  useEffect(() => {
    const loadClients = async () => {
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

    loadClients();
  }, [userId]); // Ensure useEffect depends on userId

  // Calculate the range of clients to display on the current page
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const handleRemove = (trainee_id, package_id) => {
    setClients(
      clients.filter(
        (client) => client.trainee_id !== trainee_id || client.package_id !== package_id
      )
    );
  };

  const handleAssign = (id) => {
    alert(`Assigning new package to client with ID: ${id}`);
  };

  const viewClient = (trainee_id) => {
    alert(`Viewing details for client with ID: ${trainee_id}`); // Placeholder function
  };

  const onPageChange = (event) => {
    const newPage = event.page + 1; // PrimeReact uses zero-based page indexing
    setCurrentPage(newPage);
  };

  const renderClients = () => {
    if (clients.length === 0) {
      return <NoDataDashboard header="Clients Section" />;
    }

    return (
      <div className="bg-backGroundColor text-textColor p-6 flex gap-44 items-center flex-col size-full">
        <h2 className="p-8 text-3xl self-start lg:text-4xl font-bold text-textColor">
          Clients Section
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {currentClients.map((client) => (
            <div
            key={`${client.package_id}_${client.trainee_id}`}
              onClick={() => viewClient(client.trainee_id)}
              className="bg-backGroundColor border-2 border-secondary p-6 rounded-lg text-center transition-transform duration-300 hover:scale-110 hover:border-primary cursor-pointer flex flex-col"
            >
              {/* Client Photo */}
              <img
                src="src/assets/landingGym.svg" // Replace with the actual path to the client's photo if available
                alt={client.name}
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
              />

              <h3 className="text-2xl font-semibold mb-2">
                {client.first_name + " " + client.last_name}
              </h3>
              <p className="text-textspan mb-2">{client.name}</p>

              {/* Push buttons to the end */}
              <div className="flex-grow"></div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the parent div's onClick from firing
                    handleRemove(client.trainee_id, client.package_id);
                  }}
                  className="bg-backGroundColor border border-primary text-textColor py-3 px-4 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
                >
                  Remove
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the parent div's onClick from firing
                    handleAssign(client.trainee_id);
                  }}
                  className="bg-backGroundColor border border-primary text-textColor py-3 px-6 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <Paginator
            className="space-x-6"
            first={indexOfFirstClient}
            rows={clientsPerPage}
            totalRecords={clients.length}
            onPageChange={onPageChange}
            template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
          />
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
