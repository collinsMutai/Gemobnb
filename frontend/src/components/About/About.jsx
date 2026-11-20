import "./About.css";
import { CheckCircle } from "lucide-react";
import img21 from "../../assets/img21.jpeg";


const features = [
  "Modern & fully furnished apartment",
  "Ideal for business travelers and digital nomads",
  "Minutes from Two Rivers Mall & Ridgeways Mall",
  "Easy access to Nairobi CBD",
  "Close to Karura Forest",
  "Perfect for couples and staycations",
];

export default function About() {
  return (
    <section className="about">
      <div className="about-content">
        <span className="section-tag">About GemoBnB</span>

        <h2>Your Modern Escape Along Kiambu Road</h2>

        <p className="about-intro">
          Welcome to GemoBnB, a stylish and comfortable one-bedroom apartment
          located in Thindigua along Kiambu Road. Designed for modern
          travelers, remote workers, couples, and business professionals, the
          space offers everything you need for a relaxing and productive stay.
        </p>

        <p>
          Enjoy easy access to Nairobi's top destinations including shopping
          malls, restaurants, entertainment hubs, and nature escapes while
          staying in a peaceful and secure neighborhood.
        </p>

        <div className="about-features">
          {features.map((feature, index) => (
            <div className="feature-item" key={index}>
              <CheckCircle size={18} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="about-image">
        <img
          src={img21}
          alt="GemoBnB apartment interior"
        />
      </div>
    </section>
  );
}