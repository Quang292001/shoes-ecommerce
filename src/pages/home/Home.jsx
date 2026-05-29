import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";
import About from "../../components/About/About";
import Reviews from "../../components/Reviews/Reviews";
import Services from "../../components/Services/Services";
import Footer from "../../components/footer/Footer";
import Login from "../Login/Login";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Reviews />
      <Services />
      <Login />
      <Footer />
    </>
  );
}

export default Home;
