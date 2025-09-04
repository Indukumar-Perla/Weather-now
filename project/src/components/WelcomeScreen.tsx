import React from 'react';
import { Cloud, Search, MapPin } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
          <Cloud className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather Now</h1>
        <p className="text-gray-600 text-lg">
          Get instant weather updates for any city worldwide
        </p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">How to get started</h2>
        <div className="space-y-4 text-left">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Search className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Search for a city</h3>
              <p className="text-sm text-gray-600">Type any city name in the search box above</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Select your location</h3>
              <p className="text-sm text-gray-600">Choose from the suggested cities that appear</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Cloud className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">View weather</h3>
              <p className="text-sm text-gray-600">Get real-time weather conditions instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};