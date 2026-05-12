import { motion } from "motion/react";

export default function OxfordShoe({ dark = false, style, className }) {
  const upper = dark ? "#FAF6EE" : "#C49A6C";
  const upperShade = dark ? "#E5DDC8" : "#A47A4E";
  const sole = dark ? "#0D0804" : "#1A1208";
  const soleEdge = dark ? "#1c1308" : "#2a1a0c";
  const lace = dark ? "#FAF6EE" : "#1A1208";
  const stitch = dark ? "rgba(26,18,8,0.55)" : "rgba(26,18,8,0.85)";
  const sheen = dark ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.22)";

  return (
    <motion.svg
      viewBox="0 0 500 280"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ display: "block", ...style }}
    >
      <ellipse cx="260" cy="248" rx="195" ry="10" fill="rgba(0,0,0,0.18)" />

      <path
        d="M70,210 Q60,245 110,250 L420,250 Q470,250 470,225 Q470,210 455,205 L100,205 Q72,205 70,210 Z"
        fill={sole}
      />
      <path
        d="M70,210 Q60,245 110,250 L420,250 Q470,250 470,225 Q470,210 455,205 L100,205 Q72,205 70,210 Z"
        fill="none"
        stroke={soleEdge}
        strokeWidth="1.5"
      />

      <path
        d="M380,210 Q470,210 470,228 Q470,252 420,250 L380,250 Z"
        fill={soleEdge}
      />

      <path
        d="M95,210
           Q90,150 130,120
           Q175,90 230,82
           Q300,72 360,90
           Q420,108 445,150
           Q455,175 450,205
           Z"
        fill={upper}
      />

      <path
        d="M310,90
           Q380,98 430,135
           Q450,160 450,200
           L350,200
           Q345,150 310,118
           Z"
        fill={upperShade}
        opacity="0.55"
      />

      <path
        d="M310,118
           Q345,150 350,200
           L335,200
           Q325,155 295,128
           Z"
        fill={stitch}
        opacity="0.4"
        strokeDasharray="3 4"
        stroke={stitch}
        strokeWidth="1"
      />

      <path
        d="M165,128
           Q220,108 285,108
           Q300,108 305,118
           L300,200
           L195,200
           Q170,170 165,128 Z"
        fill={dark ? "#E8E0CC" : "#A47A4E"}
        opacity="0.7"
      />

      {[0, 1, 2, 3].map((i) => {
        const yEye = 132 + i * 17;
        const xLeft = 200 + i * 4;
        const xRight = 285 - i * 4;
        return (
          <g key={i}>
            <circle cx={xLeft} cy={yEye} r="4.5" fill={sole} />
            <circle cx={xLeft} cy={yEye} r="2" fill={dark ? "#FAF6EE" : "#3B2010"} />
            <circle cx={xRight} cy={yEye} r="4.5" fill={sole} />
            <circle cx={xRight} cy={yEye} r="2" fill={dark ? "#FAF6EE" : "#3B2010"} />
            <path
              d={`M${xLeft + 3},${yEye} Q${(xLeft + xRight) / 2},${yEye - 3} ${xRight - 3},${yEye}`}
              stroke={lace}
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      <path
        d="M232,200 Q240,188 250,196 Q260,188 268,200"
        stroke={lace}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="240" cy="195" rx="6" ry="3" fill="none" stroke={lace} strokeWidth="1.5" />
      <ellipse cx="260" cy="195" rx="6" ry="3" fill="none" stroke={lace} strokeWidth="1.5" />
      <path d="M238,202 L226,218" stroke={lace} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M262,202 L274,218" stroke={lace} strokeWidth="1.6" fill="none" strokeLinecap="round" />

      <path
        d="M95,210 Q200,202 445,205"
        stroke={stitch}
        strokeWidth="1.5"
        strokeDasharray="3 5"
        fill="none"
      />

      <path
        d="M140,118 Q210,95 305,98"
        stroke={sheen}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
    </motion.svg>
  );
}
