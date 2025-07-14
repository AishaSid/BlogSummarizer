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
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-400/40 to-pink-300/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
          <svg className="w-12 h-12 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-100 mb-2">No History Yet</h3>
        <p className="text-gray-300">Your summarized blogs will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
            History
          </h2>
          <p className="text-gray-200 text-sm mt-1">
            {history.length} summarized {history.length === 1 ? 'blog' : 'blogs'}
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => history.forEach(item => deleteFromHistory(item.id))}
            className="px-4 py-2 text-sm font-medium text-red-200 bg-red-500/30 hover:bg-red-500/40 rounded-lg transition-all duration-200 flex items-center space-x-2 backdrop-blur-sm border border-red-500/40 hover:border-red-400/60"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {history.map(item => (
          <div
            key={item.id}
            className={`
              relative bg-black/40 backdrop-blur-xl rounded-2xl border
              ${currentSummary?.id === item.id
                ? 'border-purple-400/60 bg-purple-400/15 shadow-lg shadow-purple-400/25'
                : 'border-white/20'
              }
            `}
          >
            <div className="relative p-4 md:p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => selectFromHistory(item)}
                    className="text-left w-full"
                  >
                    <h3 className="font-semibold text-lg text-white truncate mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300 truncate">
                      {item.url}
                    </p>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => selectFromHistory(item)}
                    className="p-2 text-purple-300 bg-black/30 rounded-lg border border-purple-400/40"
                    title="View Summary"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => deleteFromHistory(item.id)}
                    className="p-2 text-red-300 bg-black/30 rounded-lg border border-red-400/40"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-300 mb-3">
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

              {expandedHistory[item.id] && (
                <div className="mb-4 p-4 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10">
                  <div className="text-sm text-gray-100 leading-relaxed">
                    {item.summary}
                  </div>
                </div>
              )}

              <button
                onClick={() => toggleHistoryExpansion(item.id)}
                className="flex items-center gap-2 text-sm font-medium text-purple-300"
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

              {currentSummary?.id === item.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}