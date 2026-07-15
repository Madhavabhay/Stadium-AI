import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader } from "@/components/telemetry-card";
import { conciergePresets } from "@/lib/mock-data";
import { Bot, Send, User } from "lucide-react";

export const Route = createFileRoute("/concierge")({
  head: () => ({
    meta: [
      { title: "AI Concierge · StadiumMind AI" },
      { name: "description", content: "Multilingual fan concierge for navigation, ticket help, FAQs, and on-venue assistance." },
    ],
  }),
  component: Concierge,
});

type Msg = { role: "fan" | "ai"; text: string };

function Concierge() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Welcome to StadiumMind. I can help with navigation, tickets, accessibility, food, transport, translation, and more. What do you need?",
    },
  ]);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    const preset = conciergePresets.find((p) => p.q === text);
    const answer =
      preset?.a ??
      "Let me check the venue graph. Based on your seat (Sec 118, Row 22) the fastest route is via Concourse B, elevator 2. Estimated 3 minutes.";
    setMessages((m) => [...m, { role: "fan", text }, { role: "ai", text: answer }]);
    setInput("");
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <SectionHeader
        eyebrow="Multilingual · voice + text · function calling"
        title="AI Concierge"
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden h-[640px]">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${m.role === "fan" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={
                      "size-8 rounded-full grid place-items-center shrink-0 " +
                      (m.role === "ai"
                        ? "bg-cyber/15 text-cyber border border-cyber/30"
                        : "bg-secondary/60 text-muted-foreground")
                    }
                  >
                    {m.role === "ai" ? <Bot className="size-4" /> : <User className="size-4" />}
                  </div>
                  <div
                    className={
                      "max-w-[80%] p-4 rounded-2xl border text-sm leading-relaxed " +
                      (m.role === "ai"
                        ? "bg-secondary/40 border-border rounded-tl-none text-foreground"
                        : "bg-cyber text-cyber-foreground border-cyber/40 rounded-tr-none")
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-background/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="relative"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask StadiumMind — try one of the suggestions →"
                  className="w-full bg-secondary/40 border border-border rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-cyber text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-2 text-cyber hover:bg-cyber/10 rounded"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="text-[10px] font-mono text-cyber uppercase tracking-widest">
            Try asking
          </div>
          {conciergePresets.map((p) => (
            <button
              key={p.q}
              onClick={() => send(p.q)}
              className="w-full text-left p-4 bg-card border border-border rounded-xl hover:border-cyber/40 transition-colors"
            >
              <p className="text-sm text-foreground leading-snug">{p.q}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}