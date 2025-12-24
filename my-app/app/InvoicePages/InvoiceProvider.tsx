// src/app/providers.tsx (নতুন ফাইল তৈরি করুন)
'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#3b82f6',
              borderRadius: 8,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  );
}