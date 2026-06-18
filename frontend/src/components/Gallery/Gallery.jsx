import  { useState } from "react";
import "./Gallery.css";

const images = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", // luxury apartment
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", // Nairobi skyline vibe
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcbG70SerOvmn_h50fEeSe00EVy7VfUH4STvXVhqvpZw&s", // modern living room
  "https://images.unsplash.com/photo-1501183638710-841dd1904471", // bedroom cozy
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c", // safari lodge vibe
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470", // Kenya landscape/safari
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb", // kitchen modern
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6", // balcony view
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="gallery">
      {/* HERO IMAGE */}
      <div className="gallery__hero">
        <img
          src={images[activeIndex]}
          alt={`GemoBnB stay ${activeIndex + 1}`}
        />
      </div>

      {/* THUMBNAILS */}
      <div className="gallery__grid">
        {images.map((img, index) => (
          <button
            key={index}
            className={`gallery__thumb ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </section>
  );
}