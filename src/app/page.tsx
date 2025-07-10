'use client';

import React, { useState } from 'react';

import UrlInput from './components/UrlInput';
import SummaryDisplay from './components/Summary';
import History from './components/History';
import { Summary } from './types';


const generateSummary = (url: string): string => {
  return `This is a summary of the blog at ${url}. It contains important information and insights.  This is a summary of the blog at ${url}. It contains important information and insights.  This is a summary of the blog at ${url}. It contains important information and insights.`;
};

const translateToUrdu = (text: string): string => {
  return `یہ ${text} کا اردو ترجمہ ہے۔ اس میں اہم معلومات اور بصیرت شامل ہیں۔`;
};

export default function BlogSummarizer() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<Summary | null>(null);
  const [history, setHistory] = useState<Summary[]>([]);
  const [expandedHistory, setExpandedHistory] = useState<{ [id: number]: boolean }>({});

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      const summary = generateSummary(url);
      const urduTranslation = translateToUrdu(summary);

      const newSummary: Summary = {
        id: Date.now(),
        url,
        title: `Blog Summary - ${new Date().toLocaleDateString()}`,
        summary,
        urduTranslation,
        timestamp: new Date().toISOString(),
        wordCount: summary.split(' ').length
      };

      setCurrentSummary(newSummary);
      setHistory(prev => [newSummary, ...prev]);
      setIsLoading(false);
      setUrl('');
    }, 2000);
  };

  const deleteFromHistory = (id: number) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    if (currentSummary?.id === id) setCurrentSummary(null);
  };

  const toggleHistoryExpansion = (id: number) => {
    setExpandedHistory(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectFromHistory = (item: Summary) => {
    setCurrentSummary(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Blog Summarizer
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Transform lengthy blog posts into concise, digestible summaries with AI-powered insights
            </p>
          </div>
        </div>

        {/* Main container */}
        <div className="max-w-6xl mx-auto">
          {/* URL Input Section */}
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
              <UrlInput url={url} isLoading={isLoading} setUrl={setUrl} handleSubmit={handleSubmit} />
            </div>
          </div>

          {/* Summary Display Section */}
          {currentSummary && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
                <SummaryDisplay summary={currentSummary} />
              </div>
            </div>
          )}

          {/* History Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <History
              history={history}
              currentSummary={currentSummary}
              expandedHistory={expandedHistory}
              selectFromHistory={selectFromHistory}
              deleteFromHistory={deleteFromHistory}
              toggleHistoryExpansion={toggleHistoryExpansion}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Powered by AI • Built with React & Tailwind CSS
          </p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-indigo-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 right-10 w-3 h-3 bg-pink-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
}