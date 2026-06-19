import "./GuestReviews.css";

const reviews = [
  {
    rating: 5,
    text: "Spotless apartment and excellent host.",
    author: "Verified Guest",
  },
  {
    rating: 5,
    text: "Perfect location near Two Rivers and Karura.",
    author: "Verified Guest",
  },
  {
    rating: 5,
    text: "Great Wi-Fi for remote work.",
    author: "Verified Guest",
  },
  {
    rating: 5,
    text: "Very quiet, secure, and beautifully furnished space.",
    author: "Verified Guest",
  },
];

export default function GuestReviews() {
  return (
    <section className="reviews">
      <div className="reviews-header">
        <h2>Guest Reviews</h2>
        <p>What guests are saying about their stay at GemoBnB</p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="stars">
              {"★★★★★".slice(0, review.rating)}
            </div>

            <p className="review-text">"{review.text}"</p>

            <span className="review-author">{review.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}