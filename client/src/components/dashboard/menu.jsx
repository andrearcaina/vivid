import { useDarkMode } from '@/hooks/useDarkModeContext';
import Welcome from './welcome';

export default function Menu({ role }) {
    const { darkMode } = useDarkMode();

    return (
        <main className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <h1 className="text-center text-3xl p-5 dark:text-neutral-300">{role} Dashboard</h1>
                <div className="grid grid-cols-2 ">
                    <div className="w-full rounded-md overflow-hidden shadow-md ml-2 mr-2 bg-white p-4 dark:bg-gray-600">
                        <h2 className="underline dark:text-neutral-300 ">Announcements</h2>
                        <p className="dark:text-neutral-300">Announcements go here</p>
                    </div>
                    
                    <div className="flex flex-col w-full">
                        <div className="rounded-md overflow-hidden shadow-md mb-4 ml-4 mr-2 bg-white p-4 dark:bg-gray-600">
                            <h2 className="underline dark:text-neutral-300">Calendar</h2>
                            <p className="dark:text-neutral-300">Need to create a calendar</p>
                        </div>
                        
                        <div className="rounded-md overflow-hidden shadow-md ml-4 mr-2 bg-white p-4 dark:bg-gray-600">
                            <h2 className="underline dark:text-neutral-300">Finances</h2>
                            <p className="dark:text-neutral-300">money stuffs</p>
                        </div>
                    </div>
                </div>

                <Welcome />
            </div>
        </main>
    )
}