import CounterProvider from '@/context/Counter';
import { FormProvider } from '@/context/FormContext';
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