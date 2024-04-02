import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { LogoutButton } from './logoutButton';
import { NavMobile } from './nav-mobile';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const { authReady } = useAuthContext();
    const { darkMode } = useDarkMode();
    const navItems = authReady ? roleItems() : regularItems();

    return (
        <div className={darkMode ? 'dark' : ''}>
            <nav className="bg-white dark:bg-gray-800 shadow-lg p-4 sticky top-0 z-50">
                <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
                    <div className="flex items-center">
                        <Link href="/">
                            <p className="flex items-center space-x-2 text-black dark:text-neutral-300">
                                <Image src="/images/icon.ico" alt="Logo" width={80} height={80} className="rounded-md logo-image" />
                                <span className="font-semibold text-2xl lg:text-3xl">Vivid</span>
                            </p>
                        </Link>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:w-auto">
                        <div className="flex flex-col lg:flex-row lg:space-x-4">
                            {navItems.map((navItem, index) => (
                                <Link key={index} href={navItem.link}>
                                    <div className="text-black dark:text-neutral-300 text-xl hover:text-green-500 transition-colors duration-200">{navItem.text}</div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <NavMobile links={navItems} />
                </div>
            </nav>
        </div>
    );
}

const roleItems = () => {
    return [
        { text: 'Dashboard', link: `/dashboard` },
        { text: 'Calendar', link: '/calendar' },
        { text: 'Finances', link: '/finances' },
        { text: 'Profile', link: '/profile' },
        { text: <LogoutButton />, link: '' }
    ]; 
}

const regularItems = () => {
    return [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Contact', link: '/contact' },
        { text: 'Login', link: '/auth/login' },
        { text: 'Register', link: '/auth/register' }
    ];
}