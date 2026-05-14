import Pill from "./Pill";
import ZoomPhoto from "./ZoomPhoto";
import E from "./E";

export default function ContactFooter({
  content,
  editMode,
  selectedId,
  onSelect,
}) {
  return (
    <>
      <div style={{ position: "relative" }}>
        <ZoomPhoto height="clamp(260px, 38vw, 420px)">
          <img
            src="/cobbler-tools.png"
            alt="Cobbler's workbench at dusk"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
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
        id="contact"
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
