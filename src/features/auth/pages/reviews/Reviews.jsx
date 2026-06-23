import React from 'react'
import Navbar from '../../../../shared/layout/navbar/Navbar'
import Footer from '../../../../shared/layout/footer/Footer';
import './Reviews.css'
import { useLanguage } from '../../../../context/LanguageContext';
function Reviews() {
  const {t}=useLanguage();
   const reviews = [
    {
      id: 1,
      name: "John Smith",
      image: "https://i.pravatar.cc/150?img=1",
      review:
        "Amazing quality and super comfortable shoes. I really love the design and fast delivery.",
    },

    {
      id: 2,
      name: "Sophia Lee",
      image: "https://i.pravatar.cc/150?img=5",
      review:
        "The customer service was excellent and the shoes fit perfectly. Highly recommended!",
    },

    {
      id: 3,
      name: "Michael Brown",
      image: "https://i.pravatar.cc/150?img=8",
      review:
        "Affordable price with premium quality. Definitely buying again soon.",
    },
  ];
  return (
    <>
      <Navbar />
      <section className="reviews" id="Reviews">
      <h1>
        {t.customer} <span>{t.reviews}</span>
      </h1>

      <div className="reviews-container">
        {reviews.map((item) => (
          <div className="review-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <h2>{item.name}</h2>

            <div className="review-stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>

            <p>{item.review}</p>
          </div>
        ))}
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default Reviews
