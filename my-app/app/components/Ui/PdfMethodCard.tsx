// src/components/ui/PdfMethodCard.tsx
import {
    CheckOutlined,
    ClockCircleOutlined,
    CodeOutlined,
    FilePdfOutlined,
    Html5Outlined,
    PrinterOutlined
} from '@ant-design/icons';
import { Card, Tag, Tooltip } from 'antd';
import React, { ReactNode } from 'react';

interface PdfMethodCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  method: 'html2pdf' | 'jspdf' | 'react-to-print' | 'react-pdf';
  onGenerate: () => void;
  loading?: boolean;
  disabled?: boolean;
  pros: string[];
  cons: string[];
  bestFor: string;
}

const PdfMethodCard: React.FC<PdfMethodCardProps> = ({
  title,
  description,
  icon,
  method,
  onGenerate,
  loading = false,
  disabled = false,
  pros,
  cons,
  bestFor,
}) => {
  const getMethodIcon = (methodType: string) => {
    switch (methodType) {
      case 'html2pdf':
        return <Html5Outlined className="text-2xl" />;
      case 'jspdf':
        return <FilePdfOutlined className="text-2xl" />;
      case 'react-to-print':
        return <PrinterOutlined className="text-2xl" />;
      case 'react-pdf':
        return <CodeOutlined className="text-2xl" />;
      default:
        return null;
    }
  };

  const getMethodColor = (methodType: string) => {
    switch (methodType) {
      case 'html2pdf':
        return 'green';
      case 'jspdf':
        return 'blue';
      case 'react-to-print':
        return 'orange';
      case 'react-pdf':
        return 'red';
      default:
        return 'default';
    }
  };

  return (
    <Card
      hoverable
      className="h-full transition-all duration-300 hover:shadow-lg"
      actions={[
        <Tooltip key="generate" title={disabled ? 'Please select an invoice first' : ''}>
          <button
            onClick={onGenerate}
            disabled={disabled || loading}
            className={`w-full py-2 font-medium ${
              disabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } rounded transition-colors`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <ClockCircleOutlined spin />
                Generating...
              </span>
            ) : (
              'Generate PDF'
            )}
          </button>
        </Tooltip>,
      ]}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-lg bg-${getMethodColor(method)}-100`}>
          {getMethodIcon(method)}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">
            {title}
          </h3>
          <Tag color={getMethodColor(method)} className="mt-1">
            {method}
          </Tag>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1">
            <CheckOutlined className="text-green-500" />
            Pros
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Cons
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Best For
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{bestFor}</p>
        </div>
      </div>
    </Card>
  );
};

export default PdfMethodCard;