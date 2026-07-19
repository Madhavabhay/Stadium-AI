import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(20),
});

const SYSTEM_PROMPT = `You are StadiumMind AI, the AI Brain of FIFA World Cup 2026 at SoFi Stadium.
You help both fans and operations staff with:
- Wayfinding (seats, gates, concourses, elevators, restrooms, food)
- Accessibility (wheelchair routes, sensory-quiet zones, companion seating)
- Transport (metro, shuttles, parking, ride-share pickup)
- Emergency guidance and incident triage
- Queue times and food/beverage recommendations
- Translation and multilingual assistance

Assume the user is at SoFi Stadium during a World Cup 2026 match unless stated otherwise.
Be concise (2-4 short sentences), specific, and action-oriented. Reference concrete
sectors, gates (Gate 1-8), concourses (A-D), elevator numbers, and estimated walk times
when helpful. If asked something outside stadium operations, gently redirect.`;

export const chatWithConcierge = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-2.5-flash");

    try {
      const result = await generateText({
        model,
        system: SYSTEM_PROMPT,
        messages: data.messages,
      });
      return { text: result.text };
    } catch (err) {
      const message = err instanceof Error ? err.message : "AI request failed";
      if (/429|rate/i.test(message)) {
        return { text: "⚠️ Rate limit reached on the AI Gateway. Please try again in a moment." };
      }
      if (/402|credit/i.test(message)) {
        return { text: "⚠️ AI credits exhausted for this workspace." };
      }
      return { text: `⚠️ AI error: ${message}` };
    }
  });