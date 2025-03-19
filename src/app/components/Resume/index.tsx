"use client";

// This file is now just a backward compatibility layer
// Export the PDF generation functions that are used elsewhere

import { FC } from 'react';
import { HeaderData, Experience as ExperienceType, Education as EducationType, Language, SkillCategory, Achievement, Certification, Project, Passion, ResumeData } from '../../types/datatypes';
import Header from '../Header';
import Summary from '../Summary';
import ExperienceSection from '../Experience';
import EducationSection from '../Education';
import Languages from '../Languages';
import Skills from '../Skills';
import Achievements from '../Achievements';
import ProfileImage from '../ProfileImage';
import Certifications from '../Certifications';
import Projects from '../Projects';
import Passions from '../Passions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DefaultTemplate } from '../templates';

interface ResumeProps extends Omit<ResumeData, 'header'> {
  header: HeaderData;
  profileImage: string;
}

const A4_HEIGHT_MM = 297;
const A4_WIDTH_MM = 210;

const A4_HEIGHT_PX = 1123;
const A4_WIDTH_PX = 794;

const Resume: FC<ResumeProps> = (props) => {
  return <DefaultTemplate {...props} />;
};

export const generatePdf = async (element: HTMLElement): Promise<void> => {
  console.log("Starting direct PDF generation...");
  
  try {
    // Find the mobile resume content if it exists, otherwise use the provided element
    const mobileContent = document.getElementById('mobile-resume-content');
    const targetElement = mobileContent || element;
    
    console.log("Directly capturing element:", targetElement.id || 'unnamed element');
    
    // Store original styles we'll need to restore
    const originalTransform = targetElement.style.transform;
    const originalTransformOrigin = targetElement.style.transformOrigin;
    const originalPosition = targetElement.style.position;
    const originalZIndex = targetElement.style.zIndex;
    const originalVisibility = targetElement.style.visibility;
    
    // Make element ready for capture
    targetElement.style.transform = 'none';
    targetElement.style.transformOrigin = 'top left';
    
    // Force any images to be loaded
    const images = targetElement.querySelectorAll('img');
    for (const img of Array.from(images)) {
      img.setAttribute('crossOrigin', 'anonymous');
      if (!img.complete) {
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }
    }
    
    // Make sure right column has correct background
    const rightColumn = targetElement.querySelector('.right-column');
    if (rightColumn) {
      (rightColumn as HTMLElement).style.backgroundColor = '#22405c';
      (rightColumn as HTMLElement).style.color = 'white';
    }
    
    console.log("Waiting for rendering...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Capture with maximum quality
    console.log("Starting direct canvas capture...");
    const canvas = await html2canvas(targetElement, {
      scale: 4, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true,
      onclone: (doc, ele) => {
        console.log("Element cloned by html2canvas");
      }
    });
    
    // Restore original styles
    targetElement.style.transform = originalTransform;
    targetElement.style.transformOrigin = originalTransformOrigin;
    targetElement.style.position = originalPosition;
    targetElement.style.zIndex = originalZIndex;
    targetElement.style.visibility = originalVisibility;
    
    // Create a PDF
    console.log("Creating PDF...");
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add the image to the PDF with maximum quality
    const imgData = canvas.toDataURL('image/png', 1.0); 
    
    // Add exact A4 dimensions
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
    throw new Error('Could not generate PDF: ' + (error instanceof Error ? error.message : String(error)));
  }
};

export async function generateSimplePdf(element: HTMLElement): Promise<void> {
  console.log("Starting ULTRA-DIRECT PDF generation...");
  
  try {
    // Re-import the libraries to ensure they're fresh
    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule.default;
    
    const jsPDFModule = await import('jspdf');
    const jsPDF = jsPDFModule.default;
    
    console.log("Libraries imported successfully");
    
    // Find the mobile resume content if it exists, otherwise use the provided element
    const mobileContent = document.getElementById('mobile-resume-content');
    const targetElement = mobileContent || element;
    
    // Save original transformation
    const origTransform = targetElement.style.transform;
    
    try {
      // Remove transformation temporarily
      targetElement.style.transform = 'none';
      
      // Wait to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Capturing with html2canvas...");
      
      // Capture at high quality
      const canvas = await html2canvas(targetElement, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
      });
      
      console.log("Canvas captured, size:", canvas.width, "x", canvas.height);
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Convert to image at maximum quality
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Add to PDF with A4 dimensions
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      
      // Save the PDF
      pdf.save('resume.pdf');
      console.log("PDF saved successfully");
      
    } finally {
      // Restore original transform
      targetElement.style.transform = origTransform;
    }
    
  } catch (error) {
    console.error("PDF generation critical error:", error);
    alert("PDF generation failed. Check console for details.");
    throw error;
  }
}

// Add this as another fallback option
export async function generateBasicPdf(element: HTMLElement): Promise<void> {
  console.log("Starting BASIC PDF generation...");
  
  try {
    // Basic approach - directly use the libraries
    const html2canvas = await (await import('html2canvas')).default;
    const jsPDF = await (await import('jspdf')).default;
    
    // Target the mobile preview or the provided element
    const mobileContent = document.getElementById('mobile-resume-content');
    const targetElement = mobileContent || element;
    
    console.log("Element identified for basic capture");
    
    // Capture the content - no fancy options, just the basics
    const canvas = await html2canvas(targetElement, {
      scale: 1, // lower scale to avoid memory issues
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });
    
    // Create a basic PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/jpeg', 0.7); // Use JPEG for smaller size
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume-basic.pdf');
    
    console.log("Basic PDF saved successfully");
    
  } catch (error) {
    console.error("Basic PDF generation failed:", error);
    throw new Error("Failed to generate even a basic PDF: " + error);
  }
}

// Add this SVG-based method
export async function generateSvgPdf(element: HTMLElement): Promise<void> {
  console.log("Starting SVG-based PDF generation...");
  
  try {
    // Import required libraries
    const jsPDF = (await import('jspdf')).default;
    
    // Target the mobile content if available
    const mobileContent = document.getElementById('mobile-resume-content');
    const targetElement = mobileContent || element;
    
    // Get dimensions
    const width = 210; // A4 width in mm
    const height = 297; // A4 height in mm
    
    // Create a new PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Get the HTML content as a string
    const htmlContent = targetElement.outerHTML;
    
    // Add HTML to PDF
    pdf.html(htmlContent, {
      callback: function(pdf) {
        pdf.save('resume-html.pdf');
        console.log("SVG PDF saved successfully");
      },
      x: 0,
      y: 0,
      width: width,
      windowWidth: targetElement.offsetWidth,
    });
    
  } catch (error) {
    console.error("SVG PDF generation failed:", error);
    throw new Error("Failed to generate SVG-based PDF: " + error);
  }
}

// Add this color-safe method after the other export functions
export async function generateColorSafePdf(element: HTMLElement): Promise<void> {
  console.log("Starting COLOR-SAFE PDF generation...");
  
  try {
    // Re-import the libraries
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;
    
    // Find the mobile resume content if it exists, otherwise use the provided element
    const mobileContent = document.getElementById('mobile-resume-content');
    const targetElement = mobileContent || element;
    
    // Create a clone to work with
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm';
    tempContainer.style.height = '297mm';
    document.body.appendChild(tempContainer);
    
    // Clone the element
    const clone = targetElement.cloneNode(true) as HTMLElement;
    tempContainer.appendChild(clone);
    
    // IMPORTANT: Fix oklch colors in the cloned element
    // This is the key to solving the issue
    fixUnsupportedColors(clone);
    
    // Reset transform
    clone.style.transform = 'none';
    clone.style.transformOrigin = 'top left';
    
    // Make sure right column has correct background - using standard RGB
    const rightColumn = clone.querySelector('.right-column');
    if (rightColumn) {
      (rightColumn as HTMLElement).style.backgroundColor = '#22405c';
      (rightColumn as HTMLElement).style.color = '#ffffff';
    }
    
    // Wait for rendering
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Capture with moderate quality for compatibility
    console.log("Starting color-safe canvas capture...");
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true
    });
    
    // Remove temp container
    document.body.removeChild(tempContainer);
    
    // Create PDF
    console.log("Creating color-safe PDF...");
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Use JPEG for compatibility
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    pdf.addImage(
      imgData,
      'JPEG',
      0,
      0,
      210,
      297
    );
    
    pdf.save('resume-color-fixed.pdf');
    console.log("Color-safe PDF saved successfully");
    
  } catch (error) {
    console.error('Color-safe PDF generation failed:', error);
    throw new Error('Could not generate color-safe PDF: ' + String(error));
  }
}

// Helper function to fix oklch and other modern color formats
function fixUnsupportedColors(element: HTMLElement) {
  // Replace oklch colors in inline styles
  const allElements = element.querySelectorAll('*');
  
  // Convert to an array to include the main element too
  const elementsToFix = [element, ...Array.from(allElements)];
  
  for (const el of elementsToFix) {
    if (el instanceof HTMLElement) {
      const style = el.style;
      
      // Check for oklch in various CSS properties
      const colorProps = [
        'color', 'backgroundColor', 'borderColor', 
        'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'
      ];
      
      for (const prop of colorProps) {
        const value = style[prop as any];
        if (value && value.includes('oklch')) {
          console.log(`Fixing oklch color in ${prop}:`, value);
          
          // Replace with a safe color based on the element
          if (prop === 'backgroundColor' && el.classList.contains('right-column')) {
            style[prop as any] = '#22405c';
          } else if (prop === 'color' && el.closest('.right-column')) {
            style[prop as any] = '#ffffff';
          } else {
            // Default fallbacks
            if (prop === 'backgroundColor') {
              style[prop as any] = '#ffffff';
            } else if (prop === 'color') {
              style[prop as any] = '#000000';
            } else {
              style[prop as any] = 'transparent';
            }
          }
        }
      }
    }
  }
  
  // Also handle any computed styles with getComputedStyle
  // This is more comprehensive but may be slower
  try {
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const sheet = styleSheets[i];
        const rules = sheet.cssRules || sheet.rules;
        
        if (!rules) continue;
        
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          if (rule instanceof CSSStyleRule) {
            const cssText = rule.cssText;
            
            if (cssText.includes('oklch')) {
              console.log('Found oklch in CSS rule:', cssText);
              // We can't modify the stylesheet directly, but we've identified problematic rules
            }
          }
        }
      } catch (e) {
        // Some stylesheets might be cross-origin and not accessible
        console.log('Could not access stylesheet rules');
      }
    }
  } catch (e) {
    console.error('Error checking stylesheets:', e);
  }
}

// Add this direct-canvas method that completely bypasses the color parsing issue
export async function generateDirectCanvasPdf(element: HTMLElement): Promise<void> {
  console.log("Starting DIRECT-CANVAS PDF generation (bypassing color parsing)...");
  
  try {
    // Import just jsPDF - we'll handle the rendering ourselves
    const jsPDF = (await import('jspdf')).default;
    
    // Find the mobile resume content if it exists, otherwise use the provided element
    const mobileContent = document.getElementById('mobile-resume-content');
    const targetElement = mobileContent || element;
    
    // Create a canvas directly
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    
    // Set canvas dimensions - use a reasonable size for A4
    const width = 794; // Approximately A4 width at 96 DPI
    const height = 1123; // Approximately A4 height at 96 DPI
    canvas.width = width;
    canvas.height = height;
    
    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Draw the resume structure directly
    // Left side (white background)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width * 2/3, height);
    
    // Right side (blue background)
    ctx.fillStyle = '#22405c';
    ctx.fillRect(width * 2/3, 0, width * 1/3, height);
    
    // Top border on right side
    ctx.fillStyle = '#182d40';
    ctx.fillRect(width * 2/3, 0, width * 1/3, 20);
    
    // Get content data
    const rightColumn = targetElement.querySelector('.right-column');
    const leftColumn = targetElement.querySelector('.left-column');
    
    // Add text - white text in blue area
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    
    if (rightColumn) {
      // Draw only basic structure
      ctx.fillText('KEY ACHIEVEMENTS', width * 2/3 + 20, 100);
      ctx.fillText('SKILLS', width * 2/3 + 20, 300);
      ctx.fillText('PROJECTS', width * 2/3 + 20, 500);
      ctx.fillText('PASSIONS', width * 2/3 + 20, 700);
    }
    
    // Add text - black text in white area
    ctx.fillStyle = '#000000';
    if (leftColumn) {
      // Draw basic structure
      ctx.fillText('SUMMARY', 40, 100);
      ctx.fillText('EXPERIENCE', 40, 200);
      ctx.fillText('EDUCATION', 40, 500);
      ctx.fillText('LANGUAGES', 40, 700);
    }
    
    // Create PDF from our basic canvas
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Convert canvas to image
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Add to PDF
    pdf.addImage(
      imgData,
      'JPEG',
      0,
      0,
      210,
      297
    );
    
    // Save the PDF
    pdf.save('resume-basic-structure.pdf');
    console.log("Direct canvas PDF saved successfully");
    
    // Now try screenshot method as alternative
    try {
      await generateScreenshotPdf(targetElement);
    } catch (screenshotError) {
      console.error("Screenshot method failed:", screenshotError);
    }
    
  } catch (error) {
    console.error('Direct canvas PDF generation failed:', error);
    throw new Error('Could not generate direct canvas PDF: ' + String(error));
  }
}

// Alternative method: Just draw a simplified version
export async function generateScreenshotPdf(element: HTMLElement): Promise<void> {
  console.log("Starting SCREENSHOT PDF generation...");
  
  try {
    // Re-import jsPDF
    const jsPDF = (await import('jspdf')).default;
    
    // Target element
    const mobileContent = document.getElementById('mobile-resume-content');
    const targetElement = mobileContent || element;
    
    // Get dimensions
    const width = 210; // A4 width in mm
    const height = 297; // A4 height in mm
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Create text content manually
    let content = "";
    
    // Try to extract text from the resume
    try {
      content = extractTextFromElement(targetElement);
    } catch (e) {
      content = "Resume content - Please view online for full display";
    }
    
    // Add title
    pdf.setFontSize(20);
    pdf.text("Resume", 105, 20, { align: 'center' });
    
    // Add content
    pdf.setFontSize(12);
    pdf.text(
      "This is a simplified version of your resume due to technical limitations.\n" +
      "To view the full design, please use the online preview.\n\n" +
      content,
      20, 40, { maxWidth: 170 }
    );
    
    // Save the PDF
    pdf.save('resume-text-only.pdf');
    console.log("Screenshot PDF saved successfully");
    
  } catch (error) {
    console.error('Screenshot PDF generation failed:', error);
    throw new Error('Could not generate screenshot PDF: ' + String(error));
  }
}

// Helper function to extract text from an element
function extractTextFromElement(element: HTMLElement): string {
  // Get all text content
  let text = element.innerText || '';
  
  // Format it nicely (basic)
  text = text.replace(/\s+/g, ' ').trim();
  
  // Return a reasonable portion
  return text.length > 2000 ? text.substring(0, 2000) + '...' : text;
}

// SUPER FALLBACK: Create a completely static PDF that doesn't rely on DOM
export async function generateStaticPdf(): Promise<void> {
  console.log("Starting STATIC PDF generation (no DOM dependency)...");
  
  try {
    // Re-import jsPDF
    const jsPDF = (await import('jspdf')).default;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add title
    pdf.setFontSize(20);
    pdf.text("Your Resume", 105, 20, { align: 'center' });
    
    // Add message
    pdf.setFontSize(12);
    pdf.text(
      "Due to technical limitations, we couldn't generate a styled PDF of your resume.\n\n" +
      "Please view your resume online for the full experience, or try again with a different browser.",
      20, 40, { maxWidth: 170 }
    );
    
    // Save the PDF
    pdf.save('resume-static.pdf');
    console.log("Static PDF saved successfully");
    
  } catch (error) {
    console.error('Static PDF generation failed:', error);
    alert("Could not generate PDF. Please try in a different browser.");
  }
}

// Add this ultra-simple text-based PDF generator that WILL work
export async function generateTextPdf(): Promise<void> {
  console.log("Starting ULTRA-SIMPLE Text PDF generation...");
  
  try {
    // Get the jsPDF library - this is all we need
    const jsPDF = (await import('jspdf')).default;
    
    // Create PDF 
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Function to add a heading
    const addHeading = (text: string, y: number) => {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text(text, 20, y);
      
      // Add underline
      pdf.setDrawColor(0, 0, 0);
      pdf.line(20, y + 1, 190, y + 1);
      
      return y + 10; // Return the new Y position
    };
    
    // Function to add normal text
    const addText = (text: string, y: number) => {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      
      // Handle text wrapping by splitting it into lines
      const lines = pdf.splitTextToSize(text, 170);
      pdf.text(lines, 20, y);
      
      return y + (lines.length * 6); // Return the new Y position
    };
    
    // Try to get data from the page
    let name = "";
    let title = "";
    let summary = "";
    let experience: string[] = [];
    let education: string[] = [];
    let skills: string[] = [];
    
    try {
      // Try to extract name
      const nameElement = document.querySelector('h1');
      if (nameElement) name = nameElement.textContent || "";
      
      // Try to extract title/position
      const titleElement = document.querySelector('h2, .title');
      if (titleElement) title = titleElement.textContent || "";
      
      // Try to extract summary
      const summaryElement = document.querySelector('[data-section="summary"], .summary-section');
      if (summaryElement) summary = summaryElement.textContent || "";
      
      // Try to extract experience
      const experienceSection = document.querySelector('[data-section="experience"], .experience-section');
      if (experienceSection) {
        const items = experienceSection.querySelectorAll('li, .item');
        items.forEach(item => {
          experience.push(item.textContent || "");
        });
      }
      
      // Try to extract skills
      const skillsSection = document.querySelector('[data-section="skills"], .skills-section');
      if (skillsSection) {
        const items = skillsSection.querySelectorAll('li, .item, div');
        items.forEach(item => {
          const text = item.textContent || "";
          if (text.length < 50) skills.push(text); // Only add shorter texts that are likely skill names
        });
      }
    } catch (e) {
      console.error("Error extracting resume data:", e);
    }
    
    // Start building the PDF
    
    // Title section
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text(name || "Resume", 105, 20, { align: 'center' });
    
    if (title) {
      pdf.setFontSize(14);
      pdf.text(title, 105, 30, { align: 'center' });
    }
    
    // Starting position for content
    let yPos = 40;
    
    // Summary
    if (summary) {
      yPos = addHeading("SUMMARY", yPos);
      yPos = addText(summary, yPos);
      yPos += 10; // Add spacing
    }
    
    // Experience
    if (experience.length > 0) {
      yPos = addHeading("EXPERIENCE", yPos);
      experience.forEach(exp => {
        yPos = addText(exp, yPos);
        yPos += 5;
      });
      yPos += 5;
    }
    
    // Skills
    if (skills.length > 0) {
      yPos = addHeading("SKILLS", yPos);
      
      // Display skills in columns
      const skillChunks = [];
      for (let i = 0; i < skills.length; i += 3) {
        skillChunks.push(skills.slice(i, i + 3));
      }
      
      skillChunks.forEach(chunk => {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        const skillText = chunk.join(" • ");
        pdf.text(skillText, 20, yPos);
        yPos += 6;
      });
      
      yPos += 5;
    }
    
    // Education
    if (education.length > 0) {
      yPos = addHeading("EDUCATION", yPos);
      education.forEach(edu => {
        yPos = addText(edu, yPos);
        yPos += 5;
      });
    }
    
    // If we couldn't extract much data, add a fallback message
    if (!summary && experience.length === 0 && skills.length === 0) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(
        "Resume data could not be fully extracted, but we've created a basic PDF for you.\n" +
        "Please view your resume online for the complete version.",
        20, 50, { maxWidth: 170 }
      );
    }
    
    // Save the PDF
    pdf.save('resume-text.pdf');
    console.log("Text-based PDF saved successfully");
    
    return;
    
  } catch (error) {
    console.error('Text-based PDF generation failed:', error);
    throw new Error('Could not generate text PDF: ' + String(error));
  }
}

export default Resume; 