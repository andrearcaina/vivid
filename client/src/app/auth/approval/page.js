'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';

export default function Approval() {
    const { authReady } = useAuthContext();
    const { darkMode } = useDarkMode();

    if (authReady) {
        router.push('/dashboard');
    }

    return (
        <main className={darkMode ? 'dark' : ''}>
            <div className="h-[80vh] flex flex-col justify-center items-center dark:bg-gray-900">
                <h1 className="text-4xl font-bold p-3 dark:text-neutral-300">Your account seems to not have been approved yet by a Coach.</h1>
                <p className="text-lg p-3 dark:text-neutral-300">Contact your Treasurer or Coach and discuss it with them.</p>
            </div>
        </main>
    );
}