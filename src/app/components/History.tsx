// components/History.tsx
import React from 'react';

import { Summary } from '../types';

interface HistoryProps {
  history: Summary[];
  currentSummary: Summary | null;
  expandedHistory: { [id: number]: boolean };
  selectFromHistory: (item: Summary) => void;
  deleteFromHistory: (id: number) => void;
  toggleHistoryExpansion: (id: number) => void;
}

export default function History({ history, currentSummary, expandedHistory, selectFromHistory, deleteFromHistory, toggleHistoryExpansion }: HistoryProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No History Yet</h3>
        <p className="text-gray-500">Your summarized blogs will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            History
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {history.length} summarized {history.length === 1 ? 'blog' : 'blogs'}
          </p>
        </div>
        
        {/* Clear All Button */}
        {history.length > 0 && (
          <button
            onClick={() => history.forEach(item => deleteFromHistory(item.id))}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* History Items */}
      <div className="space-y-4">
        {history.map(item => (
          <div 
            key={item.id} 
            className={`
              relative group bg-white/70 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 hover:shadow-xl
              ${currentSummary?.id === item.id 
                ? 'border-blue-500/50 bg-blue-50/50 shadow-lg' 
                : 'border-white/50 hover:border-blue-300/50'
              }
            `}
          >
            {/* Gradient border glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            
            <div className="relative p-4 md:p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => selectFromHistory(item)}
                    className="text-left w-full group-hover:text-blue-600 transition-colors duration-200"
                  >
                    <h3 className="font-semibold text-lg text-gray-800 truncate mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {item.url}
                    </p>
                  </button>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => selectFromHistory(item)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    title="View Summary"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => deleteFromHistory(item.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {item.wordCount} words
                </span>
              </div>

              {/* Expandable Summary */}
              {expandedHistory[item.id] && (
                <div className="mb-4 p-4 bg-gray-50/80 rounded-lg border border-gray-200/50">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {item.summary}
                  </div>
                </div>
              )}

              {/* Toggle Button */}
              <button
                onClick={() => toggleHistoryExpansion(item.id)}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${expandedHistory[item.id] ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span>
                  {expandedHistory[item.id] ? 'Hide' : 'Show'} summary
                </span>
              </button>

              {/* Current Selection Indicator */}
              {currentSummary?.id === item.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}