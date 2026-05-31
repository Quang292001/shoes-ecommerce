import "./About.css";
import red_shoes1 from "../../../../assets/image/red_shoes1.png";
import red_shoes2 from "../../../../assets/image/red_shoes2.png";
import red_shoes3 from "../../../../assets/image/red_shoes3.png";
import red_shoes4 from "../../../../assets/image/red_shoes4.png";

function About() {
  return (
    <div className="about" id="About">
      <h1>
        Web<span>About</span>
      </h1>
      <div className="about_main">
        <div className="about_image">
          <div className="about_small_image">
            <img
              src={red_shoes1}
              alt="About Image 2"
              onClick={(e) => {
                const full = document.getElementById("imagebox");
                full.src = e.target.src;
              }}
            />
            <img
              src={red_shoes2}
              alt="About Image 3"
              onClick={(e) => {
                const full = document.getElementById("imagebox");
                full.src = e.target.src;
              }}
            />
            <img
              src={red_shoes3}
              alt="About Image 4"
              onClick={(e) => {
                const full = document.getElementById("imagebox");
                full.src = e.target.src;
              }}
            />
            <img
              src={red_shoes4}
              alt="About Image 5"
              onClick={(e) => {
                const full = document.getElementById("imagebox");
                full.src = e.target.src;
              }}
            />
          </div>
          <div className="image_container">
            <img src={red_shoes1} id="imagebox" />
          </div>
        </div>
        <div className="about_text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            illum nesciunt dicta cumque minus vitae, animi reprehenderit sunt!
            Ea harum, iure cupiditate omnis nulla nihil modi doloribus, veniam
            ullam officia saepe dicta beatae quam, et rerum atque ad! Temporibus
            architecto voluptatibus laudantium unde non corrupti distinctio
            nulla iure velit inventore!
          </p>
        </div>
      </div>
      <div className="btn_container">
        <a href="" className="about_btn">
          Show now
        </a>
      </div>
    </div>
  );
}

export default About;
