'use client';

import React, { useState } from 'react';


type Summary = {
  id: number;
  url: string;
  title: string;
  summary: string;
  urduTranslation: string;
  timestamp: string;
  wordCount: number;
};

const generateSummary = (url: string): string => {
  // Simulate a summary generation
  return `This is a summary of the blog at ${url}. It contains important information and insights.`;
};

// Translate to Urdu
const translateToUrdu = (text: string): string => {
  // Simulate translation to Urdu
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
    <div className="min-h-screen p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter blog URL"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="mt-2 p-2 bg-blue-600 text-white rounded"
        >
          {isLoading ? 'Processing...' : 'Summarize'}</button>
      </form>

      {currentSummary && (
        <div className="mb-4">
          <h2 className="font-bold mb-1">Summary</h2>
          <p className="bg-green-100 p-2 rounded mb-2">{currentSummary.summary}</p>
          <h2 className="font-bold mb-1">Urdu Translation</h2>
          <p className="bg-purple-100 p-2 rounded text-right" dir="rtl">{currentSummary.urduTranslation}</p>
        </div>
      )}

      <div>
        <h2 className="font-bold mb-2">History</h2>
        {history.map(item => (
          <div key={item.id} className="border p-2 rounded mb-2">
            <div className="flex justify-between">
              <span onClick={() => selectFromHistory(item)} className="cursor-pointer text-blue-600">{item.title}</span>
              <button onClick={() => deleteFromHistory(item.id)} className="text-red-500">Delete</button>
            </div>
            <div className="text-sm text-gray-500">{item.url}</div>
            {expandedHistory[item.id] && (
              <div className="mt-2 text-sm">{item.summary}</div>
            )}
            <button onClick={() => toggleHistoryExpansion(item.id)} className="text-xs mt-1 text-gray-600">
              {expandedHistory[item.id] ? 'Hide' : 'Show'} summary
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
