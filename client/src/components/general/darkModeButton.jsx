import { useDarkMode } from '@/hooks/useDarkModeContext';
import { motion } from 'framer-motion';

export default function DarkMode() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <motion.button
                className="absolute w-16 h-16 bottom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold"
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotateY: darkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <span
                    style={{
                        transform: darkMode ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        display: 'inline-block',
                    }}
                >
                    {darkMode ? "DRK" : "LHT"}
                </span>
            </motion.button>
        </div>
    );
}
