import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a202c] via-[#121212] to-[#0b0b0b] text-white">
      <div className="text-center">
        <div className="animate-spin w-16 h-16 border-4 border-t-4 border-indigo-500 rounded-full mx-auto mb-4"></div>
        <p className="text-xl font-semibold">Loading Blog Details...</p>
      </div>
    </div>
  );
}
