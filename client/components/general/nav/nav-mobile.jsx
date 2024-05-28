import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import { useDarkMode } from '../../../hooks/useDarkModeContext';
import Link from 'next/link';

export const NavMobile = ({ links }) => {
    const [isOpen, setOpen] = useState(false);
    const { darkMode } = useDarkMode();
    const ref = useRef(null);

    useClickAway(ref, () => setOpen(false));

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div ref={ref} className="lg:hidden dark:text-neutral-300">
                <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
                
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed left-0 right-0 z-50 p-5 bg-white dark:bg-gray-800 top-[6rem] shadow-lg"
                        >
                            <ul className="grid gap-5">
                                {links.map((link, idx) => (
                                    <motion.li
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: 0.1 + idx / 10,
                                        }}
                                        key={idx}
                                        className="w-full rounded-xl bg-gray-300 dark:bg-gray-600 dark:text-neutral-300 text-black"
                                    >
                                        <Link
                                            onClick={() => setOpen((prev) => !prev)}
                                            className="flex items-center justify-between w-full p-5 rounded-xl bg-gray-300 dark:bg-gray-600 dark:text-neutral-300 text-black"
                                            href={link.link}
                                        >
                                            <span className="flex gap-1 text-lg">{link.text}</span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};