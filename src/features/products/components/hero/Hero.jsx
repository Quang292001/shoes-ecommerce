import "./Hero.css";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "NEW NIKE COLLECTION",
    subtitle: "Summer 2026",
    description:
      "Discover the newest sneakers with modern style and maximum comfort.",
    image:
      "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1423,c_limit/7d5c3fd8-3f7b-43fe-8f36-1b0f1c87f8e6/nike-just-do-it.jpg",
  },

  {
    id: 2,
    title: "RUN FASTER",
    subtitle: "Nike Air Zoom",
    description: "Designed for athletes who love speed and performance.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },

  {
    id: 3,
    title: "STREET STYLE",
    subtitle: "Urban Fashion",
    description: "Perfect sneakers for everyday outfits and streetwear lovers.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // NEXT
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // PREV
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${currentSlide === index ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        >
          <div className="overlay"></div>

          <div className="slide-content">
            <p>{slide.subtitle}</p>

            <h1>{slide.title}</h1>

            <span>{slide.description}</span>

            <button>Shop Now</button>
          </div>
        </div>
      ))}

      {/* BUTTONS */}
      <button className="prev-btn" onClick={prevSlide}>
        <i className="fa-solid fa-angle-left"></i>
      </button>

      <button className="next-btn" onClick={nextSlide}>
        <i className="fa-solid fa-angle-right"></i>
      </button>

      {/* DOTS */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? "active-dot" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default Hero;
