
import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'text' }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Script copied to clipboard!');
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 group">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          Copy Script
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed code-font text-cyan-50">
        <code>{code}</code>
      </pre>
    </div>
  );
};
