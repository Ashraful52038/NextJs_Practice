import CounterProvider from '@/context/Counter';
import { FormProvider } from '@/context/FormContext';
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
            {children}
          </StoreProvider>
        </CounterProvider>
        </FormProvider>
      </body>
    </html>
  )
}