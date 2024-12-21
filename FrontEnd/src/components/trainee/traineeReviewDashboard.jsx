import { useEffect, useState, useRef } from "react";
import useHttp from "../../hooks/useHTTP";
import { TraineeReviewCard } from "./traineeReviewCard";
import NoDataDashboard from "../Nodata";
import { jwtDecode } from "jwt-decode";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";

export function TraineeReviewDashboard() {
  const { get, patch, error, data } = useHttp("http://localhost:3000");
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    const token = getTokenFromCookies();
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? decodedToken.user_id : null;
    
    try {
      const response = await get(`/reviews/${userId}`, {
        headers: { "Cache-Control": "no-cache" },
      });
      setReviews(response.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-12">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-16 w-full">
        {reviews.map((review) => (
          <TraineeReviewCard
            key={review.review_id}
            coachId={review.trainer_id}
            firstName={review.first_name}
            lastName={review.last_name}
            content={review.content}
            stars={review.stars}
            className="h-full" // Ensures cards have equal height
          />
        ))}
      </div>
      {reviews.length === 0 && <NoDataDashboard header="Reviews Available" />}
    </div>
  );
}
