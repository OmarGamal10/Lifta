import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/useHTTP";
import NoDataDashboard from "../Nodata";
import Loader from "../Loader"; // Import your Loader component
import { Paginator } from "primereact/paginator";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const Clients = ({ userId }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState({
    clientId: null,
    type: null,
  });
  const navigate = useNavigate();
  const clientsPerPage = 4;

  const { get } = useHttp("http://localhost:3000");
  const { patch } = useHttp("http://localhost:3000");

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
    const RemoveClient = async () => {
      setLoading(true); // Show loader when API call starts
      try {
        const response = await patch(
          `/users/${userId}/clients/${trainee_id}/${package_id}`,
          {
            data: {},
          }
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Hide loader after API call finishes
      }
    };

    RemoveClient();
    setClients(
      clients.filter(
        (client) =>
          client.trainee_id !== trainee_id || client.package_id !== package_id
      )
    );
  };

  const viewClient = (trainee_id) => {
    // Placeholder function
  };

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1); // PrimeReact uses zero-based page indexing
  };

  const renderClients = () => {
    if (clients.length === 0) {
      return <NoDataDashboard header="Clients Section" />;
    }

    const openModal = (clientId, type) => {
      setSelectedClient({
        clientId,
        type,
      });
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedClient({
        clientId: null,
        type: null,
      });
    };

    const handleAssignWorkout = () => {
      navigate("/coach/workouts", {
        state: { clientId: selectedClient.clientId, userId },
      });
      closeModal();
    };

    const handleAssignMeal = () => {
      navigate("/coach/meals", {
        state: { clientId: selectedClient.clientId, userId },
      });
      closeModal();
    };

    return (
      <>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          contentLabel="Assign Options"
        >
          <div className="relative p-6 rounded-lg shadow-lg w-80 text-center bg-textColor bg-opacity-50 ">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Assign</h2>
            {(selectedClient.type === "Gym" ||
              selectedClient.type === "Both") && (
              <button
                onClick={handleAssignWorkout}
                className="bg-primary text-white py-2 px-4 rounded m-2 w-full hover:bg-secondary duration-300"
              >
                Workout
              </button>
            )}
            {(selectedClient.type === "Nutrition" ||
              selectedClient.type === "Both") && (
              <button
                onClick={handleAssignMeal}
                className="bg-primary text-white py-2 px-4 rounded m-2 w-full hover:bg-secondary duration-300"
              >
                Meal
              </button>
            )}
          </div>
        </Modal>
        <div
          className={`bg-backGroundColor text-textColor p-6 flex gap-44 items-center flex-col size-full ${
            isModalOpen ? "opacity-50" : ""
          }`}
        >
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
                  src={`${
                    client.photo ? client.photo : "src/assets/landingGym.svg"
                  }`} // Replace with the actual path to the client's photo if available
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
                      openModal(client.trainee_id, client.type);
                    }}
                    className="bg-backGroundColor border border-primary text-textColor py-3 px-6 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
                  >
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Paginator
              first={indexOfFirstClient}
              rows={clientsPerPage}
              totalRecords={clients.length}
              onPageChange={onPageChange}
              template={{
                layout: "PrevPageLink CurrentPageReport NextPageLink",
                PrevPageLink: (options) => (
                  <button
                    type="button"
                    className={`p-paginator-prev p-paginator-element p-link ${options.className}`}
                    onClick={options.onClick}
                    disabled={options.disabled}
                  >
                    <span className="p-paginator-icon pi pi-angle-left"></span>
                  </button>
                ),
                NextPageLink: (options) => (
                  <button
                    type="button"
                    className={`p-paginator-next p-paginator-element p-link ${options.className}`}
                    onClick={options.onClick}
                    disabled={options.disabled}
                  >
                    <span className="p-paginator-icon pi pi-angle-right"></span>
                  </button>
                ),
                CurrentPageReport: (options) => (
                  <span className="p-paginator-current">
                    {options.first} - {options.last} of {options.totalRecords}
                  </span>
                ),
              }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full">
      {loading ? <Loader /> : renderClients()} {/* Show Loader while loading */}
    </div>
  );
};

export default Clients;
