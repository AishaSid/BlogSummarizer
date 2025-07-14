import React, { useState } from 'react';
import { Summary } from '../types';

export default function SummaryDisplay({ summary }: { summary: Summary }) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'urdu'>('summary');

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

return (
  <div className="space-y-6">
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2 animate-gradient bg-[length:400%_400%]">
          Summary Result
        </h2>
        <p className="text-gray-300 text-sm">
          Generated on {formatDate(summary.timestamp)}
        </p>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{summary.wordCount} words</span>
        </div>
      </div>
    </div>

    <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4">
      <div className="flex items-center gap-2 text-sm text-gray-100 mb-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span>Source</span>
      </div>
      <a
        href={summary.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-300 text-sm break-all"
      >
        {summary.url}
      </a>
    </div>

    <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-1">
      <div className="flex">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-xl ${
            activeTab === 'summary'
              ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white shadow-lg border border-purple-400/40'
              : 'text-gray-200 bg-black/20'
          }`}
        >
          English Summary
        </button>
        <button
          onClick={() => setActiveTab('urdu')}
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-xl ${
            activeTab === 'urdu'
              ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white shadow-lg border border-purple-400/40'
              : 'text-gray-200 bg-black/20'
          }`}
        >
          اردو ترجمہ
        </button>
      </div>
    </div>

    <div className="relative">
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-6 md:p-8 shadow-2xl">
        {activeTab === 'summary' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                English Summary
              </h3>
              <button
                onClick={() => copyToClipboard(summary.summary, 'summary')}
                className="flex items-center gap-2 px-4 py-2 text-sm text-purple-300 bg-black/30 rounded-lg border border-purple-400/40"
              >
                {copiedSection === 'summary' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-100 leading-relaxed text-base">{summary.summary}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                اردو ترجمہ
              </h3>
              <button
                onClick={() => copyToClipboard(summary.urduTranslation, 'urdu')}
                className="flex items-center gap-2 px-4 py-2 text-sm text-cyan-300 bg-black/30 rounded-lg border border-cyan-400/40"
              >
                {copiedSection === 'urdu' ? 'کاپی ہو گیا!' : 'کاپی'}
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-100 leading-relaxed text-base text-right" dir="rtl">
                {summary.urduTranslation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>

  </div>
);
}
