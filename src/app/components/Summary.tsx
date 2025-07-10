import React from 'react';          

import { Summary } from '../types';

export default function SummaryDisplay({ summary }: { summary: Summary }) {
  return (
    <div className="mb-4">
      <h2 className="font-bold mb-1">Summary</h2>
      <p className="bg-green-100 p-2 rounded mb-2">{summary.summary}</p>
      <h2 className="font-bold mb-1">Urdu Translation</h2>
      <p className="bg-purple-100 p-2 rounded text-right" dir="rtl">{summary.urduTranslation}</p>
    </div>
  );
}

