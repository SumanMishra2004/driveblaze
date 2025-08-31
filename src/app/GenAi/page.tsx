"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  MoreVertical,
  Zap
} from "lucide-react";

type Message = { 
  role: "user" | "assistant"; 
  text: string; 
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "👋 Welcome to DataViz Pro AI Assistant! I'm here to help you with analytics, data visualization, and insights about your platform. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user" as const, text: input }];
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              GeoAi Assistant
            </h1>
            <p className="text-slate-500 text-sm">Powered by advanced AI • Always ready to help</p>
          </div>
          <div className="flex-1" />
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-600 text-sm font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full"
      >
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} group`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-blue-500 to-purple-600" 
                    : "bg-gradient-to-br from-emerald-500 to-cyan-600"
                }`}>
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <Card className={`p-4 shadow-lg border-0 relative ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                    : "bg-white/90 backdrop-blur-sm text-slate-800 border border-slate-200/50"
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                    {/* Typing cursor for assistant */}
                    {msg.role === "assistant" && loading && idx === messages.length - 1 && (
                      <motion.span
                        className="inline-block ml-1 w-0.5 h-5 bg-slate-400"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Message Actions */}
                  {msg.role === "assistant" && msg.text && !loading && (
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/30">
                      <span className="text-xs text-slate-500">
                        {formatTime(new Date())}
                      </span>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(msg.text)}
                          className="h-7 w-7 p-0 hover:bg-slate-100"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-emerald-100 hover:text-emerald-600"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* User message timestamp */}
                  {msg.role === "user" && (
                    <div className="flex justify-end mt-2">
                      <span className="text-xs text-white/70">
                        {formatTime(new Date())}
                      </span>
                    </div>
                  )}
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Animation */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <Card className="p-4 bg-white/90 backdrop-blur-sm border border-slate-200/50">
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="flex space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-slate-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-slate-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-slate-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </motion.div>
                  <span className="text-slate-600 text-sm">AI is thinking...</span>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200/50 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask about analytics, predictions, or data insights..."
                className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-500 text-base"
                disabled={loading}
              />
              {/* Input hint */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            
            <Button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 p-0"
            >
              <Send className={`w-5 h-5 text-white transition-transform duration-200 ${loading ? 'animate-pulse' : 'group-hover:translate-x-0.5'}`} />
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-2 mt-3">
            <span className="text-xs text-slate-500">Quick actions:</span>
            <button 
              onClick={() => setInput("Show me the analytics dashboard")}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full transition-colors duration-200"
            >
              Analytics Dashboard
            </button>
            <button 
              onClick={() => setInput("Explain the prediction model")}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full transition-colors duration-200"
            >
              Prediction Model
            </button>
            <button 
              onClick={() => setInput("Help with map visualization")}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full transition-colors duration-200"
            >
              Map Visualization
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-animation {
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981);
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  );
}