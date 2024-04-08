'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Navbar, Footer, DarkMode } from '@/components';
import { Toaster } from 'react-hot-toast';

export default function Body({ children }) {
    const { authReady } = useAuthContext();

    return (
        <body className={authReady ? "reddit-mono flex flex-col lg:flex-row" : "reddit-mono"}>
            <Navbar />
            <main className={authReady ? "lg:flex-grow" : ""}>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                {children}
                <DarkMode />
                <Footer />
            </main>
        </body>
    )
} 