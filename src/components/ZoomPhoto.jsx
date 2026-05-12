import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ZoomPhoto({ height, children, id, style, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.18]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height,
        ...style,
      }}
    >
      <motion.div
        style={{
          scale,
          width: "100%",
          height: "100%",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
