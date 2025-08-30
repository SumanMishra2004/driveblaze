"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = { role: "user" | "assistant"; text: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { messages: newMessages });
      const reply = res.data.reply || "No response";

      // Typing animation with blinking cursor
      let currentText = "";
      const chars = reply.split("");
      let i = 0;

      const typing = () => {
        if (i <= chars.length) {
          currentText = chars.slice(0, i).join("");
          setMessages((msgs) => [
            ...msgs.slice(0, -1),
            { role: "assistant", text: currentText },
          ]);
          i++;
          setTimeout(typing, 20);
        } else {
          setLoading(false);
        }
      };

      // Placeholder for assistant message
      setMessages((msgs) => [...msgs, { role: "assistant", text: "" }]);
      typing();
    } catch (err) {
      console.error(err);
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", text: "❌ Error: Unable to get response." },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-11">
      {/* Chat Window */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-2xl shadow-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 relative"
              }`}
            >
              {msg.text}
              {/* Blinking cursor for assistant */}
              {msg.role === "assistant" && loading && (
                <span className="animate-blink">|</span>
              )}
            </div>
          </motion.div>
        ))}

        {/* Loading bubble for assistant */}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-2xl max-w-[75%]">
              <motion.span
                className="inline-block"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                Typing…
              </motion.span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="flex gap-2 p-4 border-t bg-blue-700">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
        />
        <Button
          onClick={sendMessage}
          disabled={loading}
          className="disabled:opacity-50"
        >
          Send
        </Button>
      </div>

      {/* Tailwind blinking cursor animation */}
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            display: inline-block;
            margin-left: 1px;
            animation: blink 1s infinite;
          }
        `}
      </style>
    </div>
  );
}
