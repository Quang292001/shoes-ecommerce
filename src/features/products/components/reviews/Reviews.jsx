import React from "react";
import "./Reviews.css";

import ReviewCard from "./ReviewCard";
function Reviews() {
  return (
    <div className="review" id="Reviews">
      <h1>
        customers' <span>Reviews</span>
      </h1>
      <div className="review_box">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
}

export default Reviews;
