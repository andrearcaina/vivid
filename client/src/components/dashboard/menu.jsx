import { useDarkMode } from '@/hooks/useDarkModeContext';
import Announcements from './functionality/announcements';
import Functionality from './functionality/rightSide';
import Welcome from './welcome';

export default function Menu({ role }) {
    const { darkMode } = useDarkMode();

    return (
        <main className={darkMode ? 'dark' : ''}>
            <div className="h-[95vh] bg-gray-100 dark:bg-gray-900">
                <h1 className="text-center text-3xl p-5 dark:text-neutral-300">{role} Dashboard</h1>
                <Welcome />
                
                <div className="grid grid-cols-2 ">
                    <Announcements/>
                    
                    <div className="flex flex-col w-full">
                        <Functionality />
                    </div>
                </div>
            </div>
        </main>
    )
}