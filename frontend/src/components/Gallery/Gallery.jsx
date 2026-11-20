import { useState } from "react";
import "./Gallery.css";

// Automatically import images from assets
const imageModules = import.meta.glob("../../assets/img*", {
  eager: true,
  import: "default",
  query: "?url",
});

// Sort images numerically: img1, img2, ... img29
const images = Object.entries(imageModules)
  .sort((a, b) => {
    const numA = Number(a[0].match(/img(\d+)/)?.[1]);
    const numB = Number(b[0].match(/img(\d+)/)?.[1]);
    return numA - numB;
  })
  .map(([, src]) => src);

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="gallery-section" id="gallery">
      {/* HEADER */}
      <div className="gallery-header">
        <span className="section-tag">Gallery</span>

        <h2>Take a Look Inside GemoBnB</h2>

        <p>
          Explore the modern interiors, cozy bedroom, fully equipped kitchen,
          and relaxing spaces designed for comfort and style.
        </p>
      </div>

      {/* GALLERY BODY */}
      <div className="gallery">
        {/* MAIN IMAGE */}
        <div className="gallery__hero">
          {images.length > 0 && (
            <img
              src={images[activeIndex]}
              alt={`GemoBnB stay ${activeIndex + 1}`}
            />
          )}
        </div>

        {/* THUMBNAILS */}
        <div className="gallery__grid">
          {images.map((img, index) => (
            <button
              key={img}
              className={`gallery__thumb ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <img
                src={img}
                alt={`GemoBnB thumbnail ${index + 1}`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
