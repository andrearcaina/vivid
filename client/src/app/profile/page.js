'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { UnAuthorized } from '@/components';

export default function Profile() {
    const { authReady } = useAuthContext();
    const { darkMode } = useDarkMode();

    if (authReady) {
        return (
            <main className={darkMode ? 'dark' : ''}>
                <div className="h-[80vh] dark:bg-gray-900">
                    <p className="dark:text-neutral-300">Profile Page</p>
                </div>
            </main>
        );
    } else {
        return <UnAuthorized />;
    }
}