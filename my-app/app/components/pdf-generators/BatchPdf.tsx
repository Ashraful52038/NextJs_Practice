// src/components/pdf-generators/BatchReactPdfGenerator.tsx
'use client';

import { DownloadOutlined } from '@ant-design/icons';
import { Document, Page, Text, View, pdf } from '@react-pdf/renderer';
import { Button, Tooltip, notification } from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React from 'react';
import { getInvoiceCalculations } from '../Invoices/InvoiceData';
import { Invoice } from '../Invoices/types';

// Simple PDF document for batch generation
const SingleInvoicePDF = ({ invoice }: { invoice: Invoice }) => {
  const { subtotal, tax, total } = getInvoiceCalculations(invoice);
  
  return (
    <Document>
      <Page style={{ padding: 30, fontSize: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>INVOICE #{invoice.invoiceNumber}</Text>
        
        <View style={{ marginBottom: 20 }}>
          <Text>From: {invoice.companyName}</Text>
          <Text>To: {invoice.customer}</Text>
          <Text>Date: {invoice.date}</Text>
        </View>
        
        <View style={{ marginTop: 30 }}>
          <Text style={{ marginBottom: 10 }}>Items:</Text>
          {invoice.items.map((item, idx) => (
            <Text key={idx}>
              {item.name} - {item.quantity} x {invoice.currency} {item.price} = {invoice.currency} {(item.quantity * item.price).toFixed(2)}
            </Text>
          ))}
        </View>
        
        <View style={{ marginTop: 30 }}>
          <Text>Subtotal: {invoice.currency} {subtotal.toFixed(2)}</Text>
          <Text>Tax ({invoice.taxRate}%): {invoice.currency} {tax.toFixed(2)}</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
            Total: {invoice.currency} {total.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

interface BatchReactPdfDownloadProps {
  invoices: Invoice[];
  buttonText?: string;
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  buttonSize?: 'large' | 'middle' | 'small';
  className?: string;
}

export const BatchReactPdfDownload: React.FC<BatchReactPdfDownloadProps> = ({
  invoices,
  buttonText = 'Download All PDFs',
  buttonType = 'default',
  buttonSize = 'middle',
  className = '',
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleBatchDownload = async () => {
    if (!invoices || invoices.length === 0) {
      notification.warning({
        message: 'No Invoices',
        description: 'There are no invoices to download.',
      });
      return;
    }

    setLoading(true);

    try {
      const zip = new JSZip();
      
      // Generate PDF for each invoice
      for (const invoice of invoices) {
        try {
          const doc = <SingleInvoicePDF invoice={invoice} />;
          const pdfBlob = await pdf(doc).toBlob();
          zip.file(`invoice-${invoice.invoiceNumber}.pdf`, pdfBlob);
        } catch (error) {
          console.error(`Error generating PDF for invoice ${invoice.invoiceNumber}:`, error);
        }
      }

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Download zip
      saveAs(zipBlob, `invoices-batch-${new Date().toISOString().slice(0, 10)}.zip`);
      
      notification.success({
        message: 'Download Complete',
        description: `${invoices.length} invoice(s) downloaded successfully.`,
      });
    } catch (error) {
      console.error('Batch PDF generation failed:', error);
      notification.error({
        message: 'Download Failed',
        description: 'Failed to generate PDF files. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title={`Download ${invoices.length} invoice(s) as PDFs`}>
      <Button
        type={buttonType}
        size={buttonSize}
        icon={<DownloadOutlined />}
        loading={loading}
        onClick={handleBatchDownload}
        className={`flex items-center gap-2 ${className}`}
        disabled={!invoices || invoices.length === 0}
      >
        {loading ? 'Generating PDFs...' : buttonText}
      </Button>
    </Tooltip>
  );
};

export default BatchReactPdfDownload;