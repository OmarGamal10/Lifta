/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import "../output.css"; // Adjust the path as needed

function AdminUserTypeForm({ setType, setFormData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setType(e.target.name);
    setFormData((prevData) => ({
      ...prevData,
      type: e.target.name === "Coach" ? "Trainer" : (e.target.name === "Trainee" ? "Trainee" : "Admin"),
    }));
  };

  return (
    <div className="container mx-auto w-full md:w-[500px] px-4 flex items-center justify-center min-h-screen">
      <div className="border-2 border-solid bg-textColor border-secondary flex flex-col items-center justify-center p-8 w-full max-w-md rounded-3xl">
        <h1 className="text-3xl font-bold mb-10">Add a User</h1>
        <div className="flex flex-col w-full">
          <h2 className="text-xl text-left font-medium mb-5">
            Choose User Type
          </h2>
          <button
            name="Coach"
            className="text-textColor font-bold border bg-secondary py-3 rounded-xl mb-4 hover:bg-textColor hover:border-secondary hover:text-secondary"
            onClick={handleSubmit}
          >
            Coach
          </button>
          <button
            name="Trainee"
            className="text-textColor font-bold border bg-secondary py-3 rounded-xl mb-4 hover:bg-textColor hover:border-secondary hover:text-secondary"
            onClick={handleSubmit}
          >
            Trainee
          </button>
          <button
            name="Admin"
            className="text-textColor font-bold border bg-secondary py-3 rounded-xl mb-4 hover:bg-textColor hover:border-secondary hover:text-secondary"
            onClick={handleSubmit}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminUserTypeForm;
