import { NextRequest, NextResponse } from "next/server";

// Known Kolkata locations and residential areas
const KOLKATA_LOCATIONS = [
  "Park Street", "Esplanade", "Salt Lake", "New Town", "Rajarhat", "Alipore"
];


const GEOAI_PREFIX = `
You are GeoAI, a generative AI specialized in geographical and urban expansion analysis of Kolkata only.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userInput = messages[messages.length - 1]?.text || "";

    // Check if the location is already inside Kolkata
    const alreadyInside = KOLKATA_LOCATIONS.find(loc =>
      userInput.toLowerCase().includes(loc.toLowerCase())
    );

    if (alreadyInside) {
      return NextResponse.json({
        reply: "This location is already a part of Kolkata with 100% accuracy.",
      });
    }



    // Otherwise, fallback to Gemini API with prefix
    const modifiedInput = GEOAI_PREFIX + "if you dont know the answer then you may can deep research and find the exact answer with the best accuracy" + "i need little short annswer i prefered "+"\nUser query: " + userInput;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: modifiedInput }] }],
      }),
    });

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I don't know about this location.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("GeoAI API error:", err);
    return NextResponse.json(
      { error: "GeoAI Gemini API failed" },
      { status: 500 }
    );
  }
}