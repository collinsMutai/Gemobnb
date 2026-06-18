import "./Neighborhood.css";

const places = [
  {
    title: "Nairobi Skyline",
    category: "City Views",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
    description: "Experience the vibrant energy of Nairobi's growing skyline.",
  },
  {
    title: "Karura Forest",
    category: "Nature & Parks",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Perfect for jogging, cycling, and peaceful nature walks.",
  },
  {
    title: "Local Cafés",
    category: "Food & Coffee",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    description: "Discover artisan coffee, brunch spots, and local flavors.",
  },
  {
    title: "Nairobi National Park",
    category: "Landmark",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
    description: "A unique wildlife experience just minutes from the city.",
  },
];

export default function Neighborhood() {
  return (
    <section className="neighborhood">
      <div className="neighborhood-header">
        <h2>Explore the Neighborhood</h2>
        <p>
          Discover nearby attractions, cafés, parks, landmarks, and the local
          Nairobi lifestyle around your stay.
        </p>
      </div>

      <div className="neighborhood-grid">
        {places.map((place, index) => (
          <article className="place-card" key={index}>
            <div className="place-image">
              <img src={place.image} alt={place.title} loading="lazy" />
            </div>

            <div className="place-content">
              <span className="place-category">{place.category}</span>
              <h3>{place.title}</h3>
              <p>{place.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}