"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

// Mock data structure to match your original types
interface User {
  id: number;
  username: string;
  avatar: string;
}

interface Message {
  id: number;
  payload: string;
  userId: number;
  created_at: Date;
  user: User;
}

// Sample data for demonstration
const sampleMessages: Message[] = [
  {
    id: 1,
    payload: "Hey there! How's your day going?",
    userId: 2,
    created_at: new Date(Date.now() - 3600000),
    user: { id: 2, username: "Alice", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
  },
  {
    id: 2,
    payload: "Pretty good! Just working on some new projects. What about you?",
    userId: 1,
    created_at: new Date(Date.now() - 3000000),
    user: { id: 1, username: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
  },
  {
    id: 3,
    payload: "Same here! I've been diving deep into some UI/UX improvements. The chat interface is looking amazing now! ✨",
    userId: 2,
    created_at: new Date(Date.now() - 1800000),
    user: { id: 2, username: "Alice", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
  },
  {
    id: 4,
    payload: "That sounds exciting! I'd love to see what you've been working on.",
    userId: 1,
    created_at: new Date(Date.now() - 900000),
    user: { id: 1, username: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
  }
];

const formatToTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export default function ChatMessagesList() {
  const [messages, setMessages] = useState(sampleMessages);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userId = 1; // Current user ID

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    setMessage(value);
    
    // Simulate typing indicator
    setIsTyping(value.length > 0);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim() || isSending) return;

    setIsSending(true);
    const newMessage: Message = {
      id: messages.length + 1,
      payload: message.trim(),
      userId: userId,
      created_at: new Date(),
      user: { id: userId, username: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
    };

    setMessage("");
    setIsTyping(false);
    
    // Add message with animation delay
    setTimeout(() => {
      setMessages(prev => [...prev, newMessage]);
      setIsSending(false);
    }, 300);

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "That's really interesting! Tell me more about it.",
        "I completely agree with that perspective! 👍",
        "Thanks for sharing! That's very helpful.",
        "Awesome! Keep up the great work! 🚀",
        "I see what you mean. That makes a lot of sense."
      ];
      
      const responseMessage: Message = {
        id: messages.length + 2,
        payload: responses[Math.floor(Math.random() * responses.length)],
        userId: 2,
        created_at: new Date(),
        user: { id: 2, username: "Alice", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const MessageBubble = ({ msg, isOwn }: { msg: Message; isOwn: boolean }) => (
    <div className={`flex gap-3 items-end group ${isOwn ? "flex-row-reverse" : ""} animate-in slide-in-from-bottom-2 duration-500`}>
      {!isOwn && (
        <div className="relative">
          <img
            src={msg.user.avatar}
            alt={msg.user.username}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10 transition-transform group-hover:scale-110"
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
        </div>
      )}
      
      <div className={`flex flex-col gap-1 max-w-xs sm:max-w-md ${isOwn ? "items-end" : "items-start"}`}>
        <div className={`relative px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
          isOwn 
            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md" 
            : "bg-white text-slate-800 rounded-bl-md border border-slate-200"
        }`}>
          <p className="text-sm leading-relaxed break-words">{msg.payload}</p>
          
          {/* Message tail */}
          <div className={`absolute bottom-0 w-3 h-3 ${
            isOwn 
              ? "right-0 bg-purple-600 rounded-bl-full -mr-1" 
              : "left-0 bg-white border-l border-b border-slate-200 rounded-br-full -ml-1"
          }`}></div>
        </div>
        
        <span className={`text-xs text-slate-500 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
          isOwn ? "text-right" : "text-left"
        }`}>
          {formatToTimeAgo(msg.created_at.toString())}
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Chat with Alice"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-200"
          />
          <div>
            <h1 className="font-semibold text-slate-900">Alice Johnson</h1>
            <p className="text-sm text-slate-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              msg={msg} 
              isOwn={msg.userId === userId} 
            />
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 items-end animate-in slide-in-from-bottom-2 duration-300">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                alt="Alice typing"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
              />
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-lg border border-slate-200">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-white/20 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={onSubmit} className="relative">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-200 transition-all duration-300 focus-within:shadow-xl focus-within:border-blue-300">
              <input
                ref={inputRef}
                required
                onChange={onChange}
                value={message}
                disabled={isSending}
                className="flex-1 bg-transparent rounded-2xl px-6 py-4 text-slate-700 placeholder-slate-400 focus:outline-none disabled:opacity-50"
                type="text"
                name="message"
                placeholder="Type your message..."
              />
              
              <button
                type="submit"
                disabled={!message.trim() || isSending}
                className={`mr-2 p-2 rounded-xl transition-all duration-300 ${
                  message.trim() && !isSending
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isSending ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <PaperAirplaneIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            
            {/* Input feedback */}
            <div className="flex justify-between items-center mt-2 px-2">
              <span className={`text-xs transition-opacity duration-200 ${
                message.length > 0 ? "opacity-100 text-slate-500" : "opacity-0"
              }`}>
                {message.length}/1000
              </span>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  onClick={() => inputRef.current?.focus()}
                >
                  <span className="text-xs">Press Enter to send</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}