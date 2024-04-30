import './globals.css'
import Providers from '@/lib/provider'

export const metadata = {
  title: 'NetExpertos',
  description: 'Descripción',
}

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  )
}
