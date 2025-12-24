// src/components/pdf-generators/JsPdfGenerator.ts
import jsPDF from 'jspdf';
import { getInvoiceCalculations } from '../Invoices/InvoiceData';
import { Invoice } from '../Invoices/types';


export const generateJsPdf = (invoice: Invoice, fileName?: string): boolean => {
  try {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const { subtotal, tax, total } = getInvoiceCalculations(invoice);
    
    // Set document properties
    pdf.setProperties({
      title: `Invoice ${invoice.invoiceNumber}`,
      subject: 'Invoice Document',
      author: invoice.companyName,
      creator: 'Invoice Generator',
    });
    
    // Header
    pdf.setFontSize(28);
    pdf.setTextColor(40, 40, 40);
    pdf.text('INVOICE', 40, 60);
    
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Invoice #: ${invoice.invoiceNumber}`, 40, 90);
    pdf.text(`Date: ${invoice.date}`, 40, 110);
    pdf.text(`Status: ${invoice.status}`, 40, 130);
    
    // Company Info
    pdf.setFontSize(14);
    pdf.setTextColor(30, 30, 30);
    pdf.text('From:', 40, 170);
    
    pdf.setFontSize(12);
    pdf.setTextColor(80, 80, 80);
    pdf.text(invoice.companyName, 40, 190);
    const companyLines = pdf.splitTextToSize(invoice.companyAddress, 200);
    pdf.text(companyLines, 40, 210);
    
    // Customer Info
    pdf.setFontSize(14);
    pdf.setTextColor(30, 30, 30);
    pdf.text('Bill To:', 300, 170);
    
    pdf.setFontSize(12);
    pdf.setTextColor(80, 80, 80);
    pdf.text(invoice.customer, 300, 190);
    const customerLines = pdf.splitTextToSize(invoice.customerAddress, 200);
    pdf.text(customerLines, 300, 210);
    
    // Items Table using autoTable
    const tableData = invoice.items.map(item => [
      item.name,
      item.quantity.toString(),
      item.unit || 'N/A',
      `${invoice.currency} ${item.price.toFixed(2)}`,
      `${invoice.currency} ${(item.quantity * item.price).toFixed(2)}`,
    ]);
    
    (pdf as any).autoTable({
      startY: 260,
      head: [['Description', 'Qty', 'Unit', 'Unit Price', 'Amount']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [59, 130, 246], // blue-500
        textColor: 255,
        fontSize: 11,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 10,
        textColor: [50, 50, 50],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        3: { halign: 'right' },
        4: { halign: 'right' },
      },
    });
    
    // Get the final Y position after the table
    const finalY = (pdf as any).lastAutoTable.finalY || 400;
    
    // Totals
    pdf.setFontSize(12);
    pdf.setTextColor(80, 80, 80);
    
    // Subtotal
    pdf.text('Subtotal:', 400, finalY + 30);
    pdf.text(
      `${invoice.currency} ${subtotal.toFixed(2)}`,
      500,
      finalY + 30,
      { align: 'right' }
    );
    
    // Tax
    pdf.text(`Tax (${invoice.taxRate}%):`, 400, finalY + 50);
    pdf.text(
      `${invoice.currency} ${tax.toFixed(2)}`,
      500,
      finalY + 50,
      { align: 'right' }
    );
    
    // Total
    pdf.setFontSize(14);
    pdf.setTextColor(30, 30, 30);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Total:', 400, finalY + 80);
    pdf.text(
      `${invoice.currency} ${total.toFixed(2)}`,
      500,
      finalY + 80,
      { align: 'right' }
    );
    
    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Payment Method: ${invoice.paymentMethod}`, 40, pdf.internal.pageSize.height - 60);
    pdf.text(`Due Date: ${invoice.dueDate}`, 40, pdf.internal.pageSize.height - 40);
    
    pdf.text(
      invoice.notes,
      pdf.internal.pageSize.width - 40,
      pdf.internal.pageSize.height - 40,
      { align: 'right' }
    );
    
    // Save PDF
    pdf.save(`${fileName || `invoice-${invoice.invoiceNumber}`}.pdf`);
    return true;
  } catch (error) {
    console.error('jsPDF Generation Error:', error);
    throw error;
  }
};

export const generateBatchJsPdf = (invoices: Invoice[]): void => {
  invoices.forEach((invoice, index) => {
    setTimeout(() => {
      generateJsPdf(invoice);
    }, index * 500); // Stagger generation to avoid conflicts
  });
};