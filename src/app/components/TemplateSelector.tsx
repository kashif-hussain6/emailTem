"use client";

import { FC } from 'react';
import { TEMPLATES, TemplateId } from './templates';

interface TemplateSelectorProps {
  selectedTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

const TemplateSelector: FC<TemplateSelectorProps> = ({ 
  selectedTemplateId, 
  onSelectTemplate 
}) => {
  return (
    <div className="template-selector">
      <h2 className="text-lg font-medium mb-4">Choose a Template</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {TEMPLATES.map((template) => {
          // Get the thumbnail component
          const ThumbnailComponent = template.thumbnailComponent;
          
          return (
            <div 
              key={template.id}
              className={`
                template-option p-3 border rounded-md cursor-pointer transition-all
                ${selectedTemplateId === template.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'}
              `}
              onClick={() => onSelectTemplate(template.id as TemplateId)}
            >
              <div className="flex items-center">
                <div className="w-20 h-28 relative mr-4 border border-gray-200 overflow-hidden">
                  {ThumbnailComponent ? (
                    <ThumbnailComponent />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      Preview
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedTemplateId === template.id && (
                      <span className="text-blue-500">Selected</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector; 