import React from 'react';

interface UrlInputProps {
  url: string;
  isLoading: boolean;
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => void;
}

export default function UrlInput({ url, isLoading, setUrl, handleSubmit }: UrlInputProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Enter Blog URL
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Paste any blog URL to get an instant AI-powered summary
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL Input Field */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/blog-post"
              className="w-full px-4 py-4 md:px-6 md:py-5 text-lg bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder:text-gray-400 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            />
            {/* Input Icon */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className={`
              relative px-8 py-4 md:px-10 md:py-5 text-lg font-semibold text-white rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600 
              hover:from-blue-700 hover:to-purple-700 
              focus:outline-none focus:ring-4 focus:ring-blue-500/20
              transform transition-all duration-300
              ${isLoading || !url.trim() 
                ? 'opacity-50 cursor-not-allowed scale-95' 
                : 'hover:scale-105 hover:shadow-2xl shadow-lg active:scale-95'
              }
              disabled:hover:scale-95 disabled:hover:shadow-lg
            `}
          >
            {/* Button background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            
            {/* Button content */}
            <div className="relative flex items-center space-x-3">
              {isLoading ? (
                <>
                  {/* Loading spinner */}
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {/* Summarize icon */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Summarize Blog</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Helper Text */}
        <div className="text-center text-sm text-gray-500">
          <p>Supports most blog platforms including Medium, WordPress, and more</p>
        </div>
      </form>
    </div>
  );
}