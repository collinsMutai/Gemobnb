import "./Experience.css";

const experiences = [
  {
    title: "Golden Nairobi Sunsets",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    description:
      "Unwind with breathtaking sunset views from your balcony overlooking the Kiambu Road skyline.",
  },
  {
    title: "Morning Coffee Moments",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    description:
      "Start your day with freshly brewed coffee and a peaceful breakfast before exploring Nairobi.",
  },
  {
    title: "Cozy Evenings",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    description:
      "Soft lighting, comfortable furnishings, and a relaxing atmosphere make every evening memorable.",
  },
  {
    title: "Feel at Home",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
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