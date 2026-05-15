import Reveal from "./Reveal";
import E from "./E";

export default function FAQ({ content, editMode, selectedId, onSelect }) {
  const rows = [
    { id: "faq1", q: content.faq1Q, a: content.faq1A },
    { id: "faq2", q: content.faq2Q, a: content.faq2A },
    { id: "faq3", q: content.faq3Q, a: content.faq3A },
  ];

  return (
    <section
      style={{
        background: "var(--slate-lt)",
        padding:
          "clamp(36px, 6vw, 64px) clamp(20px, 5vw, 64px) clamp(48px, 7vw, 80px)",
      }}
    >
      <Reveal>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 300,
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            color: "var(--cream-lt)",
          }}
        >
          <E
            id="faqH"
            editMode={editMode}
            selectedId={selectedId}
            onSelect={onSelect}
          >
            {content.faqH}
          </E>
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <div
          style={{
            fontSize: 12,
            color: "rgba(245,239,224,0.5)",
            letterSpacing: "0.08em",
            marginTop: 6,
            marginBottom: 40,
          }}
        >
          <E
            id="faqSub"
            editMode={editMode}
            selectedId={selectedId}
            onSelect={onSelect}
          >
            {content.faqSub}
          </E>
        </div>
      </Reveal>

      {rows.map((r, i) => (
        <Reveal key={r.id} delay={0.08 + i * 0.08}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "clamp(16px, 3vw, 48px)",
              padding: "clamp(20px, 3vw, 32px) 0",
              borderTop: "1px solid rgba(245,239,224,0.10)",
              borderBottom:
                i === rows.length - 1
                  ? "1px solid rgba(245,239,224,0.10)"
                  : "none",
            }}
          >
            <div
              className="svc-name"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                fontWeight: 300,
                color: "var(--cream-lt)",
                lineHeight: 1.3,
              }}
            >
              <E
                id={`${r.id}Q`}
                editMode={editMode}
                selectedId={selectedId}
                onSelect={onSelect}
              >
                {r.q}
              </E>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(245,239,224,0.78)",
                lineHeight: 1.85,
                alignSelf: "center",
              }}
            >
              <E
                id={`${r.id}A`}
                editMode={editMode}
                selectedId={selectedId}
                onSelect={onSelect}
              >
                {r.a}
              </E>
            </div>
          </div>
        </Reveal>
      ))}

    </section>
  );
}
