import { useCallback, useState } from "react";

const DEFAULT_CONTENT = {
  eyebrow: "Est. 1923 · Jermyn Street, London",
  heroL1: "Where Craft",
  heroL2: "Meets Longevity",
  heroSub: "A Cobbler's Inn. Restored Just for You.",
  heroBtn: "Learn More",

  aboutEye: "Our Story",
  aboutH: "About Us",
  aboutLabel: "Where It All Started",
  aboutP:
    "John Smith opened the first workshop on Jermyn Street in 1923, armed with a last, a hammer, and an unyielding belief that a well-made shoe deserved a long life. Today, his granddaughter Clara leads the fourth generation using the same techniques — hand-stitching, wooden lasts, bench-grade leather.",
  stat1N: "100+",
  stat1L: "Years of craft",
  stat2N: "4th",
  stat2L: "Generation",
  stat3N: "12k",
  stat3L: "Pairs restored",

  svcH: "Services",
  svcSub: "What We Offer",
  svc1Name: "Sole Replacement",
  svc1Tag: "Bench-Grade Leather",
  svc1Desc:
    "Full and half sole replacement using the traditional Goodyear welt technique and Horween leather — the gold standard of shoe repair.",
  svc2Name: "Upper Restoration",
  svc2Tag: "Back to Life",
  svc2Desc:
    "Cleaning, conditioning, patching and colour restoration of any leather upper — from surface nicks to full recrafting.",
  svc3Name: "Heel Repair",
  svc3Tag: "Precision Rebuilds",
  svc3Desc:
    "Top-piece replacement, full stacked leather heel rebuilds and rubber attachment for city wear.",
  svc4Name: "Patina & Shine",
  svc4Tag: "Mirror Finish",
  svc4Desc:
    "Deep clean, wax polish and hand-burnished mirror shine using imported creams and antique finishing.",
  testiH: "Testimonials",
  testi1:
    "The craftsmanship and attention to detail at this workshop exceeded every expectation. Highly recommend.",
  testi1A: "Annette",
  testi2:
    "I've never felt more confident in my shoes. Perfect restoration and impeccable quality every time.",
  testi2A: "Irene",
  testi3:
    "Outstanding cobbling. Every pair is returned to perfection. I always feel amazing wearing them.",
  testi3A: "Carlos",

  faqH: "Questions & Answers",
  faqSub: "Everything You Need to Know",
  faq1Q: "How long does a sole replacement take?",
  faq1A:
    "Most sole replacements are ready within 5–7 working days. We'll give you a precise timeline when you drop your shoes off.",
  faq2Q: "Do you work on all shoe types?",
  faq2A:
    "We specialise in Goodyear-welted shoes — Oxfords, Derbies, boots — but we assess every pair individually and honestly.",
  faq3Q: "Can I request a specific leather?",
  faq3A:
    "Absolutely. We stock Horween Chromexcel and Dublin leather, and can source other bench-grade options on request.",
  footLogo: "Opening Hours",
  footPhone: "+61 7 3844 5566",
  footEmail: "info@cobblersinn.com.au",
  footAddr: "Level 1/79 Vulture St, West End QLD 4101",

  hoursMon: "7:30 am – 5:30 pm",
  hoursTue: "7:30 am – 5:30 pm",
  hoursWed: "7:30 am – 5:30 pm",
  hoursThu: "7:30 am – 5:30 pm",
  hoursFri: "7:30 am – 5:30 pm",
  hoursSat: "7:30 am – 1:00 pm",
  hoursSun: "Closed",
};

export default function useEditMode() {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [selectedField, setSelectedField] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [pendingApply, setPendingApply] = useState(null);
  const [error, setError] = useState(null);

  const toggleEdit = useCallback(() => {
    setEditMode((m) => {
      const next = !m;
      if (!next) {
        setSelectedField(null);
        setStreamedText("");
        setPendingApply(null);
      }
      return next;
    });
  }, []);

  const selectField = useCallback((id, text) => {
    setSelectedField({ id, text });
    setStreamedText("");
    setPendingApply(null);
    setError(null);
  }, []);

  const dismissPanel = useCallback(() => {
    setSelectedField(null);
    setStreamedText("");
    setPendingApply(null);
    setError(null);
  }, []);

  const runAiEdit = useCallback(
    async (instruction) => {
      if (!selectedField || !instruction) return;
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        setError(
          "Missing VITE_ANTHROPIC_API_KEY. See README. (Local dev only — proxy in prod.)"
        );
        return;
      }
      setStreaming(true);
      setStreamedText("");
      setPendingApply(null);
      setError(null);

      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
          body: JSON.stringify({
            model: "claude-opus-4-7",
            max_tokens: 800,
            stream: true,
            system:
              "You are a copywriter for A Cobbler's Inn, a prestigious London cobbler established in 1923. Heritage British tone — unassuming, craft-proud, never flashy. Vocabulary: use 'resoled' not 'fixed', 'welt' not 'edge', 'restoration' not 'repair', 'Goodyear' when relevant. Return ONLY the rewritten text. No preamble, no quotes, no explanation.",
            messages: [
              {
                role: "user",
                content: `Current text: "${selectedField.text}"\n\nInstruction: ${instruction}\n\nReturn only the new text.`,
              },
            ],
          }),
        });

        if (!res.ok || !res.body) {
          const t = await res.text().catch(() => "");
          throw new Error(`API error ${res.status}: ${t.slice(0, 200)}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let acc = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const evt = JSON.parse(data);
              if (
                evt.type === "content_block_delta" &&
                evt.delta?.type === "text_delta"
              ) {
                acc += evt.delta.text;
                setStreamedText(acc);
              }
            } catch {}
          }
        }
        setPendingApply(acc.trim());
      } catch (e) {
        setError(e.message || String(e));
      } finally {
        setStreaming(false);
      }
    },
    [selectedField]
  );

  const applyEdit = useCallback(() => {
    if (!selectedField || !pendingApply) return;
    setContent((c) => ({ ...c, [selectedField.id]: pendingApply }));
    setSelectedField(null);
    setStreamedText("");
    setPendingApply(null);
  }, [selectedField, pendingApply]);

  return {
    editMode,
    toggleEdit,
    content,
    selectedField,
    selectField,
    dismissPanel,
    runAiEdit,
    applyEdit,
    streaming,
    streamedText,
    pendingApply,
    error,
  };
}
