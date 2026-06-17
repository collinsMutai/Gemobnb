import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <h2>
          Featured Properties Coming Soon
        </h2>
      </section>
    </>
  );
}