import "./Neighborhood.css";

const places = [
  {
    title: "Runda Mall",
    category: "Shopping",
    image:
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=740&q=80",
    description:
      "Enjoy convenient shopping, restaurants, cafés, and everyday essentials.",
    distance: "5 mins drive",
  },
  {
    title: "Ridgeways Mall",
    category: "Shopping & Lifestyle",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=740&q=80",
    description:
      "Explore shopping outlets, restaurants, supermarkets, and entertainment.",
    distance: "5 mins drive",
  },
  {
    title: "Local Churches",
    category: "Worship & Community",
    image:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=740&q=80",
    description:
      "Convenient access to nearby churches and welcoming worship communities.",
    distance: "5–10 mins drive",
  },
  {
    title: "Nairobi Skyline",
    category: "City Views",
    image:
      "https://img.magnific.com/premium-photo/nairobi-city-county-kenyas-capital-cityscapes-skyline-skyscrapers-highrise-buildings-architecture_257688-271.jpg?semt=ais_hybrid&w=740&q=80",
    description: "Experience the vibrant energy of Nairobi's growing skyline.",
    distance: "20 mins drive",
  },
  {
    title: "Karura Forest",
    category: "Nature & Parks",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUbI_4WKbiY7s68w3uardQmKrDw_9rizyKHjGae6MM3Y0o7b9fedI9MI&s=10",
    description: "Perfect for jogging, cycling, and peaceful nature walks.",
    distance: "10 mins drive",
  },
  {
    title: "Local Cafés",
    category: "Food & Coffee",
    image:
      "https://d29bhihuvvyjsm.cloudfront.net/uploads/java-house-nairobi-1760317642.jpg",
    description: "Discover artisan coffee, brunch spots, and local flavors.",
    distance: "2 mins drive",
  },
  {
    title: "Nairobi National Park",
    category: "Landmark",
    image:
      "https://www.glamping-kenya.com/site/assets/files/6661/nairobi-national-park-.jpg",
    description: "A unique wildlife experience just minutes from the city.",
    distance: "35 mins drive",
  },
  {
    title: "Two Rivers Mall",
    category: "Shopping",
    image:
      "https://i0.wp.com/www.constructionkenya.com/wp-content/uploads/2019/03/Two-Rivers-Mall-Ferris-Wheel.jpg?resize=740%2C410&ssl=1",
    description: "One of Nairobi’s largest shopping and entertainment hubs.",
    distance: "8 mins drive",
  },
  {
    title: "Village Market",
    category: "Shopping",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4bPeq4Wfe_D0p75U4kNNlotfLeefG4gXY5rXv8EHAsPf_kBGo6azfqU0&s=10",
    description: "Premium shopping, dining, and lifestyle destination.",
    distance: "12 mins drive",
  },
  {
    title: "Nairobi CBD",
    category: "City Center",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqUMZjB2f1pr4LGn-0baU_ivgkBeA-dsdMJ2DwjryaUbpvkVbnZnlPreQ&s=10",
    description: "Business district with restaurants, offices, and nightlife.",
    distance: "20 mins drive",
  },
  {
    title: "JKIA Airport",
    category: "Travel Hub",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-X1WHI-IHIPV3IipvCdV18ok_pSuh9TmSsOV25K0CifRYIWN5skkx1qa&s=10",
    description: "Main international airport for easy global access.",
    distance: "35 mins drive",
  },
];

export default function Neighborhood() {
  return (
    <section className="neighborhood">
      <div className="neighborhood-header">
        <h2>Explore the Neighborhood</h2>
        <p>
          Discover nearby attractions, cafés, parks, landmarks, and the local
          Nairobi lifestyle around your stay in Thindigua, Kiambu Road.
        </p>
      </div>

      <div className="neighborhood-grid">
        {places.map((place, index) => (
          <article className="place-card" key={index}>
            <div className="place-image">
              <img src={place.image} alt={place.title} loading="lazy" />
            </div>

            <div className="place-content">
              {/* CATEGORY + DISTANCE INLINE */}
              <div className="place-meta">
                <span className="place-category">{place.category}</span>

                {place.distance && (
                  <span className="place-distance-inline">
                    {place.distance}
                  </span>
                )}
              </div>

              <h3>{place.title}</h3>
              <p>{place.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
