import { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "Is parking available?",
    answer: "Yes, free secure parking is available on-site for all guests.",
  },
  {
    question: "Is Wi-Fi fast?",
    answer:
      "Yes, high-speed fiber Wi-Fi is available and suitable for remote work and streaming.",
  },
  {
    question: "How far is the CBD?",
    answer: "Nairobi CBD is approximately 20 minutes drive from the property.",
  },
  {
    question: "Is self check-in available?",
    answer:
      "Yes, we offer secure self check-in with smart lock or key box access.",
  },
  {
    question: "Is the area secure?",
    answer:
      "Yes, the neighborhood in Thindigua, Kiambu Road is quiet, gated, and highly secure.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know before booking your stay</p>
      </div>

      <div className="faq-list">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}