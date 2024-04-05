'use client';
import { useAuthContext } from "@/hooks/useAuthContext";
import { Navbar, Footer, DarkMode} from '@/components';

export default function Body({ children }) {
    const { authReady } = useAuthContext();

    return (
        <body className={authReady ? "font-serif flex" : "font-serif"}>
            <Navbar />
            <main className={authReady ? "flex-grow" : "space-y-20"}> 
                {children} 
                <DarkMode />
                <Footer />
            </main>
        </body>
    )
} 