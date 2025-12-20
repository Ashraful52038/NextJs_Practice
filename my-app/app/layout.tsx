import CounterProvider from '@/context/Counter';
import './globals.css';
import StoreProvider from './providers/storeProvider';



export default function RootLayout({ 
  children,

 }:{
  children: React.ReactNode
 }) {
  return (
    <html lang="en">
      <body>
        <CounterProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </CounterProvider>
      </body>
    </html>
  )
}