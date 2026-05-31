import "./Reviews.css";

import profile from "../../../../assets/image/girl_dp1.jpg";
function ReviewCard() {
  return (
    <div className="review_card">
      <div className="card_top">
        <div className="profile">
          <div className="profile_image">
            <img src={profile} alt="profile" />
          </div>
          <div className="name">
            <strong>John Doe</strong>
            <div className="like">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="comment">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          voluptate.
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;
