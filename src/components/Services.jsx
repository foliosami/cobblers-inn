import Reveal from "./Reveal";
import Pill from "./Pill";
import E from "./E";

export default function Services({ content, editMode, selectedId, onSelect }) {
  const rows = [
    { id: "svc1", name: content.svc1Name, tag: content.svc1Tag, desc: content.svc1Desc },
    { id: "svc2", name: content.svc2Name, tag: content.svc2Tag, desc: content.svc2Desc },
    { id: "svc3", name: content.svc3Name, tag: content.svc3Tag, desc: content.svc3Desc },
    { id: "svc4", name: content.svc4Name, tag: content.svc4Tag, desc: content.svc4Desc },
  ];

  return (
    <section
      style={{
        background: "var(--slate)",
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
            id="svcH"
            editMode={editMode}
            selectedId={selectedId}
            onSelect={onSelect}
          >
            {content.svcH}
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
            id="svcSub"
            editMode={editMode}
            selectedId={selectedId}
            onSelect={onSelect}
          >
            {content.svcSub}
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
            <div>
              <div
                className="svc-name"
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                  fontWeight: 300,
                  color: "var(--cream-lt)",
                  lineHeight: 1.2,
                }}
              >
                <E
                  id={`${r.id}Name`}
                  editMode={editMode}
                  selectedId={selectedId}
                  onSelect={onSelect}
                >
                  {r.name}
                </E>
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "rgba(245,239,224,0.45)",
                  letterSpacing: "0.05em",
                  marginTop: 6,
                }}
              >
                <E
                  id={`${r.id}Tag`}
                  editMode={editMode}
                  selectedId={selectedId}
                  onSelect={onSelect}
                >
                  {r.tag}
                </E>
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(245,239,224,0.75)",
                lineHeight: 1.85,
                alignSelf: "center",
              }}
            >
              <E
                id={`${r.id}Desc`}
                editMode={editMode}
                selectedId={selectedId}
                onSelect={onSelect}
              >
                {r.desc}
              </E>
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal delay={0.45}>
        <div style={{ display: "inline-block", marginTop: 36 }}>
          <Pill variant="ghost">
            <E
              id="svcBtn"
              editMode={editMode}
              selectedId={selectedId}
              onSelect={onSelect}
            >
              {content.svcBtn}
            </E>
          </Pill>
        </div>
      </Reveal>
    </section>
  );
}
