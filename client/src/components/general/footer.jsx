import { useDarkMode } from '@/hooks/useDarkModeContext';


export default function Footer() {
    const { darkMode } = useDarkMode();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <footer className="dark:bg-gray-800">
                <h3 className="dark:text-neutral-300">placeholder footer</h3>
            </footer>            
        </div>

    );
}