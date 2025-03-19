"use client";

import { FC, useRef, useEffect } from 'react';
import { ResumeData } from '../types/datatypes';
import { getTemplateById, TemplateId } from './templates';
import { 
  generatePdf, 
  generateSimplePdf, 
  generateBasicPdf,
  generateSvgPdf, 
  generateColorSafePdf,
  generateDirectCanvasPdf,
  generateScreenshotPdf,
  generateStaticPdf,
  generateTextPdf
} from './Resume';

interface ResumeWrapperProps extends ResumeData {
  templateId: TemplateId;
}

// Component that wraps around the selected template
const ResumeWrapper: FC<ResumeWrapperProps> = (props) => {
  const { templateId, ...resumeData } = props;
  
  // Get the selected template component
  const selectedTemplate = getTemplateById(templateId);
  const TemplateComponent = selectedTemplate.component;
  
  // Used to track and apply template-specific classes for PDF generation
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Add template-specific classes to help with PDF generation
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.dataset.templateId = templateId;
    }
  }, [templateId]);
  
  return (
    <div className="template-wrapper" ref={wrapperRef} data-template-id={templateId}>
      <TemplateComponent {...resumeData} />
    </div>
  );
}

// Export all PDF generation functions from the original Resume component
export { 
  generatePdf, 
  generateSimplePdf, 
  generateBasicPdf,
  generateSvgPdf, 
  generateColorSafePdf,
  generateDirectCanvasPdf,
  generateScreenshotPdf,
  generateStaticPdf,
  generateTextPdf
};

export default ResumeWrapper; 