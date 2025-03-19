"use client";

import { FC } from 'react';

interface ThumbnailProps {
  className?: string;
}

// Default template thumbnail preview
export const DefaultThumbnail: FC<ThumbnailProps> = ({ className = "" }) => {
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className="flex h-full">
        <div className="w-2/3 bg-white p-2">
          <div className="h-2 w-16 bg-gray-300 mb-2"></div>
          <div className="h-2 w-24 bg-gray-300 mb-4"></div>
          <div className="h-1 w-full bg-gray-200 mb-2"></div>
          <div className="h-1 w-full bg-gray-200 mb-2"></div>
          <div className="h-1 w-3/4 bg-gray-200 mb-4"></div>
          
          <div className="h-2 w-16 bg-gray-300 mb-2"></div>
          <div className="h-1 w-full bg-gray-200 mb-2"></div>
          <div className="h-1 w-full bg-gray-200 mb-2"></div>
        </div>
        <div className="w-1/3 bg-blue-900 p-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
          <div className="h-1 w-16 bg-gray-300 mx-auto mb-2"></div>
          <div className="h-1 w-12 bg-gray-300 mx-auto mb-4"></div>
          
          <div className="h-1 w-full bg-blue-800 mb-2"></div>
          <div className="h-1 w-full bg-blue-800 mb-1"></div>
        </div>
      </div>
    </div>
  );
};

// Modern template thumbnail preview
export const ModernThumbnail: FC<ThumbnailProps> = ({ className = "" }) => {
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className="h-1/4 bg-blue-600 p-2 flex items-center">
        <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
        <div>
          <div className="h-2 w-16 bg-gray-200 mb-1"></div>
          <div className="h-1 w-12 bg-gray-300"></div>
        </div>
      </div>
      
      <div className="h-1/12 bg-gray-100 p-1">
        <div className="h-1 w-2/3 bg-gray-300 mx-auto"></div>
      </div>
      
      <div className="flex-1 flex">
        <div className="w-3/5 p-2">
          <div className="h-2 w-16 bg-blue-500 mb-2"></div>
          <div className="h-1 w-full bg-gray-200 mb-1"></div>
          <div className="h-1 w-full bg-gray-200 mb-1"></div>
          <div className="h-1 w-3/4 bg-gray-200 mb-2"></div>
        </div>
        
        <div className="w-2/5 p-2">
          <div className="h-2 w-10 bg-blue-500 mb-2"></div>
          <div className="h-1 w-full bg-gray-200 mb-1"></div>
          <div className="h-1 w-full bg-gray-200 mb-1"></div>
        </div>
      </div>
    </div>
  );
};

// Minimal template thumbnail preview
export const MinimalThumbnail: FC<ThumbnailProps> = ({ className = "" }) => {
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className="p-2 text-center">
        <div className="h-2 w-16 bg-gray-800 mx-auto mb-1"></div>
        <div className="h-1 w-12 bg-gray-400 mx-auto mb-2"></div>
        
        <div className="flex justify-center gap-2 mb-2">
          <div className="h-1 w-6 bg-gray-300"></div>
          <div className="h-1 w-6 bg-gray-300"></div>
          <div className="h-1 w-6 bg-gray-300"></div>
        </div>
      </div>
      
      <div className="h-px bg-gray-200 mx-4 mb-2"></div>
      
      <div className="flex-1 flex p-2">
        <div className="w-1/3 p-1">
          <div className="h-1 w-10 bg-gray-700 mb-2"></div>
          <div className="h-1 w-full bg-gray-200 mb-1"></div>
          <div className="h-1 w-full bg-gray-200 mb-3"></div>
          
          <div className="h-1 w-10 bg-gray-700 mb-2"></div>
          <div className="h-1 w-full bg-gray-200 mb-1"></div>
        </div>
        
        <div className="w-2/3 p-1">
          <div className="h-1 w-12 bg-gray-700 mb-2"></div>
          <div className="h-1 w-full bg-gray-200 mb-1"></div>
          <div className="h-1 w-full bg-gray-200 mb-1"></div>
          <div className="h-1 w-3/4 bg-gray-200 mb-3"></div>
          
          <div className="h-1 w-12 bg-gray-700 mb-2"></div>
          <div className="h-1 w-full bg-gray-200 mb-1"></div>
        </div>
      </div>
    </div>
  );
}; 