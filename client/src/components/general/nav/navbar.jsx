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
    IoChatbubblesOutline,
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
            text: 'Dashboard',
            link: '/dashboard',
            icon: <IoSpeedometerOutline />
        },
        {
            text: 'Calendar',
            link: '/calendar',
            icon: <IoCalendarNumberOutline />
        },
        {
            text: 'Finances',
            link: '/finances',
            icon: <IoWalletOutline />
        },
        {
            text: 'Chat',
            link: '/chat',
            icon: <IoChatbubblesOutline />
        },
        {
            text: 'Profile',
            link: '/profile',
            icon: <IoPersonOutline />
        },
        {
            text: <LogoutButton />,
            link: '',
            icon: <IoLogOutOutline />
        }
    ];
}

const regularItems = () => {
    return [
        { text: 'Home', link: '/' },
        { text: 'Login', link: '/auth/login' },
        { text: 'Register', link: '/auth/register' }
    ];
}