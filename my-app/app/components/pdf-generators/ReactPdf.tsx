// src/components/pdf-generators/ReactPdfGenerator.tsx
import { DownloadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Document, Font, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { getInvoiceCalculations } from '../Invoices/InvoiceData';
import { Invoice } from '../Invoices/types';

// Register fonts (optional - if you want custom fonts)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 'light' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 'medium' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#334155',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    borderBottomStyle: 'solid',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  invoiceInfo: {
    textAlign: 'right',
    fontSize: 10,
    color: '#64748b',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#334155',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
    flex: 1,
    marginRight: 16,
  },
  infoBoxLast: {
    marginRight: 0,
  },
  infoLabel: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: 'medium',
  },
  infoValue: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: 'normal',
  },
  table: {
    marginTop: 20,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    color: '#475569',
  },
  amountCell: {
    textAlign: 'right',
  },
  totals: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginBottom: 8,
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  totalValue: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: 'medium',
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    borderTopStyle: 'solid',
  },
  footer: {
    marginTop: 50,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    borderTopStyle: 'solid',
    fontSize: 9,
    color: '#94a3b8',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notes: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    fontSize: 10,
    color: '#475569',
    fontStyle: 'italic',
  },
  rightAlign: {
    textAlign: 'right',
  },
  bold: {
    fontWeight: 'bold',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});

// PDF Document Component
const InvoicePDF = ({ invoice }: { invoice: Invoice }) => {
  const { subtotal, tax, total } = getInvoiceCalculations(invoice);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
              {invoice.companyName}
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.bold}>Invoice #{invoice.invoiceNumber}</Text>
            <Text>Date: {invoice.date}</Text>
            <Text>Due Date: {invoice.dueDate}</Text>
            <Text>Status: {invoice.status}</Text>
          </View>
        </View>

        {/* Company & Customer Info */}
        <View style={styles.row}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>FROM</Text>
            <Text style={styles.infoValue}>{invoice.companyName}</Text>
            <Text style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
              {invoice.companyAddress}
            </Text>
          </View>
          
          <View style={[styles.infoBox, styles.infoBoxLast]}>
            <Text style={styles.infoLabel}>BILL TO</Text>
            <Text style={styles.infoValue}>{invoice.customer}</Text>
            <Text style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
              {invoice.customerAddress}
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ITEMS</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Description</Text>
              <Text style={styles.tableHeaderCell}>Qty</Text>
              <Text style={styles.tableHeaderCell}>Unit</Text>
              <Text style={styles.tableHeaderCell}>Unit Price</Text>
              <Text style={[styles.tableHeaderCell, styles.rightAlign]}>Amount</Text>
            </View>
            
            {/* Table Rows */}
            {invoice.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 3 }]}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>{item.unit || 'N/A'}</Text>
                <Text style={styles.tableCell}>
                  {invoice.currency} {item.price.toFixed(2)}
                </Text>
                <Text style={[styles.tableCell, styles.amountCell]}>
                  {invoice.currency} {(item.quantity * item.price).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>
              {invoice.currency} {subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax ({invoice.taxRate}%):</Text>
            <Text style={styles.totalValue}>
              {invoice.currency} {tax.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={[styles.totalLabel, styles.grandTotal]}>Total:</Text>
            <Text style={[styles.totalValue, styles.grandTotal]}>
              {invoice.currency} {total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Payment Method & Notes */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>PAYMENT DETAILS</Text>
            <Text style={{ fontSize: 11, color: '#475569', marginTop: 8 }}>
              Payment Method: {invoice.paymentMethod}
            </Text>
          </View>
        </View>

        {invoice.notes && (
          <View style={styles.notes}>
            <Text style={[styles.infoLabel, { marginBottom: 8 }]}>NOTES</Text>
            <Text>{invoice.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated by Invoice Management System</Text>
          <Text>Page 1 of 1</Text>
        </View>
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
}

// Main Component
export const ReactPdfGenerator: React.FC<ReactPdfGeneratorProps> = ({
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
interface BatchPdfGeneratorProps {
  invoices: Invoice[];
  buttonText?: string;
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
}

export const BatchPdfGenerator: React.FC<BatchPdfGeneratorProps> = ({
  invoices,
  buttonText = 'Download All PDFs',
  buttonType = 'default',
}) => {
  const [downloading, setDownloading] = React.useState(false);

  const handleBatchDownload = () => {
    setDownloading(true);
    
    // Create individual PDFs for each invoice
    invoices.forEach((invoice, index) => {
      // In a real implementation, you would generate and save each PDF
      // For now, we'll just trigger individual downloads with a delay
      setTimeout(() => {
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Note: In production, you would generate actual PDF blobs
        // This is a simplified example
        console.log(`Generating PDF for invoice: ${invoice.invoiceNumber}`);
        
        document.body.removeChild(link);
      }, index * 500);
    });

    // Reset downloading state
    setTimeout(() => setDownloading(false), invoices.length * 500 + 1000);
  };

  return (
    <Button
      type={buttonType}
      size="middle"
      icon={<DownloadOutlined />}
      loading={downloading}
      onClick={handleBatchDownload}
      className="flex items-center gap-2"
    >
      {downloading ? 'Generating PDFs...' : buttonText}
    </Button>
  );
};

export default ReactPdfGenerator;