import './globals.css'
import { ProfesionalCardProvider } from './profesionalCardContext'
import { AuthProvider } from './userContext'

export const metadata = {
  title: 'NetExpertos',
  description: 'Descripción',
}

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body>
        <AuthProvider>
          <ProfesionalCardProvider>{children}</ProfesionalCardProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
