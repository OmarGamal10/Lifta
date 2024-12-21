import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";
import useHttp from "../hooks/useHTTP";
import { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { ReviewModalForm } from "../components/trainee/reviewModalForm";
import { jwtDecode } from "jwt-decode";
import getTokenFromCookies from "../freqUsedFuncs/getToken";
import { Edit } from "lucide-react";
import { use } from "react";

const BrowseCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate = useNavigate();
  const { get } = useHttp("http://localhost:3000");

  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const [traineeId, setTraineeId] = useState(null);
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(0);

  const dialogRef = useRef(null);


  const getAllCoaches = async () => {
    setLoading(true);
    const token = getTokenFromCookies();
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? decodedToken.user_id : null;
    setTraineeId(userId);
    try {
      const response = await get(`/users/browse/${userId}`);
      setCoaches(response.data.coaches);
      console.log(response.data.coaches);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllCoaches();
  }, []); // Run once when the component mounts

  // Navigate to Packages page when Subscribe button is clicked
  const handleSubscribe = (trainer_id) => {
    navigate(`${trainer_id}/packages`);
  };

  const handleRate = async (trainerId, reviewId) => {
    console.log(reviewId);
    if (reviewId) {
      setCurrentReviewId(reviewId);
      try {
        const response = await get(`/reviews/reviewData/${reviewId}`);
        setContent(response.data.review[0].content);
        setStars(response.data.review[0].stars);
      } catch (err) {
        console.error(err);
      }
    }
    setSelectedTrainerId(trainerId);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setSelectedTrainerId(null);
    setCurrentReviewId(null);
    setContent("");
    setStars(0);
    getAllCoaches();
  };

  const renderComponet = () => {
    return (
      <div>
        <div className="bg-backGroundColor text-textColor pt-6 pb-12">
          <h2 className="pt-8 pb-10 text-3xl font-bold text-center text-textColor">
            Available Coaches
          </h2>
          <div className="flex flex-wrap justify-center gap-32">
            {coaches.map((coach) => (
              <div
                key={coach.trainer_id}
                className="bg-backGroundColor border-2 border-secondary p-6 rounded-2xl text-center transition-transform duration-300 hover:scale-110 hover:border-primary cursor-pointer"
              >
                {/* Coach Photo */}
                <img
                  src="src/assets/logo.png" // Replace with the actual URL or path to the coach's photo
                  alt={`${coach.first_name} ${coach.last_name}`}
                  className="w-28 h-24 rounded-full mx-auto mb-4" // Rounded photo with specific width and height
                />

                <h3 className="text-2xl font-semibold mb-2">
                  {coach.first_name + " " + coach.last_name}
                </h3>
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
                    className="bg-backGroundColor w-32 border border-primary text-textColor py-3 px-4 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
                  >
                    Subscribe
                  </button>
                  <button
                    onClick={() =>
                      handleRate(coach.trainer_id, coach.review_id)
                    }
                    className="bg-backGroundColor w-32 border border-primary text-textColor py-3 px-6 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
                  >
                    {coach.review_id ? "Edit Rating" : "Rate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <dialog
            ref={dialogRef}
            className="p-6 rounded-lg w-full max-w-md bg-textColor text-backGroundColor"
            onCancel={handleCloseModal}
          >
            {currentReviewId != null ? (
              <ReviewModalForm
                isEdit={1}
                reviewId={currentReviewId}
                content={content}
                stars={stars}
                handleCloseModal={handleCloseModal}
              />
            ) : (
              <ReviewModalForm
                isEdit={0}
                trainerId={selectedTrainerId}
                handleCloseModal={handleCloseModal}
              />
            )}
          </dialog>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <NavBar pref={"NotDafault"} />
      {loading ? <Loader /> : renderComponet()}
      <Footer />
    </div>
  );
};

export default BrowseCoaches;
