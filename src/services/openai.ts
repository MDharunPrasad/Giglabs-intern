import OpenAI from "openai";

// Use environment variable for API key in production
const apiKey = import.meta.env.VITE_OPENAI_API_KEY || "your-api-key-here";

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true, // Required for browser usage
});

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  content: string;
  error?: string;
}

export class OpenAIService {
  private static instance: OpenAIService;
  private conversationHistory: ChatMessage[] = [];

  private constructor() {
    // Initialize with system prompt
    this.conversationHistory = [
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

Always be helpful, professional, and encouraging. If asked about pricing or specific details not covered, direct them to contact support@giglabs.com or visit our Browse Courses page.`
      }
    ];
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async sendMessage(userMessage: string): Promise<ChatResponse> {
    try {
      console.log("🤖 OpenAI Service: Sending message:", userMessage);
      
      // Add user message to conversation history
      this.conversationHistory.push({
        role: "user",
        content: userMessage
      });

      // Keep only last 10 messages to manage context length
      if (this.conversationHistory.length > 11) { // 1 system + 10 conversation
        this.conversationHistory = [
          this.conversationHistory[0], // Keep system message
          ...this.conversationHistory.slice(-10) // Keep last 10 messages
        ];
      }

      console.log("🤖 OpenAI Service: Making API call...");
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: this.conversationHistory,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const assistantMessage = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
      console.log("🤖 OpenAI Service: Received response:", assistantMessage);

      // Add assistant response to conversation history
      this.conversationHistory.push({
        role: "assistant",
        content: assistantMessage
      });

      return { content: assistantMessage };

    } catch (error) {
      console.error("❌ OpenAI API Error:", error);
      
      // Fallback responses based on common queries
      const fallbackResponse = this.getFallbackResponse(userMessage);
      console.log("🔄 Using fallback response:", fallbackResponse);
      
      return { 
        content: fallbackResponse,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  private getFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    // Handle greetings and casual conversation
    if (message.includes("hi") || message.includes("hello") || message.includes("hey")) {
      return "Hello! 👋 Welcome to GigLabs! I'm here to help you with any questions about our tech courses. What would you like to know?";
    }
    
    if (message.includes("how are you") || message.includes("how do you do")) {
      return "I'm doing great, thanks for asking! 😊 I'm excited to help you explore our amazing tech courses. What brings you here today?";
    }
    
    if (message.includes("thank") || message.includes("thanks")) {
      return "You're very welcome! 😊 I'm here anytime you need help with our courses or have questions about GigLabs. What else can I help you with?";
    }
    
    if (message.includes("register") || message.includes("sign up")) {
      return "Great! You can register by clicking the 'Register Now' button on our homepage or visiting the Browse Courses page. For assistance, contact support@giglabs.com";
    }
    
    if (message.includes("course") || message.includes("program")) {
      return "We have some fantastic courses! 🚀 We offer Full Stack Development, Frontend Development, Backend Development, UI/UX Design, AI/ML, and Prompt Engineering. Which one interests you most?";
    }
    
    if (message.includes("price") || message.includes("cost") || message.includes("fee")) {
      return "For detailed pricing information, please contact our support team at support@giglabs.com or visit our Browse Courses page. 💰";
    }
    
    if (message.includes("duration") || message.includes("length") || message.includes("time")) {
      return "Our courses range from 1 to 3 months depending on the program. Full Stack Development is 3 months, while other courses are typically 1-2 months. ⏰";
    }
    
    if (message.includes("support") || message.includes("help") || message.includes("contact")) {
      return "I'm here to help! 😊 You can also reach our support team at support@giglabs.com or call us at +1 (555) 123-4567.";
    }
    
    if (message.includes("job") || message.includes("career") || message.includes("placement")) {
      return "Our courses are designed to prepare you for tech careers! 💼 We provide industry-relevant skills and project experience. Contact support@giglabs.com for career guidance.";
    }
    
    // Default friendly response
    return "Thanks for your message! 😊 I'm here to help you with questions about our courses and services. Feel free to ask me anything about GigLabs!";
  }

  public clearHistory(): void {
    this.conversationHistory = [
      {
        role: "system",
        content: `You are GigLabs AI Assistant, a helpful and friendly chatbot for GigLabs - a tech education platform. 

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

Always be helpful, professional, and encouraging. If asked about pricing or specific details not covered, direct them to contact support@giglabs.com or visit our Browse Courses page.`
      }
    ];
  }
}

export const openaiService = OpenAIService.getInstance();
