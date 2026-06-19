import Navbar from "../components/Navbar/Navbar";

import Hero from "../components/Hero/Hero";
import PropertyHighlights from "../components/PropertyHighlights/PropertyHighlights";
import Gallery from "../components/Gallery/Gallery";
import About from "../components/About/About";
import Amenities from "../components/Amenities/Amenities";
import Experience from "../components/Experience/Experience";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Neighborhood from "../components/Neighborhood/Neighborhood";
import GuestReviews from "../components/GuestReviews/GuestReviews";
import FAQ from "../components/Faq/Faq";

export default function AppRoutes() {
  return (
    <>
      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="highlights">
          <PropertyHighlights />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="amenities">
          <Amenities />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="neighborhood">
          <Neighborhood />
        </section>

        <section id="reviews">
          <GuestReviews />
        </section>

        <section id="faw">
          <FAQ />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}
