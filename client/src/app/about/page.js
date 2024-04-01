'use client';
import { useDarkMode } from '@/hooks/useDarkModeContext';


export default function AboutPage() {
    const { darkMode } = useDarkMode();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <main className="dark:bg-gray-900">
                <h3 className="dark:text-neutral-300">about page</h3>
            </main>
        </div>
    )
}