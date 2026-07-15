import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader } from "@/components/telemetry-card";
import { languages } from "@/lib/mock-data";
import { ArrowRightLeft, Mic } from "lucide-react";

export const Route = createFileRoute("/translator")({
  head: () => ({
    meta: [
      { title: "Universal Translator · StadiumMind AI" },
      { name: "description", content: "Real-time multilingual translation for fans and volunteers across 7 languages." },
    ],
  }),
  component: Translator,
});

const demo: Record<string, Record<string, string>> = {
  "Where is the nearest first aid station?": {
    es: "¿Dónde está la enfermería más cercana?",
    fr: "Où se trouve le poste de secours le plus proche ?",
    pt: "Onde fica o posto de primeiros socorros mais próximo?",
    hi: "निकटतम प्राथमिक चिकित्सा केंद्र कहाँ है?",
    ar: "أين أقرب مركز إسعافات أولية؟",
    ja: "最寄りの救護所はどこですか？",
  },
};

function Translator() {
  const [text, setText] = useState("Where is the nearest first aid station?");
  const [target, setTarget] = useState("es");
  const translated = demo[text]?.[target] ?? "…";

  return (
    <div className="p-4 md:p-6 space-y-6">
      <SectionHeader
        eyebrow="Voice + text · 7 languages"
        title="Universal Translator"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-5 bg-card border border-border rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-cyber uppercase tracking-widest">
              English
            </span>
            <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-cyber">
              <Mic className="size-3.5" /> hold to speak
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="w-full bg-transparent resize-none text-lg text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="p-5 bg-card border border-border rounded-2xl relative">
          <div className="flex items-center justify-between mb-3">
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="bg-transparent text-[10px] font-mono text-cyber uppercase tracking-widest outline-none cursor-pointer"
            >
              {languages
                .filter((l) => l.code !== "en")
                .map((l) => (
                  <option key={l.code} value={l.code} className="bg-surface">
                    {l.label}
                  </option>
                ))}
            </select>
            <ArrowRightLeft className="size-4 text-muted-foreground" />
          </div>
          <p className="text-lg text-foreground leading-relaxed">{translated}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {languages.map((l) => (
          <div
            key={l.code}
            className="p-4 bg-card border border-border rounded-xl text-center"
          >
            <div className="text-[10px] font-mono text-muted-foreground uppercase">
              {l.code}
            </div>
            <div className="text-lg font-display font-bold text-foreground">
              {l.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}