import "./Hero.css";
import bg from "../../assets/image/bg1.png";
import shoes from "../../assets/image/shoes.png";
function Hero() {
  return (
    <section
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="main" id="Home">
        <div className="main_content">
          <div className="main_text">
            <h1>
              NIKE <br />
              <span>Collection</span>
            </h1>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className="main_image">
            <img src={shoes} alt="nike shoes" />
          </div>
        </div>

        <div className="main_social">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin-in"></i>
        </div>

        <div className="button">
          <a href="#Products">Shop Now</a>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </section>
  );
}

export default Hero;
