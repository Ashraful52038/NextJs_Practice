import CounterProvider from '@/context/Counter'
import './globals.css'
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CounterProvider>
          {children}
        </CounterProvider>
      </body>
    </html>
  )
}