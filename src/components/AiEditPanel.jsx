import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function AiEditPanel({
  selectedField,
  streaming,
  streamedText,
  pendingApply,
  error,
  onClose,
  onSubmit,
  onApply,
}) {
  const [instruction, setInstruction] = useState("");
  const taRef = useRef(null);

  useEffect(() => {
    setInstruction("");
  }, [selectedField?.id]);

  useEffect(() => {
    if (selectedField && taRef.current) taRef.current.focus();
  }, [selectedField]);

  const submit = () => {
    if (!instruction.trim() || streaming) return;
    onSubmit(instruction.trim());
  };

  const onKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <AnimatePresence>
      {selectedField && (
        <motion.aside
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 340,
            maxWidth: "calc(100vw - 40px)",
            zIndex: 1000,
            background: "var(--ink)",
            border: "1px solid var(--lth-md)",
            borderRadius: 6,
            color: "rgba(245,239,224,0.85)",
            fontFamily: "var(--sans)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              background: "var(--lth-dk)",
              padding: "10px 14px",
              borderRadius: "6px 6px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--lth-md)",
            }}
          >
            <span
              style={{
                color: "var(--gold)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              ✦ AI Copywriter
            </span>
            <button
              aria-label="Close"
              onClick={onClose}
              style={{
                color: "rgba(245,239,224,0.7)",
                fontSize: 18,
                lineHeight: 1,
                padding: "4px 8px",
              }}
            >
              ×
            </button>
          </div>

          <div style={{ padding: 14 }}>
            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(245,239,224,0.45)",
                marginBottom: 6,
              }}
            >
              Editing
            </div>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 13,
                color: "rgba(245,239,224,0.7)",
                borderLeft: "2px solid var(--lth-md)",
                paddingLeft: 10,
                margin: "0 0 14px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.5,
              }}
            >
              {selectedField.text}
            </p>

            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(245,239,224,0.45)",
                marginBottom: 6,
              }}
            >
              Instruction
            </div>
            <textarea
              ref={taRef}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyDown={onKey}
              placeholder="Make it shorter, more poetic…"
              style={{
                width: "100%",
                minHeight: 56,
                background: "rgba(245,239,224,0.04)",
                border: "1px solid rgba(245,239,224,0.08)",
                borderRadius: 4,
                color: "rgba(245,239,224,0.95)",
                padding: "8px 10px",
                fontSize: 13,
                outline: "none",
                resize: "vertical",
                fontFamily: "var(--sans)",
                marginBottom: 10,
              }}
            />

            <button
              onClick={submit}
              disabled={!instruction.trim() || streaming}
              style={{
                width: "100%",
                background: "var(--lth)",
                color: "var(--cream)",
                padding: "10px 14px",
                borderRadius: 4,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: !instruction.trim() || streaming ? 0.55 : 1,
                cursor:
                  !instruction.trim() || streaming ? "not-allowed" : "pointer",
                fontWeight: 500,
              }}
            >
              {streaming ? "···" : "✦ Rewrite with Claude"}
            </button>

            <AnimatePresence>
              {(streamedText || streaming) && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      color: "var(--gold-lt)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      borderLeft: "2px solid var(--gold)",
                      paddingLeft: 10,
                    }}
                  >
                    {streamedText}
                    {streaming && <BlinkingCursor />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {pendingApply && !streaming && (
              <button
                onClick={onApply}
                style={{
                  marginTop: 12,
                  width: "100%",
                  background: "var(--gold)",
                  color: "var(--ink)",
                  padding: "9px 14px",
                  borderRadius: 4,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                ✓ Apply this version
              </button>
            )}

            {error && (
              <p
                style={{
                  marginTop: 10,
                  color: "#e0a07a",
                  fontSize: 11,
                  lineHeight: 1.4,
                }}
              >
                {error}
              </p>
            )}

            <div
              style={{
                marginTop: 10,
                fontSize: 10,
                color: "rgba(245,239,224,0.35)",
                letterSpacing: "0.05em",
              }}
            >
              ⌘↵ to submit
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{ display: "inline-block", marginLeft: 2 }}
    >
      ▍
    </motion.span>
  );
}
