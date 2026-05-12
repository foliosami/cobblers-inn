import { motion } from "motion/react";

const variants = {
  dark: {
    background: "var(--ink)",
    border: "1px solid var(--lth-md)",
    color: "rgba(245,239,224,0.9)",
  },
  cream: {
    background: "var(--cream-lt)",
    border: "1px solid rgba(92,58,30,0.3)",
    color: "var(--lth)",
  },
  ghost: {
    background: "transparent",
    border: "1px solid rgba(245,239,224,0.4)",
    color: "rgba(245,239,224,0.9)",
  },
  ink: {
    background: "var(--lth)",
    border: "1px solid var(--lth)",
    color: "var(--cream)",
  },
  "gold-line": {
    background: "var(--lth)",
    border: "1px solid var(--gold)",
    color: "var(--gold)",
  },
};

export default function Pill({
  children,
  onClick,
  variant = "cream",
  type = "button",
  style,
  className,
}) {
  const v = variants[variant] || variants.cream;
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={className}
      style={{
        ...v,
        borderRadius: 999,
        fontFamily: "var(--sans)",
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "9px 22px",
        minHeight: 44,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.25s, color 0.25s, border-color 0.25s",
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}
