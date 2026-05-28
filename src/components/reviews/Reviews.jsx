function Reviews() {
  return (
    <div className="reviews" id="Reviews">
      <h1>custmoers's <span>Reviews</span></h1>
      <div className="reviews_box">
        <div className="review_card">
          <img src="/images/review1.png" alt="review1" />
          <h3>John Doe</h3>
          <div className="customer_star">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
