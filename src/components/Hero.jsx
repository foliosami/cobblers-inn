import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ZoomPhoto from "./ZoomPhoto";
import E from "./E";

const HERO_SLIDES = ["/hero2.png", "/hero3.png"];

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <AnimatePresence initial={false}>
        <motion.img
          key={HERO_SLIDES[index]}
          src={HERO_SLIDES[index]}
          alt="Master cobbler hand-stitching a leather Oxford"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </AnimatePresence>
    </div>
  );
}

function WordReveal({ text, baseDelay = 0 }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0.25em" }}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            lineHeight: 1.05,
            paddingBottom: "0.35em",
            marginBottom: "-0.35em",
          }}
        >
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: baseDelay + i * 0.1,
            }}
            style={{ display: "inline-block" }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero({ content, editMode, selectedId, onSelect }) {
  return (
    <section>
      <div
        style={{
          background: "var(--cream)",
          padding:
            "clamp(40px, 7vw, 72px) clamp(20px, 5vw, 64px) clamp(36px, 6vw, 56px)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 300,
            fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
            lineHeight: 1.05,
            color: "var(--lth)",
            marginBottom: "clamp(40px, 6vw, 72px)",
          }}
        >
          <span style={{ display: "block" }}>
            <E
              id="heroL1"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              <WordReveal text={content.heroL1} baseDelay={0.5} />
            </E>
          </span>
          <span
            style={{
              display: "block",
              fontStyle: "italic",
              color: "var(--lth-md)",
            }}
          >
            <E
              id="heroL2"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              <WordReveal text={content.heroL2} baseDelay={0.7} />
            </E>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            color: "var(--lth-lt)",
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        >
          <E
            id="heroSub"
            editMode={editMode}
            selectedId={selectedId}
            onSelect={onSelect}
          >
            {content.heroSub}
          </E>
        </motion.p>
      </div>

      <ZoomPhoto height="clamp(280px, 40vw, 420px)">
        <HeroCarousel />
      </ZoomPhoto>
    </section>
  );
}
