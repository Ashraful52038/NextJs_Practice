// src/types/index.ts
export interface InvoiceItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  unit?: string;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  customer: string;
  customerEmail: string;
  customerAddress: string;
  companyName: string;
  companyAddress: string;
  companyLogo?: string;
  items: InvoiceItem[];
  taxRate: number;
  currency: string;
  paymentMethod: string;
  dueDate: string;
  notes: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  terms?: string;
}

export type PdfMethod = 'html2pdf' | 'jspdf' | 'react-to-print' | 'react-pdf';

export interface MethodInfo {
  id: PdfMethod;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}