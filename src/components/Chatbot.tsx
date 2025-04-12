
import React, { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { generateUniqueId } from "../utils/helpers";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  userId: string;
  onUserIdChange: (userId: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ userId, onUserIdChange }) => {
  const [chatId] = useState<string>(generateUniqueId());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateUniqueId(),
      text: "¡Hola! Soy el asistente virtual de PetArg. ¿En qué puedo ayudarte?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim()) {
      alert("Por favor, ingresa tu nombre para continuar.");
      return;
    }
    
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: generateUniqueId(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setIsLoading(true);
    
    try {
      const messageId = generateUniqueId();
      const response = await fetch(
        "https://chatbot-backend.agreeablerock-8abd7837.brazilsouth.azurecontainerapps.io/ask/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            chat_id: chatId,
            message_id: messageId,
            question: message,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const botResponse: Message = {
        id: messageId,
        text: data.response || "Lo siento, hubo un problema al procesar tu pregunta.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: generateUniqueId(),
        text: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta nuevamente.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden animate-fade-in">
      <div className="bg-fiuba-500 text-white p-4">
        <h2 className="text-xl font-bold">Asistente Virtual de PetArg</h2>
        <div className="mt-2">
          <label htmlFor="userName" className="block text-sm font-medium text-white/90 mb-1">
            Tu nombre:
          </label>
          <input
            type="text"
            id="userName"
            value={userId}
            onChange={(e) => onUserIdChange(e.target.value)}
            placeholder="Ingresa tu nombre"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        style={{ maxHeight: "calc(100vh - 350px)" }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={msg.sender === "user" ? "user-message" : "bot-message"}
            >
              <div className="text-sm">{msg.text}</div>
              <div className="text-xs mt-1 opacity-70">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bot-message flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fiuba-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`p-2 rounded-lg ${
              isLoading || !message.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-fiuba-500 text-white hover:bg-fiuba-600"
            } transition-colors`}
            disabled={isLoading || !message.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
