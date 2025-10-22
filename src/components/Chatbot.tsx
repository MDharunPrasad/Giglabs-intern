import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { backendOpenaiService } from "@/services/backend-openai";

const predefinedQuestions = [
  "👋 Hi there!",
  "What courses do you offer?",
  "How do I get started?",
  "Certificate not received",
  "What's the pricing?",
  "I need help with registration",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! 👋 I'm GigLabs AI Assistant. I'm here to help you with any questions about our tech courses. What would you like to know?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get AI response from backend
      const response = await backendOpenaiService.sendMessage(text);
      
      // Add AI response
      setMessages(prev => [...prev, { text: response.content, isUser: false }]);
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Fallback response
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I'm having trouble connecting right now. Please try again or contact support@giglabs.com for assistance.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([{ text: "Hello! 👋 I'm GigLabs AI Assistant. I'm here to help you with any questions about our tech courses. What would you like to know?", isUser: false }]);
    backendOpenaiService.clearHistory();
  };

  return (
    <>
      {/* Chatbot Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-accent-glow bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient z-50 hover:scale-110 transition-all border-2 border-white/20 group"
        size="icon"
        title={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 z-50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-accent to-primary p-5 rounded-t-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">GigLabs AI</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-white/90 text-xs">Smart Assistant</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={clearConversation}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2"
                  title="Clear conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
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
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted/80 text-foreground rounded-2xl rounded-bl-sm backdrop-blur-sm p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Predefined Questions */}
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {predefinedQuestions.map((question, index) => (
              <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(question)}
                  className="text-xs hover:bg-primary/10 hover:border-primary/50 transition-all rounded-full"
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
                placeholder={isLoading ? "AI is responding..." : "Type your message here..."}
                disabled={isLoading}
                className="flex-1 bg-background/80 border-border/50 focus:border-primary/50 rounded-xl disabled:opacity-50"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !inputValue.trim()}
                className="gradient-primary rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
