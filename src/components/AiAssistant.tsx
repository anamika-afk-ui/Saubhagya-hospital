import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Trash2, Bot, User, Phone, Info, HelpCircle } from 'lucide-react';
import { Language, translations } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface AiAssistantProps {
  language: Language;
}

export default function AiAssistant({ language }: AiAssistantProps) {
  const t = translations[language];

  // Suggested prompt chips based on language
  const promptChips = language === 'en' ? [
    "What are the maternity packages?",
    "Show me the list of gynecologists",
    "What are the OPD timings?",
    "Where is the hospital located in Raipur?",
    "Symptom help: Child has high fever"
  ] : [
    "प्रसूति (डिलीवरी) पैकेजों की जानकारी",
    "स्त्री रोग विशेषज्ञों की सूची दिखाएं",
    "ओपीडी (OPD) परामर्श का समय क्या है?",
    "अस्पताल शिवानंद नगर में कहाँ स्थित है?",
    "मदद: बच्चे को तेज बुखार है"
  ];

  // State managers
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle send message
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    // User message
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'hi-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build chat history for Gemini context (send last 6 messages)
      const chatHistory = updatedMessages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmed,
          history: chatHistory.slice(0, -1) // pass history excluding the latest user message
        })
      });

      const data = await res.json();
      
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply || (language === 'en' ? "I'm sorry, I encountered an issue. Please try again." : "मुझे खेद है, कुछ तकनीकी समस्या हुई। कृपया पुनः प्रयास करें।"),
        timestamp: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'hi-IN', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: Message = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        content: language === 'en' 
          ? "Connection issue. Please verify that the server is online and try again." 
          : "कनेक्शन समस्या। कृपया जांचें कि सर्वर ऑनलाइन है और पुनः प्रयास करें।",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm(language === 'en' ? "Clear entire chat history?" : "क्या आप चैट इतिहास को मिटाना चाहते हैं?")) {
      setMessages([]);
    }
  };

  return (
    <section id="ai-chat-section" className="py-12 sm:py-16 bg-slate-50/50 border-t border-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 flex items-center gap-1 w-fit mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-teal-600 animate-pulse" />
            <span>AI SWASTHYA MITRA</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
            {t.chatTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            {t.chatSubtitle}
          </p>
        </div>

        {/* Chat Wrapper Box */}
        <div id="chat-frame" className="rounded-3xl border border-slate-100 bg-white shadow-xl overflow-hidden flex flex-col h-[580px] relative">
          
          {/* Chat Header */}
          <div className="bg-slate-900 text-white p-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-500/10 border border-teal-500/40 flex items-center justify-center text-teal-400">
                <Bot className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base tracking-wide text-white flex items-center gap-1">
                  <span>Saubhagya AI Mitra</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  {language === 'en' ? 'Online Healthcare Assistant' : 'ऑनलाइन स्वास्थ्य सहायक'}
                </p>
              </div>
            </div>

            {/* Actions */}
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="text-slate-400 hover:text-rose-400 transition focus:outline-hidden p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                title={language === 'en' ? 'Clear History' : 'इतिहास मिटाएं'}
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>
            )}
          </div>

          {/* Chat Area Scroll panel */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/20">
            
            {/* Disclaimer Announcement */}
            <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 text-slate-600 text-xs flex gap-2.5 max-w-3xl mx-auto">
              <Info className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                {t.chatDisclaimer}
              </p>
            </div>

            {/* Welcome messages */}
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="h-8 w-8 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                AI
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-xs p-4 shadow-xs text-sm text-slate-800 leading-relaxed font-medium">
                {t.chatWelcome}
              </div>
            </div>

            {/* Conversation Log */}
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-start gap-3 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ${
                  msg.role === 'user' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-slate-900 text-teal-400'
                }`}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : 'AI'}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-teal-600 text-white rounded-tr-xs font-medium' 
                    : 'bg-white border border-slate-100 text-slate-800 rounded-tl-xs shadow-xs font-normal whitespace-pre-line'
                }`}>
                  <p>{msg.content}</p>
                  <span className={`block text-[10px] mt-2 text-right ${
                    msg.role === 'user' ? 'text-teal-100' : 'text-slate-400'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Loader indicator */}
            {isLoading && (
              <div className="flex items-start gap-3 max-w-[80%] animate-pulse">
                <div className="h-8 w-8 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center text-xs font-bold shrink-0">
                  AI
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-xs p-4 shadow-xs text-sm text-slate-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Panel */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-50 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                disabled={isLoading}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-teal-500 hover:text-teal-600 transition cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
              >
                <HelpCircle className="h-3 w-3" />
                <span>{chip}</span>
              </button>
            ))}
          </div>

          {/* Send Area Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={t.chatPlaceholder}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm focus:border-teal-500 focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-12 w-12 shrink-0 rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
