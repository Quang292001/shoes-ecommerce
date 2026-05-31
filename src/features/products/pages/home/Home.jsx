import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Products";
import About from "../../components/about/About";
import Reviews from "../../components/reviews/Reviews";
import Services from "../../components/services/Services";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Reviews />
      <Services />
      <Footer />
    </>
  );
}

export default Home;