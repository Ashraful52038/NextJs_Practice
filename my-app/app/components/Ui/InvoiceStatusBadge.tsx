// src/components/ui/InvoiceStatusBadge.tsx
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';

interface InvoiceStatusBadgeProps {
  status: 'Paid' | 'Pending' | 'Overdue';
  size?: 'small' | 'default' | 'large';
}

const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ 
  status, 
  size = 'default' 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Paid':
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
          text: 'Paid',
        };
      case 'Pending':
        return {
          color: 'warning',
          icon: <ClockCircleOutlined />,
          text: 'Pending',
        };
      case 'Overdue':
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
          text: 'Overdue',
        };
      default:
        return {
          color: 'default',
          icon: null,
          text: status,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Tag
      color={config.color}
      icon={config.icon}
      className={`${size === 'small' ? 'text-xs px-2 py-0.5' : ''}`}
    >
      {config.text}
    </Tag>
  );
};

export default InvoiceStatusBadge;