import { useDarkMode } from '@/hooks/useDarkModeContext';
import { motion } from 'framer-motion';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function DarkMode() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <motion.button
                className="absolute w-12 h-12 bottom-16 right-16 bg-neutral-900 dark:bg-neutral-200 rounded-full text-white dark:text-black font-semibold flex justify-center items-center"
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
            >
                <motion.div
                    animate={{ rotate: darkMode ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {darkMode ? (
                        <IoSunnyOutline className="text-2xl text-black" />
                    ) : (
                        <IoMoonOutline className="text-2xl text-white" />
                    )}
                </motion.div>
            </motion.button>
        </div>
    );
}
