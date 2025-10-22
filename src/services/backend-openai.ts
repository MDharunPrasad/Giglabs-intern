// Alternative OpenAI service using backend proxy (recommended for production)
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  content: string;
  error?: string;
}

export class BackendOpenAIService {
  private static instance: BackendOpenAIService;
  private conversationHistory: ChatMessage[] = [];
  private backendUrl: string;
  private lastUserMessage: string = "";
  private conversationContext: string = "";

  private constructor() {
    // Use backend URL or fallback to frontend service
    this.backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
  }

  public static getInstance(): BackendOpenAIService {
    if (!BackendOpenAIService.instance) {
      BackendOpenAIService.instance = new BackendOpenAIService();
    }
    return BackendOpenAIService.instance;
  }

  public async sendMessage(userMessage: string): Promise<ChatResponse> {
    try {
      console.log("🌐 Backend OpenAI Service: Sending message:", userMessage);
      
      // Store context for better fallback responses
      this.lastUserMessage = userMessage;
      this.conversationContext = this.conversationHistory.length > 0 ? 
        this.conversationHistory[this.conversationHistory.length - 1]?.content || "" : "";
      
      // Add user message to conversation history
      this.conversationHistory.push({
        role: "user",
        content: userMessage
      });

      // Keep only last 10 messages to manage context length
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      console.log("🌐 Backend OpenAI Service: Making API call to backend...");
      const response = await fetch(`${this.backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: this.conversationHistory.slice(0, -1) // Exclude the current user message
        }),
      });

      console.log("🌐 Backend OpenAI Service: Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const data = await response.json();
      console.log("🌐 Backend OpenAI Service: Received data:", data);
      
      if (data.success) {
        // Add assistant response to conversation history
        this.conversationHistory.push({
          role: "assistant",
          content: data.content
        });

        return { content: data.content };
      } else {
        throw new Error(data.error || 'Unknown backend error');
      }

    } catch (error) {
      console.error("❌ Backend OpenAI Service Error:", error);
      
      // Enhanced fallback responses with context awareness
      const fallbackResponse = this.getContextualFallbackResponse(userMessage);
      console.log("🔄 Using contextual fallback response:", fallbackResponse);
      
      return { 
        content: fallbackResponse,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  private getContextualFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    const context = this.conversationContext.toLowerCase();
    
    // Handle follow-up questions based on context
    if (context.includes("certificate") && (message.includes("not received") || message.includes("missing") || message.includes("didn't get"))) {
      return "I understand you haven't received your certificate yet! 📜 Certificates are issued after completing 10 modules in any course. Please contact support@giglabs.com with your student details, and our team will help you get your certificate!";
    }
    
    if (context.includes("website") && message.includes("about")) {
      return "GigLabs is a tech education platform! 🚀 We offer comprehensive courses in Full Stack Development, Frontend Development, Backend Development, UI/UX Design, AI/ML, and Prompt Engineering. We help students master real-world tech skills and launch their careers in technology!";
    }
    
    // Use the main fallback response
    return this.getFallbackResponse(userMessage);
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
    
    if (message.includes("good morning") || message.includes("good afternoon") || message.includes("good evening")) {
      return "Good day! 🌅 I'm GigLabs AI Assistant, ready to help you with our tech courses. How can I assist you today?";
    }
    
    if (message.includes("what") && message.includes("your") && message.includes("name")) {
      return "I'm GigLabs AI Assistant! 🤖 I'm here to help you learn about our tech courses and guide you through your learning journey. What would you like to know?";
    }
    
    if (message.includes("who") && message.includes("you")) {
      return "I'm GigLabs AI Assistant! 🤖 I help students learn about our tech courses, answer questions about enrollment, and provide guidance on our programs. How can I help you today?";
    }
    
    // Handle website/about questions
    if (message.includes("what") && (message.includes("website") || message.includes("site") || message.includes("this"))) {
      return "GigLabs is a tech education platform! 🚀 We offer comprehensive courses in Full Stack Development, Frontend Development, Backend Development, UI/UX Design, AI/ML, and Prompt Engineering. We help students master real-world tech skills and launch their careers in technology!";
    }
    
    if (message.includes("about") || message.includes("company") || message.includes("organization")) {
      return "GigLabs is a leading tech education platform! 🎓 We specialize in teaching practical, industry-relevant skills through our comprehensive courses. Our mission is to help students become successful tech professionals!";
    }
    
    // Handle certificate-related queries
    if (message.includes("certificate") || message.includes("cert")) {
      if (message.includes("not received") || message.includes("missing") || message.includes("didn't get")) {
        return "I understand you haven't received your certificate yet! 📜 Certificates are issued after completing 10 modules in any course. Please contact support@giglabs.com with your student details, and our team will help you get your certificate!";
      }
      if (message.includes("how") || message.includes("get") || message.includes("earn")) {
        return "To earn a certificate at GigLabs! 🏆 Complete 10 modules in any course and you'll automatically become eligible for a certificate and badge. Contact support@giglabs.com for more details!";
      }
      return "Certificates are awarded after completing 10 modules! 🏆 Contact support@giglabs.com for certificate-related questions!";
    }
    
    if (message.includes("badge") || message.includes("achievement")) {
      return "Badges are earned along with certificates! 🏅 Complete 10 modules to unlock both your certificate and badge. Contact support@giglabs.com for assistance!";
    }
    
    // Handle module/progress queries
    if (message.includes("module") || message.includes("progress") || message.includes("complete")) {
      return "Track your progress through our courses! 📊 Complete 10 modules to earn your certificate and badge. Check your dashboard or contact support@giglabs.com for progress updates!";
    }
    
    if (message.includes("register") || message.includes("sign up") || message.includes("enroll")) {
      return "Great! You can register by clicking the 'Register Now' button on our homepage or visiting the Browse Courses page. For assistance, contact support@giglabs.com 📝";
    }
    
    if (message.includes("course") || message.includes("program") || message.includes("class")) {
      return "We have some fantastic courses! 🚀 We offer Full Stack Development, Frontend Development, Backend Development, UI/UX Design, AI/ML, and Prompt Engineering. Which one interests you most?";
    }
    
    if (message.includes("price") || message.includes("cost") || message.includes("fee") || message.includes("expensive")) {
      return "For detailed pricing information, please contact our support team at support@giglabs.com or visit our Browse Courses page. 💰";
    }
    
    if (message.includes("duration") || message.includes("length") || message.includes("time") || message.includes("long")) {
      return "Our courses range from 1 to 3 months depending on the program. Full Stack Development is 3 months, while other courses are typically 1-2 months. ⏰";
    }
    
    if (message.includes("support") || message.includes("help") || message.includes("contact") || message.includes("problem")) {
      return "I'm here to help! 😊 You can also reach our support team at support@giglabs.com or call us at +1 (555) 123-4567.";
    }
    
    if (message.includes("job") || message.includes("career") || message.includes("placement") || message.includes("hire")) {
      return "Our courses are designed to prepare you for tech careers! 💼 We provide industry-relevant skills and project experience. Contact support@giglabs.com for career guidance.";
    }
    
    if (message.includes("full stack") || message.includes("fullstack")) {
      return "Full Stack Development is our comprehensive 3-month program! 🚀 You'll learn both frontend (React, HTML, CSS, JavaScript) and backend (Node.js, Python, databases) technologies. It's perfect for becoming a complete web developer!";
    }
    
    if (message.includes("frontend") || message.includes("front end")) {
      return "Frontend Development is a 2-month course! 🎨 You'll master React, HTML, CSS, JavaScript, and modern web development tools. Perfect for creating beautiful, interactive user interfaces!";
    }
    
    if (message.includes("backend") || message.includes("back end")) {
      return "Backend Development is a 2-month program! ⚙️ You'll learn Node.js, Python, databases, APIs, and server-side technologies. Essential for building robust web applications!";
    }
    
    if (message.includes("ui") || message.includes("ux") || message.includes("design")) {
      return "UI/UX Design is a 2-month course! 🎨 You'll learn design principles, Figma, user research, and create amazing user experiences. Perfect for creative minds who love design!";
    }
    
    if (message.includes("ai") || message.includes("ml") || message.includes("machine learning")) {
      return "AI/ML is a 2-month program! 🤖 You'll learn machine learning fundamentals, data science, and artificial intelligence concepts. Perfect for the future of tech!";
    }
    
    if (message.includes("prompt") || message.includes("engineering")) {
      return "Prompt Engineering is a 1-month course! ✨ You'll master AI tools and techniques, learn to work with AI models effectively, and become an AI expert!";
    }
    
    if (message.includes("learn") || message.includes("study") || message.includes("education")) {
      return "That's awesome! 🎓 GigLabs offers amazing tech courses to help you learn and grow. We have Full Stack, Frontend, Backend, UI/UX, AI/ML, and Prompt Engineering programs. Which interests you?";
    }
    
    if (message.includes("beginner") || message.includes("start") || message.includes("new")) {
      return "Perfect! 🌟 We welcome beginners! Our courses are designed for all skill levels. I'd recommend starting with Frontend Development or UI/UX Design. Contact support@giglabs.com for personalized guidance!";
    }
    
    // Handle technical issues
    if (message.includes("error") || message.includes("issue") || message.includes("problem") || message.includes("bug")) {
      return "I'm sorry you're experiencing issues! 🔧 Please contact our technical support at support@giglabs.com with details about the problem, and our team will help you resolve it quickly!";
    }
    
    // Handle payment/billing queries
    if (message.includes("payment") || message.includes("billing") || message.includes("invoice") || message.includes("refund")) {
      return "For payment and billing questions, please contact our support team at support@giglabs.com. They'll help you with invoices, refunds, and payment-related queries! 💳";
    }
    
    // Handle schedule/timing queries
    if (message.includes("schedule") || message.includes("time") || message.includes("when") || message.includes("available")) {
      return "Course schedules vary by program! 📅 Contact support@giglabs.com for specific timing information and availability. We offer flexible learning options to fit your schedule!";
    }
    
    // Default friendly response
    return "Thanks for your message! 😊 I'm here to help you with questions about our courses and services. Feel free to ask me about our programs, enrollment, certificates, or anything else about GigLabs!";
  }

  public clearHistory(): void {
    this.conversationHistory = [];
  }

  public async checkBackendHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.backendUrl}/api/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const backendOpenaiService = BackendOpenAIService.getInstance();
