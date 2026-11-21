import "./PropertyHighlights.css";
import {
  Bed,
  Users,
  Wifi,
  Car,
  Dumbbell,
  Briefcase,
} from "lucide-react";

const highlights = [
  {
    icon: <Bed size={28} />,
    value: "1 or 2 Bedroom options",
    label: "Modern & Comfortable",
  },
  {
    icon: <Users size={28} />,
    value: "2 Guests",
    label: "Perfect for Couples",
  },
  {
    icon: <Wifi size={28} />,
    value: "Fast Wi-Fi",
    label: "Remote Work Ready",
  },
  {
    icon: <Car size={28} />,
    value: "Free Parking",
    label: "Secure Parking Space",
  },
  {
    icon: <Dumbbell size={28} />,
    value: "Pool & Gym",
    label: "Stay Active",
  },
  {
    icon: <Briefcase size={28} />,
    value: "Workspace",
    label: "Business Friendly",
  },
];

export default function PropertyHighlights() {
  return (
    <section className="property-highlights">
      <div className="highlights-header">
        <span className="section-tag">Why Guests Love It</span>

        <h2>Your Nairobi Home Away From Home</h2>

        <p>
          Located in Thindigua along Kiambu Road, GemoBnB combines comfort,
          convenience, and modern living for travelers, digital nomads, and
          business professionals.
        </p>
      </div>

      <div className="highlights-grid">
        {highlights.map((item, index) => (
          <div className="highlight-card" key={index}>
            <div className="highlight-icon">{item.icon}</div>

            <h3>{item.value}</h3>

            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}