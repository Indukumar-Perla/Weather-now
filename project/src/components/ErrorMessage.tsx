import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};