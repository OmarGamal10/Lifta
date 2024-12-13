import React, { useState } from "react";
import useHttp from "../../hooks/useHTTP";

const Clients = (userId) => {
  const [clients, setClients] = useState([]);
  
  const { get } = useHttp("http://localhost:3000");
  useEffect(() => {
      const LoadClients = async () => {
        try {
          const response = await get(`/users/${userId}/getClients`);
          // Assuming response.body has these values
          setClients(response.Clients)
        } catch (err) {
          console.error(err);
          setIsAuthenticated(false); // Set as unauthenticated on error
        }
      };
  
      checkAuth();
    }, []); // Run once when the component mounts

  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 4;

  // Calculate the range of clients to display on the current page
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const handleRemove = (id) => {
    setClients(clients.filter((client) => client.id !== id));
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

  return (
    <div className="bg-backGroundColor text-textColor p-6 flex gap-16 items-center flex-col size-full">
      <h2 className="p-8 text-3xl self-start lg:text-4xl font-bold text-textColor">
        Clients
      </h2>
      <div className="flex flex-wrap gap-6">
        {currentClients.map((client) => (
          <div
            key={client.id}
            onClick={() => viewClient(client.id)}
            className="bg-backGroundColor p-6 rounded-lg w-64 text-center transition-transform duration-300 hover:scale-110 hover:bg-primary cursor-pointer"
          >
            <img
              src={client.photo}
              alt={client.name}
              className="w-28 h-28 rounded-full mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold mb-2">{client.name}</h3>
            <p className="text-textspan mb-6">{client.packageName}</p>

            <div className="flex space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the parent div's onClick from firing
                  handleRemove(client.id);
                }}
                className="bg-backGroundColor text-textColor py-3 px-6 rounded hover:bg-primary hover:text-backGroundColor transition-transform duration-300 hover:scale-110"
              >
                Remove
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the parent div's onClick from firing
                  handleAssign(client.id);
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

export default Clients;
