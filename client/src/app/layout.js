import { Navbar, Footer, DarkMode } from '@/components';
import { AuthContextProvider } from '@/contexts/authContext';
import { DarkModeProvider } from '@/contexts/darkmodeContext';
import './globals.css';

export const metadata = {
  title: 'Vivid',
  description: 'A finance membership tracker for CPS406',
  icons: [{ url: '/images/icon.ico', rel: 'icon' }]
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <DarkModeProvider>
        <html lang="en">
          <body className="font-serif">
            <Navbar />
            <main className="space-y-20"> {children} </main>
            <DarkMode />
            <Footer />
          </body>
        </html>
      </DarkModeProvider>
    </AuthContextProvider>
  )
};