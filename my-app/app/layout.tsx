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
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}