// src/hooks/usePdfGeneration.ts
import { message } from 'antd';
import { useCallback, useState } from 'react';
import { Invoice } from '../app/components/Invoices/types';
import { generateHtml2Pdf, generateMultipleHtml2Pdf } from '../app/components/pdf-generators/Html2';
import { generateBatchJsPdf, generateJsPdf } from '../app/components/pdf-generators/JsPdf';

export const usePdfGeneration = () => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  const handleHtml2Pdf = useCallback(async (invoiceId: number, invoiceNumber: string) => {
    setLoading((prev) => ({ ...prev, [`html2pdf-${invoiceId}`]: true }));
    
    try {
      await generateHtml2Pdf(
        `invoice-${invoiceId}`,
        `invoice-${invoiceNumber}`
      );
      message.success('PDF generated successfully!');
    } catch (error) {
      message.error('Failed to generate PDF');
      console.error('HTML2PDF Error:', error);
    } finally {
      setLoading((prev) => ({ ...prev, [`html2pdf-${invoiceId}`]: false }));
    }
  }, []);
  
  const handleBatchHtml2Pdf = useCallback(async (invoices: Invoice[]) => {
    setLoading((prev) => ({ ...prev, 'batch-html2pdf': true }));
    
    try {
      await generateMultipleHtml2Pdf(
        invoices.map((inv) => `invoice-${inv.id}`),
        'all-invoices'
      );
      message.success('All PDFs generated successfully!');
    } catch (error) {
      message.error('Failed to generate batch PDFs');
      console.error('Batch HTML2PDF Error:', error);
    } finally {
      setLoading((prev) => ({ ...prev, 'batch-html2pdf': false }));
    }
  }, []);
  
  const handleJsPdf = useCallback((invoice: Invoice) => {
    setLoading((prev) => ({ ...prev, [`jspdf-${invoice.id}`]: true }));
    
    try {
      generateJsPdf(invoice);
      message.success('PDF generated successfully!');
    } catch (error) {
      message.error('Failed to generate PDF');
      console.error('jsPDF Error:', error);
    } finally {
      setLoading((prev) => ({ ...prev, [`jspdf-${invoice.id}`]: false }));
    }
  }, []);
  
  const handleBatchJsPdf = useCallback((invoices: Invoice[]) => {
    setLoading((prev) => ({ ...prev, 'batch-jspdf': true }));
    
    try {
      generateBatchJsPdf(invoices);
      message.success('All PDFs generated successfully!');
    } catch (error) {
      message.error('Failed to generate batch PDFs');
      console.error('Batch jsPDF Error:', error);
    } finally {
      setTimeout(() => {
        setLoading((prev) => ({ ...prev, 'batch-jspdf': false }));
      }, invoices.length * 500);
    }
  }, []);
  
  const isLoading = (key: string) => loading[key] || false;
  
  return {
    handleHtml2Pdf,
    handleBatchHtml2Pdf,
    handleJsPdf,
    handleBatchJsPdf,
    isLoading,
  };
};