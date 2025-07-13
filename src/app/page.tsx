'use client';

import React, { useState, useEffect } from 'react';

import UrlInput from './components/UrlInput';
import SummaryDisplay from './components/Summary';
import History from './components/History';
import { Summary } from './types';
import { supabase } from '@/lib/supabase';



export default function BlogSummarizer() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<Summary | null>(null);
  const [history, setHistory] = useState<Summary[]>([]);
  const [expandedHistory, setExpandedHistory] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
  const fetchHistory = async () => {
    const res = await fetch('api/history');
    const data = await res.json();
    setHistory(data);
  };
  fetchHistory();
}, []);


  const handleSubmit = async (e: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);

    try {
    // Call your scrape API
    const response = await fetch('api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    const summary = data.summary;
    // replace this with actual AI call later
    const urduTranslation = data.urdu;

    const newSummary: Summary = {
      id: Date.now(),
      url,
      title: `Blog Summary - ${new Date().toLocaleDateString()}`,
      summary,
      urduTranslation,
      timestamp: new Date().toISOString(),
      wordCount: summary.split(' ').length
    };

    console.log("URL", url);
    console.log('New summary:', newSummary.summary);
    const {  error } = await supabase.from('Summmaries').insert([
  {
    url,
    summary: newSummary.summary,
    created_at: new Date().toISOString()
  }
]);


if (error) {
    console.error('Supabase insert error:', error);
} 

    setCurrentSummary(newSummary);
    setHistory(prev => [newSummary, ...prev]);
    setUrl('');
  
  
  }
catch (error) {
    console.error('Scraping failed:', error);
  } finally {
    setIsLoading(false);
  }
};

  const deleteFromHistory = async (id: number) => {
  // Delete from Supabase
  await fetch('api/history', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  // Update local state
  setHistory(prev => prev.filter(item => item.id !== id));
  if (currentSummary?.id === id) setCurrentSummary(null);
};


  const toggleHistoryExpansion = (id: number) => {
    setExpandedHistory(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectFromHistory = (item: Summary) => {
    setCurrentSummary(item);
  };


  //Frontend component for the main page
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#77D6EA] via-[#43DBC0] to-[#015D49] relative overflow-hidden">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#77D6EA] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#43DBC0] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#015D49] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
  </div>

      <div className="relative z-10 min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#015D49] via-[#309784] to-[#015D49] bg-clip-text text-transparent mb-4">
     Blog Summarizer
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Transform lengthy blog posts into concise, digestible summaries with AI-powered insights
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#A5A9AF] p-6 md:p-8">
     <UrlInput url={url} isLoading={isLoading} setUrl={setUrl} handleSubmit={handleSubmit} />
            </div>
          </div>

          {currentSummary && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
                <SummaryDisplay summary={currentSummary} />
              </div>
            </div>
          )}

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

        <div className="max-w-6xl mx-auto mt-12 text-center">
          <p className="text-gray-500 text-sm">
          • Built with React & Tailwind CSS
          </p>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-2 h-2 bg-[#309784] rounded-full opacity-60 animate-bounce"></div>
  <div className="absolute top-32 right-20 w-3 h-3 bg-[#43DBC0] rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
  <div className="absolute bottom-20 left-20 w-2 h-2 bg-[#015D49] rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
  <div className="absolute bottom-40 right-10 w-3 h-3 bg-[#A5A9AF] rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
</div>
  );
}
