import { useDarkMode } from '@/hooks/useDarkModeContext';


export default function Footer() {
    const { darkMode } = useDarkMode();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <footer className="h-[5vh] dark:bg-gray-800">
                <h3 className="dark:text-neutral-300 text-gray-400 text-center">© 2024 Vivid</h3>
            </footer>            
        </div>
    );
}