import { useState, useEffect } from 'react';
import { NavMobile } from './nav-mobile';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserInfo } from '@/utils/fetchUserData';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const {isLoggedIn, isLoading} = useAuth();
    const [navItems, setNavItems] = useState([
        { name: 'Login', link: '/auth/login' },
        { name: 'Register', link: '/auth/register' }
    ]);

    const getNavItems = async () => {
        try {
            const userInfo = await fetchUserInfo();
            if (userInfo.role) {
                setNavItems([
                    { name: 'Dashboard', link: `/dashboard/${userInfo.role}` },
                    { name: 'Log Out', link: '/logout' }
                ]);
            } else {
                setNavItems([
                    { name: 'Login', link: '/auth/login' },
                    { name: 'Register', link: '/auth/register' }
                ]);
            }
        } catch (err) {
            console.error(err);
            // Set default nav items if fetching user info fails
            setNavItems([
                { name: 'Login', link: '/auth/login' },
                { name: 'Register', link: '/auth/register' }
            ]);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/user-auth/logout/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            getNavItems();
        } else {
            setNavItems([
                { name: 'Login', link: '/auth/login' },
                { name: 'Register', link: '/auth/register' }
            ]);
        }
    }, [isLoggedIn, isLoading]);

    return (
        <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
                <div className="flex items-center">
                    <Link href="/">
                        <p className="flex items-center space-x-2 text-black">
                            <Image src="/images/icon.ico" alt="Logo" width={80} height={80} className="rounded-md logo-image" />
                            <span className="font-semibold text-2xl lg:text-3xl">Vivid</span>
                        </p>
                    </Link>
                </div>

                <div className="hidden lg:flex lg:items-center lg:w-auto">
                    <div className="flex flex-col lg:flex-row lg:space-x-4">
                        <Link href="/">
                            <p className="text-black text-xl hover:text-green-500 transition-colors duration-200">Home</p>
                        </Link>
                        
                        {navItems.map((navItem, index) => {
                            if (navItem.name !== 'Log Out') {
                                return (
                                    <Link href={navItem.link} key={index}>
                                        <p className="text-black text-xl hover:text-green-500 transition-colors duration-200">{navItem.name}</p>
                                    </Link>
                                )
                            }

                            return (
                                <Link href="/" key={index}>
                                    <p className="text-black text-xl hover:text-green-500 transition-colors duration-200 cursor-pointer" key={index} onClick={handleLogout}>{navItem.name}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <NavMobile links={navItems} />
            </div>
        </nav>
    );
}