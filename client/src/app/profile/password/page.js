'use client';
import { UnAuthorized } from "@/components";
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from "@/hooks/useDarkModeContext";

export default function Password() {
    const { authReady } = useAuthContext();
    const { darkMode } = useDarkMode();

    if (authReady) {
        return (
            <main className={darkMode ? 'dark' : ''}>
                <div className="flex flex-col w-full h-[77.4vh] overflow-hidden p-4 dark:bg-gray-900">
                    <section>
                        <h1 className="dark:text-neutral-300 text-3xl">Change Password</h1>
                    </section>
                    <div>
                        <p className="dark:text-neutral-300">Current Password</p>
                        <input className="border border-gray-500" />
                    </div>
                </div>
            </main>
        );
    } else {
        return <UnAuthorized />
    }
}