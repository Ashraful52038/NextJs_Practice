'use client';

import { invoiceData } from "@/app/components/Invoices/InvoiceData";
import { MultiplePrintButton } from "@/app/components/pdf-generators/React-to-print";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface HeaderProps {
    onQuickDownload:()=>void,
    isQuickDownloadLoading:boolean,
    isAllSelected?:boolean,
    selectedInvoiceId?:number | 'all';
}

export default function Header({
    onQuickDownload,
    isQuickDownloadLoading,
    isAllSelected = false,
    selectedInvoiceId = 1
}: HeaderProps){
    return (
    <div className="bg-white dark:bg-slate-800 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Invoice PDF Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Test and compare different PDF generation methods with Ant Design & Tailwind CSS
            </p>
          </div>
          <div className="flex items-center gap-3">
          <Button 
              type="primary" 
              icon={<DownloadOutlined />}
              onClick={onQuickDownload}
              loading={isQuickDownloadLoading}
            >
              Quick Download
            </Button>
            <MultiplePrintButton 
              invoices={invoiceData} 
              buttonText="Print All"
              className="no-print"
            />
          </div>
        </div>
      </div>
    </div>
  );
}