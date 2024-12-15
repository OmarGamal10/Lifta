import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer"
import { FaStar } from "react-icons/fa";
import useHttp from "../hooks/useHTTP";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
const BrowseCoaches = () => {
  const [ coaches, setCoaches ] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate = useNavigate();
  const { get } = useHttp("http://localhost:3000");

  useEffect(() => {
    const getAllCoaches = async () => {
      setLoading(true);
      try {
        const response = await get("/users/browse");
        setCoaches(response.data.coaches);        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getAllCoaches();
  }, []); // Run once when the component mounts


  // Navigate to Packages page when Subscribe button is clicked
  const handleSubscribe = (trainer_id) => {
    navigate(`${trainer_id}/packages`);
  };

  const renderComponet = () => {
    return(
      <div>
        <NavBar pref={"NotDafault"}/>
<div className="bg-backGroundColor text-textColor pt-6 pb-12">
  <h2 className="pt-8 pb-10 text-3xl font-bold text-center text-textColor">Available Coaches</h2>
  <div className="flex flex-wrap justify-center gap-32">
    {coaches.map((coach) => (
      <div
        key={coach.trainer_id}
        className="bg-backGroundColor border-2 border-secondary p-6 rounded-2xl w-64 text-center transition-transform duration-300 hover:scale-110 hover:border-primary cursor-pointer"
      >
        {/* Coach Photo */}
        <img
          src="src/assets/logo.png" // Replace with the actual URL or path to the coach's photo
          alt={`${coach.first_name} ${coach.last_name}`}
          className="w-28 h-24 rounded-full mx-auto mb-4" // Rounded photo with specific width and height
        />

        <h3 className="text-2xl font-semibold mb-2">{coach.first_name + " " + coach.last_name}</h3>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <FaStar className="text-yellow-500" />
          <p className="text-textspan">Rating: {coach.rating} / 5</p>
        </div>
        <p className="text-textspan mb-2">
          Experience: {coach.experience_years} years
        </p>
        <div className="flex space-x-4 justify-center mt-4">
          <button
            onClick={() => handleSubscribe(coach.trainer_id)}
            className="bg-backGroundColor border border-primary text-textColor py-3 px-4 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
          >
            Subscribe
          </button>
          <button
            onClick={() => handleRate(coach.trainer_id)}
            className="bg-backGroundColor border border-primary text-textColor py-3 px-6 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
          >
            Rate
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
</div>

    );
  }

  return (
    <div className="w-full">
      <NavBar />
      {loading ? <Loader /> : renderComponet()}
      <Footer />
    </div>
  );
};

export default BrowseCoaches;
