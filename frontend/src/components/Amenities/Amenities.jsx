import "./Amenities.css";
import {
  Wifi,
  Tv,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Car,
  ShieldCheck,
  Briefcase,
  Building2,
  Droplets,
  BedDouble,
  KeyRound,
} from "lucide-react";

const amenities = [
  {
    icon: <Wifi size={26} />,
    title: "High-Speed Wi-Fi",
    description: "Reliable internet for streaming and remote work.",
  },
  {
    icon: <Tv size={26} />,
    title: "Smart TV",
    description: "Enjoy Netflix, YouTube, and your favorite shows.",
  },
  {
    icon: <UtensilsCrossed size={26} />,
    title: "Fully Equipped Kitchen",
    description: "Cook meals with modern appliances and utensils.",
  },
  {
    icon: <Waves size={26} />,
    title: "Swimming Pool",
    description: "Refresh and unwind during your stay.",
  },
  {
    icon: <Dumbbell size={26} />,
    title: "Fitness Center",
    description: "Stay active with access to the gym.",
  },
  {
    icon: <Car size={26} />,
    title: "Secure Parking",
    description: "Free parking space within the property.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "24/7 Security",
    description: "Peace of mind in a secure residential community.",
  },
  {
    icon: <Briefcase size={26} />,
    title: "Dedicated Workspace",
    description: "Comfortable setup for business travelers.",
  },
  {
    icon: <Building2 size={26} />,
    title: "Elevator Access",
    description: "Convenient access to your apartment.",
  },
  {
    icon: <Droplets size={26} />,
    title: "Hot Water",
    description: "Enjoy warm showers any time of day.",
  },
  {
    icon: <BedDouble size={26} />,
    title: "Fresh Linens",
    description: "Clean bedding and towels provided.",
  },
  {
    icon: <KeyRound size={26} />,
    title: "Self Check-In",
    description: "Flexible arrival with easy access.",
  },
];

export default function Amenities() {
  return (
    <section className="amenities">
      <div className="amenities-header">
        <span className="section-tag">Amenities</span>

        <h2>Everything You Need For A Comfortable Stay</h2>

        <p>
          Designed for convenience, productivity, and relaxation, GemoBnB
          provides thoughtfully selected amenities to make every stay enjoyable.
        </p>
      </div>

      <div className="amenities-grid">
        {amenities.map((item, index) => (
          <div className="amenity-card" key={index}>
            <div className="amenity-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}