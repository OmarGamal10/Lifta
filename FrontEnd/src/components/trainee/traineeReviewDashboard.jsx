import { useEffect, useState, useRef } from "react";
import useHttp from "../../hooks/useHTTP";
import { TraineeReviewCard } from "./traineeReviewCard";
import NoDataDashboard from "../Nodata";

export function TraineeReviewDashboard() {
  const { get, patch, error, data } = useHttp("http://localhost:3000");
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await get(`/reviews/86`, {
        headers: { "Cache-Control": "no-cache" },
      });
      setReviews(response.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="container mx-auto p-12">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-16 w-full">
          {reviews.map((review) => (
            <TraineeReviewCard
              key={review.review_id}
              reviewId={review.review_id}
              coachId={review.trainer_id}
              firstName={review.first_name}
              lastName={review.last_name}
              content={review.content}
              stars={review.stars}
              fetchData={fetchData}
              className="h-full" // Ensures cards have equal height
            />
          ))}
        </div>
        {reviews.length === 0 && <NoDataDashboard header="Reviews Available" />}
      </div>
  );
}
