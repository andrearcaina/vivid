import { Navbar, Footer } from '@/components';
import './globals.css';

export const metadata = {
  title: 'Club Finance Tracker',
  description: 'a club finance tracker for CPS406'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="space-y-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
};