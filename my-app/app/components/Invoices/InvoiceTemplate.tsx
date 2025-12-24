// src/components/invoices/InvoiceTemplate.tsx
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import InvoiceStatusBadge from '../Ui/InvoiceStatusBadge';
import { getInvoiceCalculations } from './InvoiceData';
import { Invoice } from './types';

interface InvoiceTemplateProps {
  invoice: Invoice;
  showActions?: boolean;
  isPrintable?: boolean;
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ 
  invoice, 
  showActions = false,
  isPrintable = false 
}) => {
  const { subtotal, tax, total } = getInvoiceCalculations(invoice);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircleOutlined className="text-green-500" />;
      case 'Pending':
        return <ClockCircleOutlined className="text-yellow-500" />;
      case 'Overdue':
        return <CloseCircleOutlined className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`invoice-card ${isPrintable ? 'print:shadow-none print:border' : 'shadow-lg'}`}
      id={`invoice-${invoice.id}`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-4 mb-4">
            {invoice.companyLogo && (
              <img 
                src={invoice.companyLogo} 
                alt={invoice.companyName}
                className="h-12"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">INVOICE</h1>
              <p className="text-gray-600 dark:text-gray-300">Professional Invoice</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Invoice #:</span> {invoice.invoiceNumber}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Date:</span> {invoice.date}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Status:</span>
              <InvoiceStatusBadge status={invoice.status} />
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 text-right">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{invoice.companyName}</h3>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.companyAddress}</p>
        </div>
      </div>

      {/* Bill To & From */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Bill From</h3>
          <div className="space-y-1">
            <p className="font-medium text-gray-800 dark:text-white">{invoice.companyName}</p>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.companyAddress}</p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Bill To</h3>
          <div className="space-y-1">
            <p className="font-medium text-gray-800 dark:text-white">{invoice.customer}</p>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.customerAddress}</p>
            <p className="text-gray-600 dark:text-gray-300">{invoice.customerEmail}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-700">
              <th className="table-header text-left">Description</th>
              <th className="table-header text-center">Qty</th>
              <th className="table-header text-center">Unit</th>
              <th className="table-header text-right">Unit Price</th>
              <th className="table-header text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="table-cell">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                  </div>
                </td>
                <td className="table-cell text-center">{item.quantity}</td>
                <td className="table-cell text-center">{item.unit || 'N/A'}</td>
                <td className="table-cell text-right font-medium">
                  {invoice.currency} {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="table-cell text-right font-semibold text-blue-600 dark:text-blue-400">
                  {invoice.currency} {(item.quantity * item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
              <span className="font-medium">
                {invoice.currency} {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Tax ({invoice.taxRate}%):
              </span>
              <span className="font-medium">
                {invoice.currency} {tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-300 dark:border-slate-600">
              <span className="text-lg font-bold text-gray-800 dark:text-white">Total:</span>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {invoice.currency} {total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Payment Details</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Method:</span> {invoice.paymentMethod}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Due Date:</span> {invoice.dueDate}
              </p>
            </div>
            {invoice.terms && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Terms & Conditions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{invoice.terms}</p>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Notes</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">{invoice.notes}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3">
          <button className="btn-primary">Edit Invoice</button>
          <button className="btn-success">Send Invoice</button>
          <button className="btn-warning">Share</button>
        </div>
      )}
    </Card>
  );
};

export default InvoiceTemplate;