/* eslint-disable no-unused-vars */
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
import photo from "../assets/user-icon-on-transparent-background-free-png.webp";
import { Edit } from "lucide-react";
import { use } from "react";
import NoDataDashboard from "../components/Nodata";

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
  const [curPage, setCurPage] = useState(1);
  const totalPages = Math.ceil(coaches.length / 4);

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
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [curPage]);
  useEffect(() => {
    getAllCoaches();
  }, []); // Run once when the component mounts

  // Navigate to Packages page when Subscribe button is clicked
  const handleSubscribe = (trainer_id) => {
    navigate(`${trainer_id}/packages`);
  };

  const viewCoach = (trainer_id) => {
    navigate(`/${trainer_id}/profile`);
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

  const handlePreviousPage = () => {
    setCurPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const renderComponet = () => {
    return (
      <div>
        <div className="bg-backGroundColor text-textColor pt-6 p-12">
          <h2 className="pt-8 pb-10 text-3xl font-bold text-center text-textColor">
            Available Coaches
          </h2>
          {coaches.length ? (
            <div className="flex flex-wrap justify-center gap-16">
              {coaches.slice(curPage * 4 - 1, curPage * 4 + 3).map((coach) => (
                <div
                  key={coach.trainer_id}
                  className="bg-backGroundColor border-2 border-secondary p-6 rounded-2xl text-center transition-transform duration-300 hover:scale-110 hover:border-primary cursor-pointer"
                  onClick={() => viewCoach(coach.trainer_id)} // View coach when div is clicked
                >
                  {/* Coach Photo */}
                  <img
                    src={coach.photo || photo} // Replace with the actual URL or path to the coach's photo
                    alt={`${coach.first_name} ${coach.last_name}`}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
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
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the event from bubbling to the parent div
                        handleSubscribe(coach.trainer_id); // Local onClick function for Subscribe button
                      }}
                      className="bg-backGroundColor w-32 border border-primary text-textColor py-3 px-4 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
                    >
                      Subscribe
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the event from bubbling to the parent div
                        handleRate(coach.trainer_id, coach.review_id); // Local onClick function for Rate button
                      }}
                      className="bg-backGroundColor w-32 border border-primary text-textColor py-3 px-6 rounded-lg transition-transform duration-300 hover:bg-primary hover:border-none hover:text-backGroundColor hover:scale-110"
                    >
                      {coach.review_id ? "Edit Rating" : "Rate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoDataDashboard header="" />
          )}
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
        {coaches.length && (
          <div className=" flex justify-center items-center py-2 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={curPage === 1}
              className={`px-4 py-2 rounded-xl border ${
                curPage === 1
                  ? " text-textColor cursor-not-allowed"
                  : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-textColor">
              Page {curPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={curPage === totalPages}
              className={`px-8 py-2 rounded-xl border ${
                curPage === totalPages
                  ? "text-textColor cursor-not-allowed"
                  : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <NavBar pref={"Trainee"} />
      {loading ? <Loader /> : renderComponet()}
      <Footer />
    </div>
  );
};

export default BrowseCoaches;
