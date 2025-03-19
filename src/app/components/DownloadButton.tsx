'use client';

import { RefObject, useState } from 'react';

interface DownloadButtonProps {
  contentRef: RefObject<HTMLDivElement | null>;
}

const DownloadButton = ({ contentRef }: DownloadButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = () => {
    try {
      setIsGenerating(true);
      setErrorMessage(null);
      
      // Find the target element
      let targetElement: HTMLElement | null = document.querySelector('.bg-white.w-\\[210mm\\].h-\\[297mm\\]');
      
      if (!targetElement) {
        targetElement = document.getElementById('mobile-resume-content') || 
                       document.getElementById('tablet-resume-content') ||
                       contentRef.current;
      }
      
      if (!targetElement) {
        throw new Error('Resume content not found');
      }
      
      // Add print-only stylesheet
      const style = document.createElement('style');
      style.setAttribute('id', 'print-style');
      style.textContent = `
        @media print {
          /* Hide everything except our target */
          body > * {
            display: none !important;
          }
          
          /* Then show only the resume */
          #temp-print-container {
            display: block !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: visible !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
          }
          
          /* Fix right column colors */
          .right-column {
            background-color: #22405c !important;
            color: white !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          /* Ensure the border appears */
          .right-column.border-t-\\[20px\\], .right-column > div:first-child {
            border-top-color: #182d40 !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          /* Fix text colors in right column */
          .right-column * {
            color: white !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          /* Fix left column text color */
          .left-column {
            background-color: white !important;
            color: black !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          /* Ensure all text in left column is visible */
          .left-column * {
            color: black !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      const printContainer = document.createElement('div');
      printContainer.setAttribute('id', 'temp-print-container');
      printContainer.style.position = 'absolute';
      printContainer.style.left = '-9999px';
      printContainer.style.top = '0';
      printContainer.style.width = '210mm';
      printContainer.style.height = '297mm';
      const clone = targetElement.cloneNode(true) as HTMLElement;
      printContainer.appendChild(clone);
      document.body.appendChild(printContainer);
      
      const rightColumn = printContainer.querySelector('.right-column') as HTMLElement;
      if (rightColumn) {
        rightColumn.style.backgroundColor = '#22405c';
        rightColumn.style.color = 'white';
        
        if (rightColumn.classList.contains('border-t-[20px]')) {
          rightColumn.style.borderTopColor = '#182d40';
        }
        
        const rightColumnElements = rightColumn.querySelectorAll('*');
        rightColumnElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.color = 'white';
          }
        });
      }
      
      const leftColumn = printContainer.querySelector('.left-column') as HTMLElement;
      if (leftColumn) {
        leftColumn.style.backgroundColor = 'white';
        leftColumn.style.color = 'black';
        
        const leftColumnElements = leftColumn.querySelectorAll('*');
        leftColumnElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.color = 'black';
          }
        });
      }
      
      setTimeout(() => {
        window.print();
        
        setTimeout(() => {
          document.body.removeChild(printContainer);
          const printStyle = document.getElementById('print-style');
          if (printStyle) {
            document.head.removeChild(printStyle);
          }
          setIsGenerating(false);
        }, 1000);
      }, 500);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      
      let message = '';
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = 'Could not trigger PDF download. Please try in a different browser.';
      }
      
      setErrorMessage(message);
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="px-4 py-2 bg-[#1a4977] text-white rounded-md hover:bg-[#153a5f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Opening Print Dialog...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download PDF</span>
          </>
        )}
      </button>
      
      {errorMessage && (
        <div className="mt-2 text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default DownloadButton;