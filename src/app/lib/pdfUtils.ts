import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Prepares an element for PDF generation by applying necessary styles
 * @param element The HTML element to prepare
 */
export const prepareElementForPdf = (element: HTMLElement): void => {
  // Add PDF-ready class
  element.classList.add('pdf-ready');
  
  // Fix image elements
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    // Set crossOrigin attribute
    img.setAttribute('crossOrigin', 'anonymous');
    
    // Ensure image has proper styling
    img.style.maxWidth = '100%';
    img.style.display = 'block';
    
    // Handle profile image specifically
    if (img.closest('.w-\\[115px\\]') || img.closest('[class*="rounded-full"]')) {
      img.style.borderRadius = '50%';
      img.style.width = '115px';
      img.style.height = '115px';
      img.style.objectFit = 'cover';
    }
  });
  
  // Fix right column background
  const rightColumn = element.querySelector('.right-column');
  if (rightColumn) {
    (rightColumn as HTMLElement).style.backgroundColor = '#22405c';
    (rightColumn as HTMLElement).style.color = 'white';
  }
};

/**
 * Creates a clone of an element for PDF generation
 * @param element The element to clone
 * @returns The cloned element in a temporary container
 */
export const createCloneForPdf = (element: HTMLElement): { 
  clone: HTMLElement, 
  container: HTMLElement 
} => {
  // Create a clone
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '210mm';
  container.style.height = '297mm';
  container.style.overflow = 'hidden';
  container.style.backgroundColor = '#ffffff';
  document.body.appendChild(container);
  
  // Reset any transform that might be applied
  clone.style.transform = 'none';
  clone.style.width = '210mm';
  clone.style.height = '297mm';
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.overflow = 'hidden';
  clone.style.boxShadow = 'none';
  
  // Prepare the clone for PDF
  prepareElementForPdf(clone);
  
  // Append the clone to the container
  container.appendChild(clone);
  
  return { clone, container };
};

/**
 * Fallback method for PDF generation that uses a simpler approach
 * @param element The element to convert to PDF
 */
export const generatePdfFallback = async (element: HTMLElement): Promise<void> => {
  console.log("Using fallback PDF generation method...");
  
  // Add PDF-ready class to the original element
  element.classList.add('pdf-ready');
  
  try {
    // Create a direct clone with simpler settings
    const { clone, container } = createCloneForPdf(element);
    
    // Wait longer for rendering in fallback mode
    console.log("Fallback: Waiting for rendering...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Use html2canvas with simpler settings
    console.log("Fallback: Starting html2canvas capture...");
    const canvas = await html2canvas(clone, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true,
      onclone: (clonedDoc) => {
        // Fix all images in the cloned document
        const clonedImages = clonedDoc.querySelectorAll('img');
        clonedImages.forEach(img => {
          img.crossOrigin = 'anonymous';
          img.style.maxWidth = '100%';
        });
      }
    });
    
    // Remove the temporary container
    document.body.removeChild(container);
    
    // Create a PDF
    console.log("Fallback: Creating PDF...");
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add the image to the PDF
    pdf.addImage(
      canvas.toDataURL('image/png', 0.9),
      'PNG',
      0,
      0,
      210,
      297
    );
    
    // Save the PDF
    console.log("Fallback: Saving PDF...");
    pdf.save('resume.pdf');
    console.log("Fallback: PDF saved successfully");
  } finally {
    // Clean up
    element.classList.remove('pdf-ready');
  }
};

/**
 * Last resort method for PDF generation that captures the element directly
 * @param element The element to convert to PDF
 */
export const generatePdfLastResort = async (element: HTMLElement): Promise<void> => {
  console.log("Using last resort PDF generation method...");
  
  // Add PDF-ready class
  element.classList.add('pdf-ready');
  
  try {
    // Direct capture of the element without cloning
    console.log("Last resort: Starting direct html2canvas capture...");
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true
    });
    
    // Create a PDF
    console.log("Last resort: Creating PDF...");
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add the image to the PDF
    pdf.addImage(
      canvas.toDataURL('image/png', 0.8),
      'PNG',
      0,
      0,
      210,
      297
    );
    
    // Save the PDF
    console.log("Last resort: Saving PDF...");
    pdf.save('resume.pdf');
    console.log("Last resort: PDF saved successfully");
  } finally {
    // Clean up
    element.classList.remove('pdf-ready');
  }
};

/**
 * Generates a PDF from the resume content
 * @param element The element to convert to PDF
 */
export const generatePdf = async (element: HTMLElement): Promise<void> => {
  console.log("Starting PDF generation from pdfUtils...");
  
  try {
    // Find the mobile resume content if it exists, otherwise use the provided element
    const mobileContent = document.getElementById('mobile-resume-content');
    const targetElement = mobileContent || element;
    
    console.log("Capturing element:", targetElement.id || 'unnamed element');
    
    // Create a temporary clone that we can work with
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    document.body.appendChild(tempContainer);
    
    // Clone the target element
    const clone = targetElement.cloneNode(true) as HTMLElement;
    
    // Reset transform and scaling for the clone
    clone.style.transform = 'none';
    clone.style.transformOrigin = 'unset';
    clone.style.width = '210mm';
    clone.style.height = '297mm';
    clone.style.margin = '0';
    clone.style.padding = '0';
    clone.style.boxShadow = 'none';
    clone.style.position = 'static';
    clone.style.overflow = 'hidden';
    
    // Add to temporary container
    tempContainer.appendChild(clone);
    
    // Fix any images in the clone
    const images = clone.querySelectorAll('img');
    const imagePromises: Promise<void>[] = [];
    
    images.forEach((img) => {
      img.style.maxWidth = '100%';
      img.crossOrigin = 'anonymous';
      
      if (img.complete) return;
      
      const promise = new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
      
      imagePromises.push(promise);
    });
    
    // Make sure right column has correct background color
    const rightColumn = clone.querySelector('.right-column');
    if (rightColumn) {
      (rightColumn as HTMLElement).style.backgroundColor = '#22405c';
      (rightColumn as HTMLElement).style.color = 'white';
    }
    
    // Wait for all images to load
    await Promise.all(imagePromises);
    
    // Wait a bit more for rendering
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Use html2canvas with high quality settings
    console.log("Starting canvas capture...");
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true,
      windowWidth: 210 * 3.78, // Convert mm to px (approximately)
      windowHeight: 297 * 3.78
    });
    
    // Remove the temp container and clone
    document.body.removeChild(tempContainer);
    
    // Create a PDF
    console.log("Creating PDF...");
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add the image to the PDF with high quality
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Add to PDF at exactly A4 dimensions
    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      210,
      297
    );
    
    // Save the PDF
    console.log("Saving PDF...");
    pdf.save('resume.pdf');
    console.log("PDF saved successfully");
    
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Could not generate PDF');
  }
}; 