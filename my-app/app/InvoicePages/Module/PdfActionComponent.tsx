'use client';

import { invoiceData } from "@/app/components/Invoices/InvoiceData";
import PrintButton, { MultiplePrintButton } from "@/app/components/pdf-generators/React-to-print";
import { FilePdfOutlined, Html5Outlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Space } from "antd";
import { BatchReactPdfDownload, ReactPdfDownloadLink } from '../../components/pdf-generators/ReactPdf';


interface PdfActionProps{
    selectedInvoice: any;
    isAllSelected: boolean;
    onSingleHtml2Pdf: () => void;
    onSingleJsPdf: () => void;
    onBatchHtml2Pdf: () => void;
    onBatchJsPdf: () => void;
    isLoading: (key: string) => boolean;
}

export default function PdfAction({
    selectedInvoice,
    isAllSelected,
    onSingleHtml2Pdf,
    onSingleJsPdf,
    onBatchHtml2Pdf,
    onBatchJsPdf,
    isLoading
}: PdfActionProps){
   return (
    <Card title="Direct Actions" className="mt-6">
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-3">Single Invoice Actions</h4>
          <Space wrap>
            {selectedInvoice && (
              <>
                <Button
                  type="primary"
                  icon={<Html5Outlined />}
                  onClick={onSingleHtml2Pdf}
                  loading={isLoading(`html2pdf-${selectedInvoice.id}`)}
                >
                    HTML2PDF
                </Button>
                <Button
                  icon={<FilePdfOutlined />}
                  onClick={onSingleJsPdf}
                  loading={isLoading(`jspdf-${selectedInvoice.id}`)}
                >
                  jsPDF
                </Button>
                <PrintButton 
                  invoice={selectedInvoice} 
                  buttonText="Print"
                  variant="dashed"
                  icon={<PrinterOutlined />}
                />
                <ReactPdfDownloadLink invoice={selectedInvoice}>
                  React PDF
                </ReactPdfDownloadLink>
              </>
            )}
          </Space>
        </div>
        <Divider />
        
        <div>
          <h4 className="font-semibold mb-3">Batch Actions (Both Invoices)</h4>
          <Space wrap>
            <Button
              type="primary"
              icon={<Html5Outlined />}
              onClick={onBatchHtml2Pdf}
              loading={isLoading('batch-html2pdf')}
            >
              Batch HTML2PDF
            </Button>
            <Button
              icon={<FilePdfOutlined />}
              onClick={onBatchJsPdf}
              loading={isLoading('batch-jspdf')}
            >
              Batch jsPDF
            </Button>
            <MultiplePrintButton 
              invoices={invoiceData} 
              buttonText="Print All"
               />
            <BatchReactPdfDownload 
              invoices={invoiceData} 
              buttonText="Download All"
            />
          </Space>
        </div>
      </div>
    </Card>
  );
}