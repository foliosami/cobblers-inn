import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  style,
  className,
  as = "div",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const MotionTag = motion[as];
  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}
