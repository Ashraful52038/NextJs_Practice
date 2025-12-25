// src/components/pdf-generators/ReactPdfGenerator.tsx
import { DownloadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Document, Page, pdf, PDFDownloadLink, Text, View } from '@react-pdf/renderer';
import { Button, notification, Tooltip } from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React from 'react';
import { getInvoiceCalculations } from '../Invoices/InvoiceData';
import { Invoice } from '../Invoices/types';
import { registerFonts } from './ReactPdfFonts';
import { combineStyles, componentStyles, pdfStyles } from './ReactPdfStyle';


// Register fonts
registerFonts();

// PDF Document Component
const InvoicePDF = ({ invoice }: { invoice: Invoice }) => {
  const { subtotal, tax, total } = getInvoiceCalculations(invoice);
  
  return (
    <Document>
      <Page size="A4" style={combineStyles(pdfStyles.page, pdfStyles.bgWhite)}>
        {/* Header */}
        <View style={componentStyles.invoiceHeader}>
          <View>
            <Text style={combineStyles(pdfStyles.text2xl, pdfStyles.fontBold, pdfStyles.textGray800)}>
                INVOICE
            </Text>
            <Text style={combineStyles(pdfStyles.textSm, pdfStyles.textGray500, pdfStyles.mt4)}>
              {invoice.companyName}
            </Text>
          </View>
          <View style={pdfStyles.invoiceInfo}>
            <Text style={combineStyles(pdfStyles.fontBold, pdfStyles.textGray700)}>
                Invoice #{invoice.invoiceNumber}
            </Text>
            <Text>Date: {invoice.date}</Text>
            <Text>Due Date: {invoice.dueDate}</Text>
            <Text>Status: {invoice.status}</Text>
          </View>
        </View>

        {/* Company & Customer Info */}
        <View style={combineStyles(pdfStyles.flexRow, pdfStyles.mb8)}>
          <View style={pdfStyles.infoBox}>
            <Text style={combineStyles(
              pdfStyles.textXs, 
              pdfStyles.textGray500, 
              pdfStyles.fontSemibold, 
              pdfStyles.mb4
            )}>
            FROM
            </Text>
            <Text style={combineStyles(
              pdfStyles.textSm,
              pdfStyles.fontSemibold,
              pdfStyles.textGray800
            )}>
                {invoice.companyName}
            </Text>
            <Text style={combineStyles(pdfStyles.textXs, pdfStyles.textGray500, pdfStyles.mt4)}>
              {invoice.companyAddress}
            </Text>
          </View>
          <View style={[pdfStyles.infoBox, { marginRight: 0 }]}>
            <Text style={combineStyles(
              pdfStyles.textXs, 
              pdfStyles.textGray500, 
              pdfStyles.fontSemibold, 
              pdfStyles.mb4
            )}>
                BILL TO
            </Text>
            <Text style={combineStyles(
              pdfStyles.textSm, 
              pdfStyles.fontSemibold, 
              pdfStyles.textGray800
            )}>
                {invoice.customer}
            </Text>
            <Text style={combineStyles(pdfStyles.textXs, pdfStyles.textGray500, pdfStyles.mt4)}>
              {invoice.customerAddress}
            </Text>
            <Text style={combineStyles(pdfStyles.textXs, pdfStyles.textGray500, pdfStyles.mt2)}>
              {invoice.customerEmail}
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View>
          <Text style={pdfStyles.sectionTitle}>ITEMS</Text>
          <View style={combineStyles(pdfStyles.mt4, pdfStyles.mb8)}>
            {/* Table Header */}
            <View style={componentStyles.tableHeaderRow}>
              <Text style={[pdfStyles.tableHeaderCell, { flex: 3 }]}>Description</Text>
              <Text style={pdfStyles.tableHeaderCell}>Qty</Text>
              <Text style={pdfStyles.tableHeaderCell}>Unit</Text>
              <Text style={pdfStyles.tableHeaderCell}>Unit Price</Text>
              <Text style={[pdfStyles.tableHeaderCell, pdfStyles.textRight]}>Amount</Text>
            </View>
            
             {/* Table Rows */}
            {invoice.items.map((item, index) => (
              <View key={index} style={componentStyles.tableDataRow(index)}>
                <Text style={[pdfStyles.tableCell, { flex: 3 }]}>{item.name}</Text>
                <Text style={pdfStyles.tableCell}>{item.quantity}</Text>
                <Text style={pdfStyles.tableCell}>{item.unit || 'N/A'}</Text>
                <Text style={pdfStyles.tableCell}>
                  {invoice.currency} {item.price.toFixed(2)}
                </Text>
                <Text style={[pdfStyles.tableCell, pdfStyles.textRight]}>
                  {invoice.currency} {(item.quantity * item.price).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

       {/* Totals */}
        <View style={combineStyles(pdfStyles.flex, pdfStyles.itemsEnd, pdfStyles.mt8)}>
          <View style={[pdfStyles.wAuto, pdfStyles.textRight]}>
            <View style={pdfStyles.totalRow}>
              <Text style={combineStyles(pdfStyles.textSm, pdfStyles.textGray600)}>
                Subtotal:
              </Text>
              <Text style={combineStyles(pdfStyles.textSm, pdfStyles.textGray800, pdfStyles.fontSemibold)}>
                {invoice.currency} {subtotal.toFixed(2)}
              </Text>
            </View>
          <View style={pdfStyles.totalRow}>
              <Text style={combineStyles(pdfStyles.textSm, pdfStyles.textGray600)}>
                Tax ({invoice.taxRate}%):
              </Text>
              <Text style={combineStyles(pdfStyles.textSm, pdfStyles.textGray800, pdfStyles.fontSemibold)}>
                {invoice.currency} {tax.toFixed(2)}
              </Text>
            </View>
          <View style={combineStyles(
              pdfStyles.totalRow, 
              pdfStyles.mt4, 
              pdfStyles.pt4, 
              pdfStyles.border, 
              pdfStyles.borderGray300
            )}>
              <Text style={combineStyles(pdfStyles.textBase, pdfStyles.fontBold, pdfStyles.textGray800)}>
                Total:
              </Text>
              <Text style={combineStyles(pdfStyles.textBase, pdfStyles.fontBold, pdfStyles.textGray800)}>
                {invoice.currency} {total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Notes */}
        {invoice.notes && (
          <View style={combineStyles(pdfStyles.mt8, pdfStyles.notesBox)}>
            <Text style={combineStyles(
              pdfStyles.textXs, 
              pdfStyles.textGray500, 
              pdfStyles.fontSemibold, 
              pdfStyles.mb2
            )}>
              NOTES
            </Text>
            <Text style={combineStyles(pdfStyles.textSm, pdfStyles.textGray700)}>
              {invoice.notes}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

// Props interface for the download button
interface ReactPdfGeneratorProps {
  invoice: Invoice;
  buttonText?: string;
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  buttonSize?: 'large' | 'middle' | 'small';
  showIcon?: boolean;
  className?: string;
  fileName?: string;
  children?: React.ReactNode; 
}

// Main Component
export const ReactPdfDownloadLink: React.FC<ReactPdfGeneratorProps> = ({
  invoice,
  buttonText = 'Download PDF',
  buttonType = 'primary',
  buttonSize = 'middle',
  showIcon = true,
  className = '',
  fileName,
}) => {
  const pdfFileName = fileName || `invoice-${invoice.invoiceNumber}.pdf`;

  return (
    <Tooltip title={`Download ${invoice.invoiceNumber} as PDF`}>
      <div className={`inline-block ${className}`}>
        <PDFDownloadLink
          document={<InvoicePDF invoice={invoice} />}
          fileName={pdfFileName}
          style={{ textDecoration: 'none' }}
        >
          {({ loading, blob, url, error }) => (
            <Button
              type={buttonType}
              size={buttonSize}
              icon={showIcon ? (loading ? <FilePdfOutlined spin /> : <DownloadOutlined />) : undefined}
              loading={loading}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? 'Generating PDF...' : buttonText}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </Tooltip>
  );
};

// Batch PDF Generator Component
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

  const handleBatchDownload = async() => {
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
      
      // Create a folder for invoices
      const invoiceFolder = zip.folder('invoices');
      
      if (!invoiceFolder) {
        throw new Error('Failed to create zip folder');
      }
       // Generate PDF for each invoice
      for (let i = 0; i < invoices.length; i++) {
        const invoice = invoices[i];
        
        try {
          const doc = <InvoicePDF invoice={invoice} />;
          const pdfInstance = pdf(doc);
          const pdfBlob = await pdfInstance.toBlob();
          
          // Add PDF to zip
          invoiceFolder.file(
            `invoice-${invoice.invoiceNumber}.pdf`, 
            pdfBlob
          );
        } catch (error) {
          console.error(`Error generating PDF for invoice ${invoice.invoiceNumber}:`, error);
        }
      }

       // Generate zip file
      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      
      // Download zip
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const zipFileName = `invoices-batch-${timestamp}.zip`;
      
      saveAs(zipBlob, zipFileName);
      
      notification.success({
        message: 'Download Complete',
        description: `${invoices.length} invoice(s) downloaded successfully as ${zipFileName}`,
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
        disabled={!invoices || invoices.length === 0 || loading}
      >
        {loading ? `Generating ${invoices.length} PDFs...` : buttonText}
      </Button>
    </Tooltip>
  );
};

// Export with both names for compatibility
export const ReactPdfGenerator = ReactPdfDownloadLink;
export const BatchPdfGenerator = BatchReactPdfDownload;

export default ReactPdfDownloadLink;