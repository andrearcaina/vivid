import { useDarkMode } from '@/hooks/useDarkModeContext';


export default function Footer() {
    const { darkMode } = useDarkMode();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <footer className="h-[5vh] dark:bg-gray-800 flex flex-col items-center justify-center text-s">
                <h3 className="dark:text-neutral-300 text-gray-400 text-center">© 2024 Vivid | All Rights Reserved</h3>
                <h4 className="dark:text-neutral-300 text-gray-400 text-center">Developed by: Andre Arcaina, Jack Heintz, Joseph Leung, Tristan Cheng, and Felipe Quiroga</h4>
            </footer>            
        </div>
    );
}