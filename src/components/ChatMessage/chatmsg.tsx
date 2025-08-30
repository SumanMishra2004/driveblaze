"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function ChatMessage({
  role,
  text,
}: {
  role: string;
  text: string;
}) {
  return (
    <Card
      className={`mb-2 ${
        role === "user" ? "bg-blue-50" : "bg-green-50"
      }`}
    >
      <CardContent className="p-3">
        <p className="text-sm whitespace-pre-wrap">
          <span className="font-bold capitalize">{role}: </span>
          {text}
        </p>
      </CardContent>
    </Card>
  );
}
