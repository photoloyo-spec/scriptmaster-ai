
import React from 'react';
import { Message, Sender } from '../types';
import { CodeBlock } from './CodeBlock';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAI = message.sender === Sender.AI;

  const renderContent = (text: string) => {
    // Basic markdown code block detection
    const parts = text.split(/```/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        const firstLineBreak = part.indexOf('\n');
        const lang = part.substring(0, firstLineBreak).trim() || 'script';
        const code = part.substring(firstLineBreak + 1).trim();
        return <CodeBlock key={index} code={code} language={lang} />;
      }
      
      // Regular text with line breaks
      return part.split('\n').map((line, i) => (
        <p key={`${index}-${i}`} className={line.trim() === '' ? 'h-2' : 'mb-1'}>
          {line}
        </p>
      ));
    });
  };

  return (
    <div className={`flex w-full mb-6 ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-lg ${
        isAI 
        ? 'bg-slate-800 border border-slate-700 text-slate-100 rounded-bl-none' 
        : 'bg-cyan-600 text-white rounded-br-none'
      }`}>
        <div className="text-xs mb-2 opacity-50 flex items-center gap-2">
          {isAI ? (
            <span className="font-bold text-cyan-400">SCRIPTMASTER AI</span>
          ) : (
            <span className="font-bold">USER</span>
          )}
          <span>• {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {renderContent(message.text)}
        </div>
      </div>
    </div>
  );
};
