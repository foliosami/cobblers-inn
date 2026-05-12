import { motion } from "motion/react";
import E from "./E";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Testimonials({
  content,
  editMode,
  selectedId,
  onSelect,
}) {
  const items = [
    { id: "testi1", q: content.testi1, a: content.testi1A },
    { id: "testi2", q: content.testi2, a: content.testi2A },
    { id: "testi3", q: content.testi3, a: content.testi3A },
  ];

  return (
    <section
      style={{
        background: "var(--cream-lt)",
        padding: "clamp(40px, 7vw, 72px) clamp(20px, 5vw, 64px)",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "var(--serif)",
          fontWeight: 300,
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          color: "var(--lth)",
          marginBottom: "clamp(32px, 5vw, 56px)",
        }}
      >
        <E
          id="testiH"
          editMode={editMode}
          selectedId={selectedId}
          onSelect={onSelect}
        >
          {content.testiH}
        </E>
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          gap: "clamp(28px, 4vw, 44px)",
        }}
      >
        {items.map((t) => (
          <motion.div key={t.id} variants={staggerItem}>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                color: "#3a3a3a",
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: 20,
              }}
            >
              <E
                id={t.id}
                editMode={editMode}
                selectedId={selectedId}
                onSelect={onSelect}
              >
                “{t.q}”
              </E>
            </p>
            <div
              style={{
                fontSize: 12,
                color: "var(--lth-lt)",
                letterSpacing: "0.05em",
              }}
            >
              —{" "}
              <E
                id={`${t.id}A`}
                editMode={editMode}
                selectedId={selectedId}
                onSelect={onSelect}
              >
                {t.a}
              </E>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
