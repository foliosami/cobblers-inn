import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "motion/react";
import Reveal from "./Reveal";
import Pill from "./Pill";
import E from "./E";

function parseStat(s) {
  const m = String(s).match(/^([\d.]+)(.*)$/);
  if (!m) return { num: 0, suffix: s };
  return { num: parseFloat(m[1]), suffix: m[2] };
}

function Counter({ value }) {
  const { num, suffix } = parseStat(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, num, { duration: 1.6, ease: "easeOut" });
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, num, mv]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

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

export default function About({ content, editMode, selectedId, onSelect }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const shoeY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--slate)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
        minHeight: 420,
        position: "relative",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          background: "var(--ink)",
          minHeight: 280,
        }}
      >
        <motion.img
          src="/lit.png"
          alt="A Cobbler's Inn storefront"
          style={{
            y: shoeY,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "110%",
            top: "-5%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          padding: "clamp(36px, 6vw, 64px) clamp(24px, 5vw, 56px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Reveal delay={0}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(245,239,224,0.5)",
              marginBottom: 12,
            }}
          >
            <E
              id="aboutEye"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              {content.aboutEye}
            </E>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "var(--cream-lt)",
              marginBottom: 8,
            }}
          >
            <E
              id="aboutH"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              {content.aboutH}
            </E>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.04em",
              color: "rgba(245,239,224,0.55)",
              marginBottom: 24,
            }}
          >
            <E
              id="aboutLabel"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              {content.aboutLabel}
            </E>
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 300,
              color: "rgba(245,239,224,0.8)",
              lineHeight: 1.85,
              marginBottom: 28,
              maxWidth: 560,
            }}
          >
            <E
              id="aboutP"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              {content.aboutP}
            </E>
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <div style={{ display: "inline-block" }}>
            <Pill variant="ghost">
              <E
                id="aboutBtn"
                editMode={editMode}
                selectedId={selectedId}
                onSelect={onSelect}
              >
                {content.aboutBtn}
              </E>
            </Pill>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 32,
            paddingTop: 28,
            borderTop: "1px solid rgba(245,239,224,0.14)",
          }}
        >
          {[
            { id: "stat1", n: content.stat1N, l: content.stat1L },
            { id: "stat2", n: content.stat2N, l: content.stat2L },
            { id: "stat3", n: content.stat3N, l: content.stat3L },
          ].map((s) => (
            <motion.div key={s.id} variants={staggerItem}>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 300,
                  color: "var(--cream-lt)",
                  lineHeight: 1.1,
                }}
              >
                <E
                  id={`${s.id}N`}
                  editMode={editMode}
                  selectedId={selectedId}
                  onSelect={onSelect}
                >
                  <Counter value={s.n} />
                </E>
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(245,239,224,0.45)",
                  marginTop: 6,
                }}
              >
                <E
                  id={`${s.id}L`}
                  editMode={editMode}
                  selectedId={selectedId}
                  onSelect={onSelect}
                >
                  {s.l}
                </E>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
