// src/components/pdf-generators/ReactToPrintGenerator.tsx
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import InvoiceTemplate from '../Invoices/InvoiceTemplate';
import { Invoice } from '../Invoices/types';

interface PrintButtonProps {
  invoice: Invoice;
  buttonText?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  size?: 'large' | 'middle' | 'small';
}

export const PrintButton: React.FC<PrintButtonProps> = ({
  invoice,
  buttonText = 'Print',
  icon = <PrinterOutlined />,
  variant = 'primary',
  size = 'middle',
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice-${invoice.invoiceNumber}`,
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 20mm;
        }
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .invoice-card {
          box-shadow: none !important;
          border: 1px solid #ddd !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
    onAfterPrint: () => console.log('Print completed'),
    onPrintError: (error) => console.error('Print error:', error),
  });

  return (
    <>
      <Button
        type={variant}
        size={size}
        icon={icon}
        onClick={handlePrint}
        className="flex items-center gap-2"
      >
        {buttonText}
      </Button>
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <InvoiceTemplate invoice={invoice} isPrintable={true} />
        </div>
      </div>
    </>
  );
};

interface MultiplePrintButtonProps {
  invoices: Invoice[];
  buttonText?: string;
  className?: string;
}

export const MultiplePrintButton: React.FC<MultiplePrintButtonProps> = ({
  invoices,
  buttonText = 'Print All',
  className,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Multiple-Invoices',
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 15mm;
        }
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .invoice-card {
          box-shadow: none !important;
          border: 1px solid #ddd !important;
          margin-bottom: 20mm !important;
          page-break-after: always;
        }
        .invoice-card:last-child {
          page-break-after: avoid;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  });

  return (
    <>
      <Button
        type="primary"
        icon={<PrinterOutlined />}
        onClick={handlePrint}
        className={`flex items-center gap-2 ${className}`}
      >
        {buttonText}
      </Button>
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          {invoices.map((invoice, index) => (
            <div key={invoice.id} className={index < invoices.length - 1 ? 'mb-8' : ''}>
              <InvoiceTemplate invoice={invoice} isPrintable={true} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PrintButton;