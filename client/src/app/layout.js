import { Navbar, Footer } from '@/components';
import './globals.css';

export const metadata = {
  title: 'Vivid',
  description: 'a club finance tracker for CPS406',
  icons: [{ url: '/images/icon.ico', rel: 'icon' }]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-serif">
        <Navbar />
        <main className="space-y-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
};