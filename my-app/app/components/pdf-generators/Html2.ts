// src/components/pdf-generators/Html2PdfGenerator.ts
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateHtml2Pdf = async (
  elementId: string, 
  fileName: string = 'invoice'
): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id ${elementId} not found`);
    }

    // Clone element for print styling
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.width = '794px'; // A4 width in pixels (210mm)
    clonedElement.style.padding = '40px';
    clonedElement.style.boxShadow = 'none';
    document.body.appendChild(clonedElement);

    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      removeContainer: true,
    });

    // Remove cloned element
    document.body.removeChild(clonedElement);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'px', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth - 40; // 20px margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 20;
    
    pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - 40);
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 40);
    }

    pdf.save(`${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error('HTML2PDF Error:', error);
    throw error;
  }
};

export const generateMultipleHtml2Pdf = async (
  elementIds: string[], 
  fileName: string = 'invoices'
): Promise<boolean> => {
  const pdf = new jsPDF('p', 'px', 'a4');
  
  for (let i = 0; i < elementIds.length; i++) {
    const element = document.getElementById(elementIds[i]);
    if (!element) continue;
    
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.width = '794px';
    clonedElement.style.padding = '40px';
    document.body.appendChild(clonedElement);
    
    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });
    
    document.body.removeChild(clonedElement);
    
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pdfWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
  }
  
  pdf.save(`${fileName}.pdf`);
  return true;
};