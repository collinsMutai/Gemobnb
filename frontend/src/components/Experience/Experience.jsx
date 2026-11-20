import "./Experience.css";
import img17 from "../../assets/img17.jpeg";
import img27 from "../../assets/img27.jpeg";

const experiences = [
  {
    title: "Golden Nairobi Sunsets",
    image:
      "https://miro.medium.com/v2/resize:fit:1020/1*DJUma2x0HYJIJv-NxiM3iA.jpeg",
    description:
      "Unwind with breathtaking sunset views from your balcony overlooking the Kiambu Road skyline.",
  },
  {
    title: "Morning Coffee Moments",
    image:
      "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/apartment/wp-content/uploads/sites/13/2023/07/blog-01-1024x683.jpg",
    description:
      "Start your day with freshly brewed coffee and a peaceful breakfast before exploring Nairobi.",
  },
  {
    title: "Cozy Evenings",
    image:
      img17,
    description:
      "Soft lighting, comfortable furnishings, and a relaxing atmosphere make every evening memorable.",
  },
  {
    title: "Feel at Home",
    image:
      img27,
    description:
      "Thoughtfully designed spaces that balance comfort, productivity, and modern living.",
  },
];

export default function Experience() {
  return (
    <section className="experience">
      <div className="experience-header">
        <span className="experience-tag">
          The GemoBnB Experience
        </span>

        <h2>More Than a Stay</h2>

        <p>
          Located in Thindigua along Kiambu Road, GemoBnB offers
          comfortable urban living with easy access to Nairobi's
          attractions, business hubs, cafés, and nature escapes.
        </p>
      </div>

      <div className="experience-grid">
        {experiences.map((item, index) => (
          <article className="experience-card" key={index}>
            <div className="experience-image">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
            </div>

            <div className="experience-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}