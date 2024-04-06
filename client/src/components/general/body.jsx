'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Navbar, Footer, DarkMode} from '@/components';

export default function Body({ children }) {
    const { authReady } = useAuthContext();

    return (
        <body className={authReady ? "reddit-mono flex flex-col lg:flex-row" : "reddit-mono"}>
            <Navbar />
            <main className={authReady ? "lg:flex-grow" : ""}>
                {children}
                <DarkMode />
                <Footer />
            </main>
        </body>
    )
} 