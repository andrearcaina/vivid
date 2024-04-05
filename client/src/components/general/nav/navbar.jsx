import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { NavDashboard } from './nav-dashboard';
import { NavGeneral } from './nav-general';
import { LogoutButton } from './logoutButton';
import { 
    IoSpeedometerOutline,
    IoCalendarNumberOutline,
    IoWalletOutline,
    IoPersonOutline,
    IoLogOutOutline
} from "react-icons/io5";

export default function Navbar() {
    const { authReady } = useAuthContext();
    const { darkMode } = useDarkMode();
    const navItems = authReady ? roleItems() : regularItems();

    return (
        <div className={darkMode ? 'dark' : ''}>
                    {authReady && navItems.some(item => item.text === 'Dashboard') ? 
                    (
                        <NavDashboard links={navItems} />
                    ) : (
                        <NavGeneral links={navItems} />
                    )}
        </div>
    );
}

const roleItems = () => {
    return [
        {
            key: 'dashboard',
            text: 'Dashboard',
            link: '/dashboard',
            icon: <IoSpeedometerOutline />
        },
        {
            key: 'calendar',
            text: 'Calendar',
            link: '/calendar',
            icon: <IoCalendarNumberOutline />
        },
        {
            key: 'finances',
            text: 'Finances',
            link: '/finances',
            icon: <IoWalletOutline />
        },
        {
            key: 'profile',
            text: 'Profile',
            link: '/profile',
            icon: <IoPersonOutline />
        },
        {
            key: 'logout',
            text: <LogoutButton />,
            link: '',
            icon: <IoLogOutOutline />
        }
    ]
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