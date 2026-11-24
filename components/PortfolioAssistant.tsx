"use client";

import { Bot, Send, X } from "lucide-react";
import { FormEvent, useState } from "react";

interface PortfolioAssistantProps {
  onClose: () => void;
}

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function PortfolioAssistant({ onClose }: PortfolioAssistantProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Ask me about Krishna's projects, skills, education, or the work behind this portfolio." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages })
      });
      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "The AI service could not respond.");
      }
      setMessages((current) => [...current, { role: "assistant", content: payload.reply as string }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The AI service could not respond.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-4 rounded-2xl border border-aiGreen/35 bg-black/50 p-4 shadow-[0_0_28px_rgba(0,255,156,0.12)] backdrop-blur-xl">
      <div className="mb-3 flex items-start justify-between gap-4 border-b border-aiGreen/20 pb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-aiGreen/35 bg-aiGreen/10 p-2">
            <Bot className="h-5 w-5 text-aiGreen" />
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-[0.18em] text-aiGreen">Sarathe.AI</p>
            <p className="text-xs text-textMain/65">Gemini-powered portfolio assistant</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="rounded-md border border-neonBlue/30 p-2 text-neonBlue transition hover:bg-neonBlue/10" aria-label="Close AI assistant">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="scrollbar-thin max-h-52 space-y-3 overflow-y-auto pr-2 text-sm">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-auto max-w-[80%] rounded-xl border border-neonBlue/35 bg-neonBlue/10 p-3 text-neonBlue" : "max-w-[88%] rounded-xl border border-aiGreen/25 bg-black/45 p-3 text-textMain/85"}>{message.content}</div>
        ))}
        {isLoading && <p className="font-mono text-xs text-aiGreen">Thinking...</p>}
      </div>
      {error && <p className="mt-3 rounded-lg border border-cyberPink/35 bg-cyberPink/10 p-2 text-xs text-cyberPink">{error}</p>}
      <form className="mt-3 flex gap-2" onSubmit={submit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isLoading}
          className="min-w-0 flex-1 rounded-lg border border-aiGreen/25 bg-black/60 px-3 py-2 text-sm text-aiGreen outline-none placeholder:text-aiGreen/45 focus:border-aiGreen/70 disabled:opacity-50"
          placeholder="Ask about a project, skill, or journey..."
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="rounded-lg border border-aiGreen/50 bg-aiGreen/10 px-3 text-aiGreen transition hover:bg-aiGreen/20 disabled:cursor-not-allowed disabled:opacity-45" aria-label="Send question">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}
