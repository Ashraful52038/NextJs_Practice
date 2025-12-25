// src/components/pdf-generators/React-to-print.tsx
'use client';

import { PrinterOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import React, { useRef, useState } from 'react';
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
  const [isPrinting, setIsPrinting] = useState(false);
  
  const handlePrint = useReactToPrint({
    content: () => {
      console.log('Print content requested for:', invoice.invoiceNumber);
      return componentRef.current;
    },
    documentTitle: `Invoice-${invoice.invoiceNumber}`,
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 20mm;
        }
        body, html {
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .invoice-card {
          box-shadow: none !important;
          border: 1px solid #ddd !important;
          margin: 0 !important;
          padding: 20mm !important;
          min-height: 100vh !important;
          width: 100% !important;
        }
        .no-print, button, .ant-btn {
          display: none !important;
        }
      }
    `,
    onBeforeGetContent: () => {
      console.log('Preparing print...');
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log('Print completed');
      setIsPrinting(false);
      notification.success({
        message: 'Print Ready',
        description: `Invoice ${invoice.invoiceNumber} is ready for printing.`,
      });
    },
    onPrintError: (error, location) => {
      console.error('Print error:', error, 'at', location);
      setIsPrinting(false);
      notification.error({
        message: 'Print Failed',
        description: 'Please try again or use another method.',
      });
    },
  });

  return (
    <>
      <Button
        type={variant}
        size={size}
        icon={icon}
        onClick={handlePrint}
        className="flex items-center gap-2"
        loading={isPrinting}
      >
        {buttonText}
      </Button>
      
      {/* ALWAYS RENDER the content but position it off-screen */}
      <div 
        style={{ 
          position: 'fixed',
          left: '-10000px',
          top: '-10000px',
          width: '210mm',
          height: '297mm',
          backgroundColor: 'white',
          zIndex: -9999
        }}
      >
        <div ref={componentRef}>
          <div style={{ padding: '20mm' }}>
            <InvoiceTemplate invoice={invoice} isPrintable={true} />
          </div>
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
  const [isPrinting, setIsPrinting] = useState(false);
  
  const handlePrint = useReactToPrint({
    content: () => {
      console.log('Batch print content requested, invoices:', invoices.length);
      return componentRef.current;
    },
    documentTitle: `Multiple-Invoices-${Date.now()}`,
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 15mm;
        }
        body, html {
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .invoice-page {
          page-break-after: always !important;
          page-break-inside: avoid !important;
          margin-bottom: 15mm !important;
        }
        .invoice-page:last-child {
          page-break-after: avoid !important;
        }
        .invoice-card {
          box-shadow: none !important;
          border: 1px solid #ddd !important;
          margin: 0 !important;
          padding: 15mm !important;
          min-height: calc(100vh - 30mm) !important;
        }
        .no-print, button, .ant-btn {
          display: none !important;
        }
      }
    `,
    onBeforeGetContent: () => {
      console.log('Preparing batch print...');
      setIsPrinting(true);
      return new Promise((resolve) => {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          console.log('Batch content ready');
          resolve();
        }, 100);
      });
    },
    onAfterPrint: () => {
      console.log('Batch print completed');
      setIsPrinting(false);
      notification.success({
        message: 'Batch Print Complete',
        description: `Successfully printed ${invoices.length} invoices.`,
      });
    },
    onPrintError: (error, location) => {
      console.error('Batch print error:', error, 'at', location);
      setIsPrinting(false);
      notification.error({
        message: 'Batch Print Failed',
        description: error?.toString() || 'Unknown error occurred',
      });
    },
  });

  return (
    <>
      <Button
        type="primary"
        icon={<PrinterOutlined />}
        onClick={handlePrint}
        className={`flex items-center gap-2 ${className}`}
        loading={isPrinting}
        disabled={invoices.length === 0}
      >
        {buttonText} ({invoices.length})
      </Button>
      
      {/* ALWAYS RENDER the content but position it off-screen */}
      <div 
        style={{ 
          position: 'fixed',
          left: '-10000px',
          top: '-10000px',
          width: '210mm',
          backgroundColor: 'white',
          zIndex: -9999
        }}
      >
        <div ref={componentRef}>
          {invoices.map((invoice, index) => (
            <div 
              key={`print-${invoice.id}-${index}`}
              className="invoice-page"
              style={{ 
                padding: '15mm',
                backgroundColor: 'white',
              }}
            >
              <InvoiceTemplate 
                invoice={invoice} 
                isPrintable={true}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PrintButton;