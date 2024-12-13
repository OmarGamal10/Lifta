import React from "react";
import { useHistory } from "react-router-dom"; // for navigation

const BrowseCoaches = () => {
  const history = useHistory();

  // Hardcoded array of coaches
  const coaches = [
    { coach_id: 1, coach_name: "John Doe", coach_rating: 4.5, coach_experience_years: 5 },
    { coach_id: 2, coach_name: "Jane Smith", coach_rating: 4.7, coach_experience_years: 6 },
    { coach_id: 3, coach_name: "Jim Brown", coach_rating: 4.3, coach_experience_years: 4 },
    { coach_id: 4, coach_name: "Alice Johnson", coach_rating: 4.8, coach_experience_years: 7 },
    { coach_id: 5, coach_name: "Bob Lee", coach_rating: 4.2, coach_experience_years: 3 },
    { coach_id: 6, coach_name: "Cathy White", coach_rating: 4.6, coach_experience_years: 8 },
    { coach_id: 7, coach_name: "David Wilson", coach_rating: 4.1, coach_experience_years: 2 },
    { coach_id: 8, coach_name: "Eva Green", coach_rating: 4.9, coach_experience_years: 9 },
    { coach_id: 9, coach_name: "Frank Black", coach_rating: 4.4, coach_experience_years: 5 },
    { coach_id: 10, coach_name: "Grace Adams", coach_rating: 4.0, coach_experience_years: 1 },
    { coach_id: 11, coach_name: "Henry King", coach_rating: 4.6, coach_experience_years: 7 },
    { coach_id: 12, coach_name: "Isabel Harris", coach_rating: 4.3, coach_experience_years: 6 },
    { coach_id: 13, coach_name: "Jack Moore", coach_rating: 4.5, coach_experience_years: 8 },
    { coach_id: 14, coach_name: "Kathy Brown", coach_rating: 4.7, coach_experience_years: 10 },
    { coach_id: 15, coach_name: "Liam James", coach_rating: 4.2, coach_experience_years: 4 },
    { coach_id: 16, coach_name: "Megan Clark", coach_rating: 4.8, coach_experience_years: 5 },
    { coach_id: 17, coach_name: "Nathan Turner", coach_rating: 4.4, coach_experience_years: 3 },
    { coach_id: 18, coach_name: "Olivia White", coach_rating: 4.9, coach_experience_years: 9 },
    { coach_id: 19, coach_name: "Peter King", coach_rating: 4.1, coach_experience_years: 6 },
    { coach_id: 20, coach_name: "Quincy Scott", coach_rating: 4.5, coach_experience_years: 7 },
  ];

  // Navigate to Packages page when Subscribe button is clicked
  const handleSubscribe = (coach_id) => {
    history.push(`/packages/${coach_id}`);
  };

  return (
    <div className="bg-backGroundColor text-textColor p-6">
      <h2 className="p-8 text-3xl font-bold text-textColor">Browse Coaches</h2>
      <div className="flex flex-wrap gap-6">
        {coaches.map((coach) => (
          <div
            key={coach.coach_id}
            className="bg-backGroundColor p-6 rounded-lg w-64 text-center transition-transform duration-300 hover:scale-110 hover:bg-primary cursor-pointer"
          >
            <h3 className="text-2xl font-semibold mb-2">{coach.coach_name}</h3>
            <p className="text-textspan mb-2">Rating: {coach.coach_rating} / 5</p>
            <p className="text-textspan mb-2">Experience: {coach.coach_experience_years} years</p>
            <button
              onClick={() => handleSubscribe(coach.coach_id)}
              className="bg-primary text-backGroundColor py-3 px-6 rounded mt-4 hover:bg-accent transition-transform duration-300 hover:scale-110"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCoaches;
