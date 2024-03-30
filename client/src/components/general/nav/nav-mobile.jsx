import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import Link from 'next/link';

export const NavMobile = ({ links }) => {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    useClickAway(ref, () => setOpen(false));

    const handleLogout = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/user-auth/logout/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = response.json();
            
            if (data) {
                console.log("Logged out");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div ref={ref} className="lg:hidden">
            <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-0 right-0 z-50 p-5 bg-white top-[6rem] shadow-lg"
                    >
                        <ul className="grid gap-5">
                            {links.map((link, idx) => {
                                if (link.name !== "Log Out") {
                                    return (
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
                                            className="w-full rounded-xl bg-gray-300 text-black"
                                        >
                                            <Link
                                                onClick={() => setOpen((prev) => !prev)}
                                                className="flex items-center justify-between w-full p-5 rounded-xl bg-gray-300 text-black"
                                                href={link.link}
                                            >
                                                <span className="flex gap-1 text-lg">{link.name}</span>
                                            </Link>
                                        </motion.li>
                                    );
                                }
                                
                                return (
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
                                        className="w-full rounded-xl bg-gray-300 text-black"
                                    >
                                        <Link
                                            onClick={() => setOpen((prev) => !prev)}
                                            className="flex items-center justify-between w-full p-5 rounded-xl bg-gray-300 text-black"
                                            href="/"
                                        >
                                            <span className="flex gap-1 text-lg" onClick={handleLogout}>{link.name}</span>
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};