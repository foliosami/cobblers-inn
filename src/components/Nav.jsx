import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Pill from "./Pill";

export default function Nav({ editMode, onToggleEdit }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: 60,
        background: scrolled ? "rgba(245,239,224,0.95)" : "var(--cream)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(92,58,30,0.08)" : "none",
        transition: "background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 clamp(20px, 5vw, 64px)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "1.1rem",
          color: "var(--lth)",
          letterSpacing: "0.04em",
        }}
      >
        A Cobbler&apos;s Inn
      </span>

      <div
        aria-hidden="true"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ width: 20, height: 1, background: "var(--lth)" }} />
        <span style={{ width: 20, height: 1, background: "var(--lth)" }} />
        <span style={{ width: 20, height: 1, background: "var(--lth)" }} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 10,
        }}
      >
        <button
          onClick={onToggleEdit}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: editMode ? "var(--lth)" : "var(--ink)",
            border: editMode
              ? "1px solid var(--gold)"
              : "1px solid var(--lth-md)",
            color: editMode ? "var(--gold)" : "rgba(245,239,224,0.7)",
            transition: "all 0.25s",
            minHeight: 36,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: editMode ? "var(--gold)" : "rgba(245,239,224,0.4)",
              transition: "background 0.25s",
            }}
          />
          {editMode ? "Exit Edit" : "Edit"}
        </button>
        <span className="nav-contact">
          <Pill
            variant="cream"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            Contact Us
          </Pill>
        </span>
      </div>
    </motion.nav>
  );
}
