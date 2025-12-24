import CounterProvider from '@/context/Counter';
import { FormProvider } from '@/context/FormContext';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StoreProvider from '../app/Todo/storeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo app with Redux',
};


export default function RootLayout({ 
  children,

 }:{
  children: React.ReactNode
 }) {
  return (
    <html lang="en">
      <body>
        <FormProvider>
          <CounterProvider>
          <StoreProvider>
            {/* Ant Design Registry এবং ConfigProvider যোগ করুন */}
              <AntdRegistry>
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
              </AntdRegistry>
          </StoreProvider>
        </CounterProvider>
        </FormProvider>
      </body>
    </html>
  )
}