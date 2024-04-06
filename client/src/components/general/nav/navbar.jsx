import { useAuthContext } from '@/hooks/useAuthContext';
import { NavDashboard } from './nav-dashboard';
import { NavGeneral } from './nav-general';
import { LogoutButton } from './logoutButton';
import { 
    IoSpeedometerOutline,
    IoCalendarNumberOutline,
    IoWalletOutline,
    IoPersonOutline,
    IoChatbubblesOutline,
    IoLogOutOutline,
} from 'react-icons/io5';
import { MdOutlineManageAccounts } from 'react-icons/md';

export default function Navbar() {
    const { authReady, role } = useAuthContext();
    const navItems = authReady ? roleItems(role) : regularItems();

    if (authReady) {
        return <NavDashboard links={navItems} />;
    } else {
        return <NavGeneral links={navItems} />;
    }
}

const dashboardItems = () => {
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
    ]
}

const defaultItems = () => {
    return [
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

const roleItems = (role) => {
    if (role == "member") {
        return [
            ...dashboardItems(),
            ...defaultItems()
        ]
    } else if (role == "coach") {
        return [
            ...dashboardItems(),
            {
                text: 'Management',
                link: '/management',
                icon: <MdOutlineManageAccounts />
            },
            ...defaultItems()
        ];
    } else if (role == "treasurer") {
        return [
            ...dashboardItems(),
            {
                text: 'Management',
                link: '/management',
                icon: <MdOutlineManageAccounts />
            },
            {
                text: 'Finances',
                link: '/finances',
                icon: <IoWalletOutline />
            },
            ...defaultItems()
        ];
    }
}

const regularItems = () => {
    return [
        { text: 'Home', link: '/' },
        { text: 'Login', link: '/auth/login' },
        { text: 'Register', link: '/auth/register' }
    ];
}