import { useDarkMode } from '@/hooks/useDarkModeContext';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image'; 

const linkClasses = 
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-400 hover:dark:bg-neutral-600 hover:no-underline dark:active:bg-neutral-600 rounded-sm text-base'

export const NavDashboard = ({ links }) => {
    const { darkMode } = useDarkMode();
    const router = usePathname();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <nav className="flex flex-col bg-neutral-200 dark:bg-gray-800 w-60 h-screen p-3 text-gray-700 dark:text-neutral-400">

                <div className='flex items-center gap-2 px-1 py-3'>
                    <Image src="/images/icon.ico" alt="Logo" width={60} height={60} className="rounded-md logo-image" />
                    <Link href="/dashboard" className="text-4xl font-extrabold dark:text-white">Vivid</Link>
                </div>

                <div className="flex-1 py-8 flex flex-col gap-0.5">
                    {links.slice(0, -1).map((navItem, index) => (
                        <Link key={index} href={navItem.link} className={classNames(router == navItem.link ? 'text-white bg-neutral-500 dark:bg-neutral-700' : '', linkClasses)}>
                            <span className="text-4xl">{navItem.icon}</span>
                            <span className="font-bold text-lg">{navItem.text}</span>
                        </Link>
                    ))}
                </div>

                <div className="py-3 border-t border-neutral-400 dark:border-neutral-600 dark:text-red-500 text-red-900 cursor-pointer">
                    {links.slice(-1).map((navItem, index) => (
                        <Link key={index} href={navItem.link} className={classNames(router == navItem.link ? 'text-white bg-neutral-500 dark:bg-neutral-700' : '', linkClasses)}>
                            <span className="text-4xl">{navItem.icon}</span>
                            <span className="font-bold text-lg">{navItem.text}</span>
                        </Link>
                    ))}
                </div>

            </nav>
        </div>
        
    );
};

