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


// Add these custom styles to your globals.css or component
return (
  <div>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Custom Styles */}

      {/* <style jsx>{customStyles}</style> */}
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-cyan-400/10 animate-gradient bg-[length:400%_400%]"></div>
        
        {/* Floating Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-4s' }}></div>
        
        {/* Meteor Effects */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-gradient-to-r from-purple-400 to-transparent rounded-full animate-meteor"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-gradient-to-r from-pink-400 to-transparent rounded-full animate-meteor" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full animate-meteor" style={{ animationDelay: '2s' }}></div>
        
        {/* Sparkle Effects */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-sparkle"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-cyan-400 rounded-full animate-sparkle" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30'  cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      <div className="relative z-10 min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center mb-8 animate-float">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 animate-gradient bg-[length:400%_400%]">
              Blog Summarizer
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transform lengthy blog posts into concise, digestible summaries with AI-powered insights
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 md:p-8 hover:bg-white/10 transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-2xl">
              {/* Pulse Ring Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 animate-pulse-ring"></div>
              
              <div className="relative z-10">
                <UrlInput 
                  url={url} 
                  isLoading={isLoading} 
                  setUrl={setUrl} 
                  handleSubmit={handleSubmit} 
                />
              </div>
            </div>
          </div>

          {currentSummary && (
            <div className="mb-8 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 md:p-8 ">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 "></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    <h2 className="text-xl font-semibold text-white">Current Summary</h2>
                  </div>
                  <SummaryDisplay summary={currentSummary} />
                </div>
              </div>
            </div>
          )}

          <div className="animate-float" style={{ animationDelay: '1s' }}>
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 md:p-8 ">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 "></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse"></div>
                  <h2 className="text-xl font-semibold text-white">History</h2>
                </div>
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
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></span>
            Built with React & Tailwind CSS
            <span className="w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-pulse"></span>
          </p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-pink-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 right-10 w-3 h-3 bg-purple-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Additional Floating Elements */}
      <div className="absolute top-1/3 left-5 w-1 h-1 bg-pink-300 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 right-5 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>
    </div>
  </div>
  );
}
