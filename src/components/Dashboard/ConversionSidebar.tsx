import React from 'react';
import { MessageCircle, TrendingUp } from 'lucide-react';

interface ConversionSidebarProps {
  onCTAClick: () => void;
}

export default function ConversionSidebar({ onCTAClick }: ConversionSidebarProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:block" data-tour="sidebar">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-w-xs">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="text-teal-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Want your property data here?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Get a free walkthrough & performance estimate
          </p>
          <button
            onClick={onCTAClick}
            className="w-full bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white font-medium px-4 py-2 rounded-lg hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            Submit Interest
          </button>
        </div>
      </div>
    </div>
  );
}