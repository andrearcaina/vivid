import { useDarkMode } from '../../../hooks/useDarkModeContext';
import { usePathname } from 'next/navigation';
import { NavMobile } from './nav-mobile';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image'; 

const linkClasses = 'flex items-center gap-2 lg:font-light px-3 py-2 hover:bg-neutral-400 hover:dark:bg-neutral-600 hover:no-underline dark:active:bg-neutral-600 rounded-sm lg:text-base'

export const NavDashboard = ({ links }) => {
    const { darkMode } = useDarkMode();
    const router = usePathname();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <nav className="flex flex-row justify-between p-4 sticky top-0 z-50 w-screen bg-neutral-200 dark:bg-gray-800 lg:flex lg:flex-col lg:bg-neutral-200 lg:dark:bg-gray-800 lg:w-60 lg:h-screen lg:p-3 lg:text-gray-700 lg:dark:text-neutral-400">
                <div className="flex items-center max-w-7xl px-4 lg:items-center lg:gap-2 lg:px-1 lg:py-3">
                    <Image src="/images/icon.ico" alt="Logo" width={60} height={60} className="rounded-md logo-image" />
                    <Link href="/dashboard" className="text-4xl font-extrabold dark:text-white">Vivid</Link>
                </div>

                <div className="hidden lg:flex lg:flex-col lg:flex-1">
                    <div className="lg:flex-1 lg:py-8 lg:flex lg:flex-col lg:gap-0.5">
                        {links.slice(0, -1).map((navItem, index) => (
                            <Link key={index} href={navItem.link} className={classNames(router == navItem.link ? 'text-white bg-neutral-500 dark:bg-neutral-700' : '', linkClasses)}>
                                <span className="text-4xl">{navItem.icon}</span>
                                <span className="font-bold text-lg">{navItem.text}</span>
                            </Link>
                        ))}
                    </div>

                    <div className=" lg:py-3 lg:border-t lg:border-neutral-400 lg:dark:border-neutral-600 dark:text-red-500 text-red-900 lg:cursor-pointer">
                        {links.slice(-1).map((navItem, index) => (
                            <Link key={index} href={navItem.link} className={classNames(router == navItem.link ? 'text-white bg-neutral-500 dark:bg-neutral-700' : '', linkClasses)}>
                                <span className="text-4xl">{navItem.icon}</span>
                                <span className="font-bold text-lg">{navItem.text}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                
                <div className="px-5 my-auto dark:text-white">
                    <NavMobile links={links} />
                </div>
            </nav>
        </div>
    );
};

