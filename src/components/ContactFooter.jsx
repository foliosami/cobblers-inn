import Pill from "./Pill";
import ZoomPhoto from "./ZoomPhoto";
import E from "./E";

function CobblerTools() {
  return (
    <svg
      viewBox="0 0 500 280"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "min(70%, 480px)", height: "auto", display: "block" }}
    >
      <rect x="0" y="200" width="500" height="80" fill="rgba(26,18,8,0.45)" />
      <rect x="0" y="200" width="500" height="3" fill="rgba(0,0,0,0.4)" />

      <g transform="translate(110,80)">
        <ellipse cx="0" cy="0" rx="14" ry="22" fill="#7A4B2A" />
        <ellipse cx="0" cy="-2" rx="10" ry="6" fill="rgba(255,255,255,0.18)" />
        <line x1="0" y1="20" x2="0" y2="118" stroke="#1A1208" strokeWidth="3" strokeLinecap="round" />
      </g>

      <g transform="translate(220,90)">
        <ellipse cx="-12" cy="0" rx="14" ry="10" fill="none" stroke="#B8863C" strokeWidth="3" />
        <ellipse cx="14" cy="0" rx="14" ry="10" fill="none" stroke="#B8863C" strokeWidth="3" />
        <line x1="-2" y1="2" x2="36" y2="80" stroke="#D4A855" strokeWidth="3" strokeLinecap="round" />
        <line x1="2" y1="2" x2="-32" y2="80" stroke="#D4A855" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="2" r="3" fill="#3B2010" />
      </g>

      <g transform="translate(330,150)">
        <ellipse cx="0" cy="0" rx="48" ry="30" fill="#FAF6EE" stroke="#3B2010" strokeWidth="2" />
        <ellipse cx="0" cy="0" rx="14" ry="10" fill="#1A1208" />
        {[-30, -20, -10, 0, 10, 20, 30].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="-20"
            x2={x}
            y2={i % 2 === 0 ? -14 : -10}
            stroke="#3B2010"
            strokeWidth="1.2"
          />
        ))}
      </g>

      <path
        d="M70,170 Q120,150 180,170 Q200,180 195,200 Q150,220 90,210 Q60,200 70,170 Z"
        fill="#5C3A1E"
        opacity="0.85"
      />
      <path
        d="M75,175 Q120,158 175,175"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export default function ContactFooter({
  content,
  editMode,
  selectedId,
  onSelect,
}) {
  return (
    <>
      <div style={{ position: "relative" }}>
        <ZoomPhoto height="clamp(220px, 35vw, 320px)">
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(140deg, var(--gold) 0%, var(--lth-md) 35%, var(--lth-dk) 70%, var(--ink) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CobblerTools />
          </div>
        </ZoomPhoto>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -1,
            height: 80,
            background: "var(--cream-lt)",
            borderRadius: "80% 80% 0 0 / 100% 100% 0 0",
            pointerEvents: "none",
          }}
        />
      </div>

      <footer
        style={{
          background: "var(--cream-lt)",
          padding:
            "clamp(16px, 3vw, 24px) clamp(20px, 5vw, 64px) clamp(28px, 5vw, 44px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: "clamp(28px, 4vw, 48px)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.1rem",
              color: "var(--lth)",
              marginBottom: 24,
            }}
          >
            <E
              id="footLogo"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              {content.footLogo}
            </E>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {[
              { id: "f-email", label: "Email", type: "email" },
              { id: "f-name", label: "First Name", type: "text" },
              { id: "f-msg", label: "Message", type: "text" },
            ].map((f) => (
              <div key={f.id} style={{ marginBottom: 20 }}>
                <label
                  htmlFor={f.id}
                  style={{
                    display: "block",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--lth-lt)",
                    marginBottom: 6,
                    fontWeight: 400,
                  }}
                >
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(92,58,30,0.22)",
                    padding: "8px 0",
                    fontSize: 13,
                    color: "var(--lth)",
                    outline: "none",
                    fontWeight: 300,
                  }}
                />
              </div>
            ))}
            <Pill variant="ink" type="submit">
              Send Message
            </Pill>
          </form>
        </div>

        <div
          className="footer-right"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 300,
              color: "var(--lth-lt)",
              lineHeight: 1.9,
            }}
          >
            <E
              id="footPhone"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              {content.footPhone}
            </E>
          </p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 300,
              color: "var(--lth-lt)",
              lineHeight: 1.9,
            }}
          >
            <E
              id="footEmail"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              {content.footEmail}
            </E>
          </p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 300,
              color: "var(--lth-lt)",
              lineHeight: 1.9,
              marginBottom: 20,
            }}
          >
            <E
              id="footAddr"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              {content.footAddr}
            </E>
          </p>
          <div
            style={{
              fontSize: 11,
              color: "rgba(92,58,30,0.55)",
              letterSpacing: "0.05em",
              lineHeight: 1.9,
            }}
          >
            <a href="#" style={{ marginRight: 14 }}>
              Privacy Policy
            </a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </footer>
    </>
  );
}
