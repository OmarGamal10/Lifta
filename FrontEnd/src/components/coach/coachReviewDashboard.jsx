import { useEffect, useState, useRef } from "react";
import { CoachReviewCard } from "./coachReviewCard";
import useHttp from "../../hooks/useHTTP";
import NoDataDashboard from "../Nodata";

export function CoachReviewDashboard() {
  
    const { get, patch, error, data } = useHttp("http://localhost:3000");
    const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`/users/61/reviews`, {
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
          <CoachReviewCard
            key={review.review_id}
            traineeId={review.trainee_id}
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
