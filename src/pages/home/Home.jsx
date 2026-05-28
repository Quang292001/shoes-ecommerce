import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";
import About from "../../components/About/About";
import Reviews from "../../components/Reviews/Reviews";
import Services from "../../components/Services/Services";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Reviews />
      <Services />
    </>
  );
}

export default Home;
