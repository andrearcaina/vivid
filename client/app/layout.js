import { Body } from '../components';
import { AuthContextProvider } from '../contexts/authContext';
import { DarkModeProvider } from '../contexts/darkModeContext';
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
          <Body>
            {children}
          </Body>
        </html>
      </DarkModeProvider>
    </AuthContextProvider>
  )
};