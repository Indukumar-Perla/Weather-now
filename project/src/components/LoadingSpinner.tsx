import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-pulse"></div>
        </div>
      </div>
      <div className="ml-4">
        <p className="text-gray-600 font-medium">Getting weather data...</p>
        <p className="text-sm text-gray-500">Please wait a moment</p>
      </div>
    </div>
  );
};