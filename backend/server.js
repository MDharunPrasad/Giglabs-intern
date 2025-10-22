// Backend proxy for OpenAI API calls (for production security)
// This keeps the API key secure on the server side

import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "your-api-key-here",
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    console.log("🚀 Backend: Received chat request");
    const { message, conversationHistory = [] } = req.body;
    console.log("🚀 Backend: Message:", message);
    console.log(
      "🚀 Backend: Conversation history length:",
      conversationHistory.length
    );

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Prepare messages for OpenAI
    const messages = [
      {
        role: "system",
        content: `You are GigLabs AI Assistant, a friendly and helpful chatbot for GigLabs - a tech education platform. 

IMPORTANT: Be conversational, warm, and engaging. Respond naturally to greetings and casual conversation.

Your personality:
- Friendly and approachable
- Encouraging about learning tech skills
- Professional but not formal
- Use emojis occasionally to be more engaging
- Keep responses conversational and natural

Your role:
- Help students with course information, registration, and learning guidance
- Provide information about our courses: Full Stack Development, Frontend Development, Backend Development, UI/UX Design, AI/ML, and Prompt Engineering
- Assist with enrollment, payment, and support queries
- Be encouraging and supportive about learning tech skills
- Keep responses concise but informative
- If you don't know something specific about GigLabs, suggest contacting support@giglabs.com

Course Information:
- Full Stack Development: Complete web development (3 months)
- Frontend Development: React, HTML, CSS, JavaScript (2 months)  
- Backend Development: Node.js, Python, databases (2 months)
- UI/UX Design: Design principles, Figma, user research (2 months)
- AI/ML: Machine learning fundamentals (2 months)
- Prompt Engineering: AI tools and techniques (1 month)

Examples of good responses:
- "Hi!" → "Hello! 👋 Welcome to GigLabs! I'm here to help you with any questions about our tech courses. What would you like to know?"
- "How are you?" → "I'm doing great, thanks for asking! 😊 I'm excited to help you explore our amazing tech courses. What brings you here today?"
- "What courses do you have?" → "We have some fantastic courses! 🚀 We offer Full Stack Development, Frontend Development, Backend Development, UI/UX Design, AI/ML, and Prompt Engineering. Which one interests you most?"

Always be helpful, professional, and encouraging. If asked about pricing or specific details not covered, direct them to contact support@giglabs.com or visit our Browse Courses page.`,
      },
      ...conversationHistory,
      { role: "user", content: message },
    ];

    console.log("🚀 Backend: Making OpenAI API call...");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const response =
      completion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response. Please try again.";

    console.log("🚀 Backend: OpenAI response:", response);

    res.json({
      content: response,
      success: true,
    });
  } catch (error) {
    console.error("❌ Backend OpenAI API Error:", error);
    res.status(500).json({
      error: "Failed to get AI response",
      content:
        "I'm sorry, I'm having trouble connecting right now. Please try again or contact support@giglabs.com for assistance.",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "GigLabs AI Backend is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 GigLabs AI Backend running on port ${PORT}`);
  console.log(`📡 Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
});

export default app;
