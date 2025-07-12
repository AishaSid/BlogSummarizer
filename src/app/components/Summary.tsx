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
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-2">
            Summary Result
          </h2>
          <p className="text-gray-600 text-sm">
            Generated on {formatDate(summary.timestamp)}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{summary.wordCount} words</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span>Source</span>
        </div>
        <a
          href={summary.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-700 transition-colors duration-200 text-sm break-all"
        >
          {summary.url}
        </a>
      </div>

      <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === 'summary'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-green-600'
          }`}
        >
          English Summary
        </button>
        <button
          onClick={() => setActiveTab('urdu')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === 'urdu'
              ? 'bg-white text-green-700 shadow-sm'
              : 'text-gray-600 hover:text-green-700'
          }`}
        >
          اردو ترجمہ
        </button>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-300 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-300"></div>

        <div className="relative bg-white/90 backdrop-blur-sm rounded-xl border-2 border-white/50 p-6 md:p-8 shadow-lg">
          {activeTab === 'summary' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  English Summary
                </h3>
                <button
                  onClick={() => copyToClipboard(summary.summary, 'summary')}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
                >
                  {copiedSection === 'summary' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-base">{summary.summary}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                  اردو ترجمہ
                </h3>
                <button
                  onClick={() => copyToClipboard(summary.urduTranslation, 'urdu')}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
                >
                  {copiedSection === 'urdu' ? 'کاپی ہو گیا!' : 'کاپی'}
                </button>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-base text-right" dir="rtl">
                  {summary.urduTranslation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 hover:bg-white border border-gray-200 rounded-lg transition-colors duration-200">
          Share
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 hover:bg-white border border-gray-200 rounded-lg transition-colors duration-200">
          Save
        </button>
      </div>
    </div>
  );
}
