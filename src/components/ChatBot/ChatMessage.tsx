
import React from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
          message.isBot
            ? 'bg-white/90 text-slate-900 border border-slate-200'
            : 'bg-gradient-to-r from-slate-900 to-teal-600 text-white'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}
