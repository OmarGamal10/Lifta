import React from "react";
import NavBar from "../components/Navbar";
import { FaStar } from "react-icons/fa";
import useHttp from "../hooks/useHTTP";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
const BrowseCoaches = () => {
  const [ coaches, setCoaches ] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const { get } = useHttp("http://localhost:3000");

  // useEffect(() => {
  //   const getAllCoaches = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await get("/browse");
  //       setCoaches(response.body.coaches);
        
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getAllCoaches();
  // }, []); // Run once when the component mounts


  // Navigate to Packages page when Subscribe button is clicked
  const handleSubscribe = (coach_id) => {};

  const renderComponet = () => {
    <div className="bg-backGroundColor text-textColor p-6 ">
      
      <h2 className="p-8 text-3xl font-bold text-textColor">Browse Coaches</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {coaches.map((coach) => (
          <div
            key={coach.coach_id}
            className="bg-backGroundColor border-2 border-secondary p-6 rounded-lg w-64  text-center transition-transform duration-300 hover:scale-110 hover:border-primary cursor-pointer"
          >
            <h3 className="text-2xl font-semibold mb-2">{coach.coach_name}</h3>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaStar className="text-yellow-500" />
              <p className="text-textspan">Rating: {coach.coach_rating} / 5</p>
            </div>
            <p className="text-textspan mb-2">
              Experience: {coach.coach_experience_years} years
            </p>
            <div className="flex space-x-4 justify-center mt-4 ">
              <button
                onClick={() => handleSubscribe(coach.coach_id)}
                className="bg-backGroundColor border border-primary text-textColor py-3 px-4 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
              >
                Subscribe
              </button>
              <button
                onClick={() => handleRate(coach.coach_id)}
                className="bg-backGroundColor border border-primary text-textColor py-3 px-6 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
              >
                Rate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  }

  return (
    <div className="w-full">
      <NavBar />
      {loading ? <Loader /> : renderComponet()}
    </div>
  );
};

export default BrowseCoaches;
