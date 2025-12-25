// src/app/page.tsx
'use client';

import {
  CodeOutlined,
  FilePdfOutlined,
  Html5Outlined,
  PrinterOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Progress,
  Row,
  Space,
  Tabs
} from 'antd';
import { useState } from 'react';
import { usePdfGeneration } from '../../hooks/PdfGenerator';
import { invoiceData } from '../components/Invoices/InvoiceData';
import InvoiceTemplate from '../components/Invoices/InvoiceTemplate';
import { MultiplePrintButton, PrintButton } from '../components/pdf-generators/React-to-print';
import { BatchReactPdfDownload, ReactPdfDownloadLink } from '../components/pdf-generators/ReactPdf';
import InvoiceSelector from '../components/Ui/InvoiceSelector';
import PdfMethodCard from '../components/Ui/PdfMethodCard';
import AlertBanner from './Module/AlertBanner';
import Header from './Module/Header';

export default function HomePage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | 'all'>(1);
  const [activeTab, setActiveTab] = useState('preview');
  const [isQuickDownloadLoading, setIsQuickDownloadLoading] = useState(false);

  const {
    handleHtml2Pdf,
    handleBatchHtml2Pdf,
    handleJsPdf,
    handleBatchJsPdf,
    isLoading,
  } = usePdfGeneration();
  
  const selectedInvoice = invoiceData.find(inv => inv.id === selectedInvoiceId);
  const isAllSelected = selectedInvoiceId === 'all';
  
  const pdfMethods = [
    {
      title: 'HTML to PDF',
      description: 'Converts HTML to image then to PDF. Preserves exact styling.',
      method: 'html2pdf' as const,
      pros: ['Exact visual replication', 'Preserves all CSS styles', 'Easy to implement'],
      cons: ['Large file size', 'Slow for complex pages', 'Image-based PDF'],
      bestFor: 'When exact design must be preserved',
      onGenerate: () => {
        if (isAllSelected) {
          handleBatchHtml2Pdf(invoiceData);
        } else if (selectedInvoice) {
          handleHtml2Pdf(selectedInvoice.id, selectedInvoice.invoiceNumber);
        }
      },
      loading: isLoading(isAllSelected ? 'batch-html2pdf' : `html2pdf-${selectedInvoiceId}`),
    },
    {
      title: 'jsPDF Only',
      description: 'Direct PDF generation without HTML conversion. Programmatic layout.',
      method: 'jspdf' as const,
      pros: ['Small file size', 'Fast generation', 'Full control over layout'],
      cons: ['Manual layout coding', 'No HTML styling', 'Steeper learning curve'],
      bestFor: 'Simple text-based invoices or custom layouts',
      onGenerate: () => {
        if (isAllSelected) {
          handleBatchJsPdf(invoiceData);
        } else if (selectedInvoice) {
          handleJsPdf(selectedInvoice);
        }
      },
      loading: isLoading(isAllSelected ? 'batch-jspdf' : `jspdf-${selectedInvoiceId}`),
    },
    {
      title: 'React-to-Print',
      description: 'Uses browser print dialog. Best for direct printing.',
      method: 'react-to-print' as const,
      pros: ['Uses browser capabilities', 'Easy to implement', 'Good for printing'],
      cons: ['Depends on browser', 'Less control', 'Not for programmatic generation'],
      bestFor: 'When you want user to use browser print functionality',
      onGenerate: () => {}, // Handled by component
    },
    {
      title: '@react-pdf/renderer',
      description: 'React components for PDF generation. Server-side capable.',
      method: 'react-pdf' as const,
      pros: ['React components', 'Server-side generation', 'Good performance'],
      cons: ['Different styling system', 'Learning curve', 'Limited HTML support'],
      bestFor: 'Programmatic PDF generation in React apps',
      onGenerate: () => {}, // Handled by component
    },
  ];

  const handleQuickDownload = async () => {
    setIsQuickDownloadLoading(true);
    try {
      if (selectedInvoiceId === 'all') {
        // Download all invoices
        await handleBatchHtml2Pdf(invoiceData);
      } else if (selectedInvoiceId) {
        // Download single invoice
        const invoice = invoiceData.find(inv => inv.id === selectedInvoiceId);
        if (invoice) {
          await handleHtml2Pdf(invoice.id, invoice.invoiceNumber);
        }
      }
    } catch (error) {
      console.error('Quick download failed:', error);
    } finally {
      setIsQuickDownloadLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <Header
       onQuickDownload={handleQuickDownload}
        isQuickDownloadLoading={isQuickDownloadLoading}
        isAllSelected={selectedInvoiceId === 'all'}
        selectedInvoiceId={selectedInvoiceId}/>
      
      <div className="container mx-auto px-4 py-8">
        {/* Alert Banner */}
        <AlertBanner/>
        
        {/* Invoice Selection */}
        <InvoiceSelector
          invoices={invoiceData}
          selectedInvoiceId={selectedInvoiceId}
          onSelect={setSelectedInvoiceId}
        />
        
        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'preview',
              label: (
                <span className="flex items-center gap-2">
                  <FilePdfOutlined />
                  Invoice Preview
                </span>
              ),
              children: (
                <div className="space-y-6">
                  {isAllSelected ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {invoiceData.map((invoice) => (
                        <div key={invoice.id} className="animate-fade-in">
                          <InvoiceTemplate invoice={invoice} />
                        </div>
                      ))}
                    </div>
                  ) : selectedInvoice ? (
                    <div className="animate-fade-in">
                      <InvoiceTemplate invoice={selectedInvoice} />
                    </div>
                  ) : null}
                </div>
              ),
            },
            {
              key: 'methods',
              label: (
                <span className="flex items-center gap-2">
                  <CodeOutlined />
                  PDF Methods
                </span>
              ),
              children: (
                <div className="space-y-6">
                  {/* Method Cards */}
                  <Row gutter={[16, 16]}>
                    {pdfMethods.map((method) => (
                      <Col key={method.method} xs={24} sm={12} lg={6}>
                        <PdfMethodCard
                          title={method.title}
                          description={method.description}
                          icon={<FilePdfOutlined />}
                          method={method.method}
                          onGenerate={method.onGenerate}
                          loading={method.loading}
                          disabled={!selectedInvoice && !isAllSelected}
                          pros={method.pros}
                          cons={method.cons}
                          bestFor={method.bestFor}
                        />
                      </Col>
                    ))}
                  </Row>
                  
                  {/* Action Buttons */}
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
                                onClick={() => handleHtml2Pdf(selectedInvoice.id, selectedInvoice.invoiceNumber)}
                                loading={isLoading(`html2pdf-${selectedInvoice.id}`)}
                              >
                                HTML2PDF
                              </Button>
                              <Button
                                icon={<FilePdfOutlined />}
                                onClick={() => handleJsPdf(selectedInvoice)}
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
                              <ReactPdfDownloadLink invoice={selectedInvoice} >
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
                            onClick={() => handleBatchHtml2Pdf(invoiceData)}
                            loading={isLoading('batch-html2pdf')}
                          >
                            Batch HTML2PDF
                          </Button>
                          <Button
                            icon={<FilePdfOutlined />}
                            onClick={() => handleBatchJsPdf(invoiceData)}
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
                </div>
              ),
            },
            {
              key: 'comparison',
              label: 'Comparison',
              children: (
                <Card title="Method Comparison Table">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-slate-700">
                        <th className="p-4 text-left">Method</th>
                        <th className="p-4 text-left">Best For</th>
                        <th className="p-4 text-left">File Size</th>
                        <th className="p-4 text-left">Speed</th>
                        <th className="p-4 text-left">Styling</th>
                        <th className="p-4 text-left">Complexity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-slate-700">
                        <td className="p-4 font-semibold">html2canvas + jsPDF</td>
                        <td className="p-4">Exact design replication</td>
                        <td className="p-4">
                          <Progress percent={80} size="small" status="active" />
                          <span className="text-xs text-gray-500">Large</span>
                        </td>
                        <td className="p-4">
                          <Progress percent={40} size="small" status="exception" />
                          <span className="text-xs text-gray-500">Slow</span>
                        </td>
                        <td className="p-4 text-green-600">Excellent</td>
                        <td className="p-4 text-yellow-600">Medium</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-slate-700">
                        <td className="p-4 font-semibold">jsPDF Only</td>
                        <td className="p-4">Programmatic generation</td>
                        <td className="p-4">
                          <Progress percent={20} size="small" status="success" />
                          <span className="text-xs text-gray-500">Small</span>
                        </td>
                        <td className="p-4">
                          <Progress percent={90} size="small" status="success" />
                          <span className="text-xs text-gray-500">Fast</span>
                        </td>
                        <td className="p-4 text-red-600">Limited</td>
                        <td className="p-4 text-red-600">High</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-slate-700">
                        <td className="p-4 font-semibold">react-to-print</td>
                        <td className="p-4">Browser printing</td>
                        <td className="p-4">
                          <Progress percent={50} size="small" />
                          <span className="text-xs text-gray-500">Medium</span>
                        </td>
                        <td className="p-4">
                          <Progress percent={70} size="small" />
                          <span className="text-xs text-gray-500">Fast</span>
                        </td>
                        <td className="p-4 text-green-600">Excellent</td>
                        <td className="p-4 text-green-600">Low</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold">@react-pdf/renderer</td>
                        <td className="p-4">React apps, SSR</td>
                        <td className="p-4">
                          <Progress percent={30} size="small" status="success" />
                          <span className="text-xs text-gray-500">Small</span>
                        </td>
                        <td className="p-4">
                          <Progress percent={80} size="small" status="success" />
                          <span className="text-xs text-gray-500">Fast</span>
                        </td>
                        <td className="p-4 text-yellow-600">Good</td>
                        <td className="p-4 text-yellow-600">Medium</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}