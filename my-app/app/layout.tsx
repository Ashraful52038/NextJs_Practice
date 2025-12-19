import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] })

import { Metadata } from "next";
import StoreProvider from './providers/storeProvider';

export const metadata : Metadata ={
    title: "DeadPool Counter Redux toolkit",
    description: 'Counter app using Redux Toolkit with Immer',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}