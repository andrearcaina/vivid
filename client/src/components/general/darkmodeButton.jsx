import { useDarkMode } from '@/hooks/useDarkModeContext';

export default function DarkMode() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <button className="absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold"
            onClick={toggleDarkMode}>
                {darkMode ? "LHT" : "DRK"}
            </button>
        </div>
    );
}