import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const slideRefs = useRef([]);

  const slides = [
    {
      title: "Luxury Airbnb in Nairobi",
      text: "A stylish and comfortable stay designed for business travelers, couples, and weekend getaways.",
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=80",
      cta: "Book Your Stay",
    },
    {
      title: "Modern Comfort & Premium Amenities",
      text: "Enjoy high-speed Wi-Fi, a fully equipped kitchen, smart TV, secure parking, and 24/7 security.",
      image:
        "https://images.unsplash.com/photo-1667935837291-1dc178866251?auto=format&fit=crop&w=2000&q=80",
      cta: "View Amenities",
    },
    {
      title: "Experience Nairobi",
      text: "Conveniently located near restaurants, shopping malls, nightlife, and major business districts.",
      image:
        "https://images.unsplash.com/photo-1526319238109-524eecb9b913?auto=format&fit=crop&w=2000&q=80",
      cta: "Reserve Now",
    },
  ];

  useEffect(() => {
    let cleanupAutoplay = () => {};

    const ctx = gsap.context(() => {
      const slideEls = slideRefs.current;
      const total = slideEls.length;

      // Initial state: slide 1 active & visible, rest hidden
      const kenBurnsTweens = [];

      slideEls.forEach((slide, i) => {
        const title = slide.querySelector(".hero-title");
        const text = slide.querySelector(".hero-text");
        const box = slide.querySelector(".search-box");
        const cta = slide.querySelector(".hero-cta");
        const bg = slide.querySelector(".hero-bg");

        gsap.set(slide, { autoAlpha: i === 0 ? 1 : 0 });
        gsap.set([title, text, box, cta], {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 60,
        });

        // continuous slow zoom on the background image
        gsap.set(bg, { scale: 1.08 });
        const kenBurns = gsap.to(bg, {
          scale: 1.22,
          duration: 8,
          ease: "none",
          paused: true,
        });
        kenBurnsTweens.push(kenBurns);

        if (i === 0) {
          slide.classList.add("active");
          kenBurns.play();
        }
      });

      let currentIndex = 0;
      let userHasScrolled = false;

      // One ScrollTrigger pins the whole hero and snaps between slide "steps"
      const st = ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        // each extra slide beyond the first adds one viewport height of scroll
        end: () => `+=${(total - 1) * window.innerHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: {
          // snap to fractional steps between slides
          snapTo: 1 / (total - 1),
          duration: 0.5,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress * (total - 1);
          const index = Math.round(progress);
          updateActiveSlide(index);
        },
      });

      function updateActiveSlide(index) {
        if (index === currentIndex) return;

        const outgoing = slideEls[currentIndex];
        const incoming = slideEls[index];

        const outTitle = outgoing.querySelector(".hero-title");
        const outText = outgoing.querySelector(".hero-text");
        const outBox = outgoing.querySelector(".search-box");
        const outCta = outgoing.querySelector(".hero-cta");
        const outBg = outgoing.querySelector(".hero-bg");

        const inTitle = incoming.querySelector(".hero-title");
        const inText = incoming.querySelector(".hero-text");
        const inBox = incoming.querySelector(".search-box");
        const inCta = incoming.querySelector(".hero-cta");
        const inBg = incoming.querySelector(".hero-bg");

        outgoing.classList.remove("active");
        incoming.classList.add("active");

        // stop the outgoing image's zoom and reset it for next time
        kenBurnsTweens[currentIndex].pause();
        gsap.set(outBg, { scale: 1.08 });

        // fade out current slide content
        gsap.to([outTitle, outText, outBox, outCta].filter(Boolean), {
          opacity: 0,
          y: -40,
          duration: 0.4,
          ease: "power1.in",
        });
        gsap.to(outgoing, { autoAlpha: 0, duration: 0.5 });

        // fade in next slide content
        gsap.set(incoming, { autoAlpha: 1 });
        gsap.fromTo(
          [inTitle, inText, inBox, inCta].filter(Boolean),
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.15,
          },
        );

        // start the incoming image's zoom fresh
        gsap.set(inBg, { scale: 1.08 });
        kenBurnsTweens[index].restart();

        currentIndex = index;
      }

      ScrollTrigger.refresh();

      // ===== AUTOPLAY =====
      // Advances slides on a timer, but only until the user actually
      // scrolls — once they do, scroll takes over completely and
      // autoplay stops for good (no fighting between the two).
      const AUTOPLAY_DELAY = 8000; // ms, matches the Ken Burns duration
      let autoplayTimer = null;

      function scrollToIndex(index) {
        // translate a slide index back into the scroll position
        // ScrollTrigger expects, so onUpdate drives the transition
        // exactly the same way manual scrolling does
        const progress = index / (total - 1);
        const scrollPos = st.start + progress * (st.end - st.start);
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
        // smooth scroll has no reliable onComplete callback across
        // browsers, so just schedule the next autoplay tick after
        // a fixed delay roughly matching the scroll animation
        setTimeout(scheduleAutoplay, 1000);
      }

      function scheduleAutoplay() {
        if (userHasScrolled) return;
        clearTimeout(autoplayTimer);
        autoplayTimer = setTimeout(() => {
          if (userHasScrolled) return;
          const next = (currentIndex + 1) % total;
          scrollToIndex(next);
        }, AUTOPLAY_DELAY);
      }

      function stopAutoplay() {
        if (userHasScrolled) return;
        userHasScrolled = true;
        clearTimeout(autoplayTimer);
        window.removeEventListener("wheel", stopAutoplay);
        window.removeEventListener("touchmove", stopAutoplay);
        window.removeEventListener("keydown", handleKeydown);
      }

      function handleKeydown(e) {
        const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "];
        if (scrollKeys.includes(e.key)) stopAutoplay();
      }

      window.addEventListener("wheel", stopAutoplay, { passive: true });
      window.addEventListener("touchmove", stopAutoplay, { passive: true });
      window.addEventListener("keydown", handleKeydown);

      scheduleAutoplay();

      // expose for cleanup outside gsap.context (its callback's return
      // value is not used as a cleanup function by gsap.context itself)
      cleanupAutoplay = () => {
        clearTimeout(autoplayTimer);
        window.removeEventListener("wheel", stopAutoplay);
        window.removeEventListener("touchmove", stopAutoplay);
        window.removeEventListener("keydown", handleKeydown);
      };
    }, heroRef);

    return () => {
      cleanupAutoplay();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-container">
      {slides.map((s, i) => (
        <section
          key={i}
          ref={(el) => (slideRefs.current[i] = el)}
          className={`hero-slide slide-${i + 1}`}
        >
          <div
            className="hero-bg"
            style={{ backgroundImage: `url(${s.image})` }}
          />

          <h1 className="hero-title">{s.title}</h1>

          {s.text && <p className="hero-text">{s.text}</p>}

          <motion.button
            className="hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {s.cta}
          </motion.button>

          <div className="search-box">
            <input value="Nairobi" readOnly />

            <input type="date" aria-label="Check In" />

            <input type="date" aria-label="Check Out" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Check Availability
            </motion.button>
          </div>
        </section>
      ))}
    </section>
  );
}
