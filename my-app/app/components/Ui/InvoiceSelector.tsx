// src/components/ui/InvoiceSelector.tsx
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Card, Radio, Tag } from 'antd';
import React from 'react';
import { Invoice } from '../Invoices/types';

interface InvoiceSelectorProps {
  invoices: Invoice[];
  selectedInvoiceId: number | 'all';
  onSelect: (invoiceId: number | 'all') => void;
}

const InvoiceSelector: React.FC<InvoiceSelectorProps> = ({
  invoices,
  selectedInvoiceId,
  onSelect,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircleOutlined />;
      case 'Pending':
        return <ClockCircleOutlined />;
      default:
        return null;
    }
  };

  return (
    <Card 
      title="Select Invoice" 
      className="mb-6"
      extra={
        <Radio.Group 
          value={selectedInvoiceId} 
          onChange={(e) => onSelect(e.target.value)}
          className="flex gap-4"
        >
          <Radio.Button value="all">Both Invoices</Radio.Button>
          {invoices.map((invoice) => (
            <Radio.Button key={invoice.id} value={invoice.id}>
              {invoice.invoiceNumber}
            </Radio.Button>
          ))}
        </Radio.Group>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedInvoiceId === invoice.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-slate-700 hover:border-blue-300'
            }`}
            onClick={() => onSelect(invoice.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {invoice.invoiceNumber}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {invoice.customer}
                </p>
              </div>
              <Tag
                color={getStatusColor(invoice.status)}
                icon={getStatusIcon(invoice.status)}
                className="m-0"
              >
                {invoice.status}
              </Tag>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {invoice.date}
              </span>
              <span className="font-semibold text-gray-800 dark:text-white">
                Total: {invoice.currency} $
                {invoice.items
                  .reduce((sum, item) => sum + item.quantity * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InvoiceSelector;