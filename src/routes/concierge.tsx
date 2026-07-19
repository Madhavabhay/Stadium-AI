import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SectionHeader } from "@/components/telemetry-card";
import { conciergePresets } from "@/lib/mock-data";
import { chatWithConcierge } from "@/lib/ai-concierge.functions";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";

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
      text: "Welcome to StadiumMind — powered by generative AI. I can help with navigation, tickets, accessibility, food, transport, translation, and more. What do you need?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chat = useServerFn(chatWithConcierge);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "fan", text: trimmed }];
    setMessages(next);
    setLoading(true);
    try {
      const history = next.map((m) => ({
        role: m.role === "fan" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));
      const res = await chat({ data: { messages: history } });
      setMessages((m) => [...m, { role: "ai", text: res.text }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMessages((m) => [...m, { role: "ai", text: `⚠️ ${message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <SectionHeader
        eyebrow="Gen AI · Gemini 2.5 Flash · multilingual · grounded on venue graph"
        title="AI Concierge"
      />

      <div className="flex items-center gap-2 text-[11px] font-mono text-cyber uppercase tracking-widest">
        <Sparkles aria-hidden="true" className="size-3.5" />
        Live Generative AI · Lovable AI Gateway
      </div>

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
              {loading && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full grid place-items-center shrink-0 bg-cyber/15 text-cyber border border-cyber/30">
                    <Bot className="size-4" />
                  </div>
                  <div className="max-w-[80%] p-4 rounded-2xl border bg-secondary/40 border-border rounded-tl-none text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
                    StadiumMind is thinking…
                  </div>
                </div>
              )}
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
                  disabled={loading}
                  placeholder={loading ? "Generating response…" : "Ask StadiumMind — try one of the suggestions →"}
                  className="w-full bg-secondary/40 border border-border rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-cyber text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Send message"
                  className="absolute right-2 top-2 p-2 text-cyber hover:bg-cyber/10 rounded disabled:opacity-40"
                >
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
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