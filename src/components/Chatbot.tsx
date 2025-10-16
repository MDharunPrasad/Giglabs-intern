import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const predefinedQuestions = [
  "How do I register?",
  "What courses are available?",
  "What is the duration?",
  "How to contact support?",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      let response = "Thanks for your question! For detailed assistance, please contact support@giglabs.com";
      
      if (text.toLowerCase().includes("register")) {
        response = "You can register by clicking the 'Register Now' button on the homepage or visiting our Browse Courses page!";
      } else if (text.toLowerCase().includes("course")) {
        response = "We offer Full Stack, Frontend, Backend, UI/UX Design, AI/ML, and Prompt Engineering courses. Check out our Browse Courses page!";
      } else if (text.toLowerCase().includes("duration")) {
        response = "Our courses range from 1 to 3 months depending on the program. Visit Browse Courses for specific details!";
      } else if (text.toLowerCase().includes("support") || text.toLowerCase().includes("contact")) {
        response = "You can reach us at support@giglabs.com or call us at +1 (555) 123-4567. We're here to help!";
      }

      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-accent-glow bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient z-50 hover:scale-110 transition-all border-2 border-white/20"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 z-50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-accent to-primary p-5 rounded-t-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">GigLabs AI</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-white/90 text-xs">Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                    message.isUser
                      ? "bg-gradient-to-br from-primary to-accent text-white rounded-br-sm"
                      : "bg-muted/80 text-foreground rounded-bl-sm backdrop-blur-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Predefined Questions */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {predefinedQuestions.map((question, index) => (
              <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(question)}
                  className="text-xs hover:bg-primary/10 hover:border-primary/50 transition-all"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-muted/30 rounded-b-3xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-background/80 border-border/50 focus:border-primary/50 rounded-xl"
              />
              <Button type="submit" size="icon" className="gradient-primary rounded-xl hover:scale-105 transition-transform">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
