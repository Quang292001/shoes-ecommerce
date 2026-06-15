import React from "react";
import "./Reviews.css";
import { useLanguage } from "../../../../context/LanguageContext";
import ReviewCard from "./ReviewCard";
function Reviews() {
  const {t} =useLanguage();
  return (
    <div className="review" id="Reviews">
      <h1>
        {t.customers}<span>{t.reviews}</span>
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
