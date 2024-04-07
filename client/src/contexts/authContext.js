'use client';
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchJWT } from '@/utils/userAuth/fetchLoginCookie';
import { deleteCookie } from '@/utils/userAuth/deleteCookie';
import { fetchUserInfo } from '@/utils/userAuth/fetchUserData';
import { Approval } from '@/utils/userAuth/membershipApproval';
import toast from 'react-hot-toast';

export const AuthContext = createContext({
    user: null,
    role: '',
    authReady: false,
    activated: true,
    approved: false,
    login: () => { },
    logout: () => { }
});

export const AuthContextProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [activated, setActivated] = useState(true);
    const [approved, setApproved] = useState(false);
    const [authReady, setAuthReady] = useState(false);

    const login = async (email, password) => {
        try {
            const resp = await fetchJWT(email, password);
        
            if (resp.jwt != undefined || resp.jwt != null) {
                const data = await fetchUserInfo();

                setUser(data);
                setRole(data.role);
                setAuthReady(true);

                if (data.role == 'member') {
                    const approval = await Approval();

                    if (!approval.approved) {
                        setApproved(false);

                        toast.error('Membership not approved! Please contact your treasurer or coach.');
                        await deleteCookie();
                        
                        setUser(null);
                        setRole('');
                        setAuthReady(false);
                        
                        router.push('/auth/approval/');
                        return;
                    } 

                    setActivated(data.is_active);

                    if (!data.is_active) {
                        toast.error('Account not activated! Please contact the treasurer.');
                        return;
                    }
                }

                router.push('/dashboard/');
                toast.success('Successfully logged in!');
            } else {
                setUser(null);
                setRole('');
                setAuthReady(false);
                
                toast.error('Invalid email or password! Please try again.');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {
        try {
            await deleteCookie();
        
            setUser(null);
            setRole('');
            setAuthReady(false);
            
            router.push('/');
            toast.success('Successfully logged out!');
        } catch (err) {
            console.error(err);
        }
    }

    const checkSession = async () => {
        try {
            const data = await fetchUserInfo();

            if (data.detail) {
                setUser(null);
                setRole('');
                setAuthReady(false);
                return;
            } else {
                setUser(data);
                setRole(data.role);
                setAuthReady(true);

                if (data.role == 'member') {
                    setActivated(data.is_active);

                    if (!data.is_active) {
                        toast.error('Account not activated! Please contact your treasurer.');
                        return;
                    }
                }

                toast.success('Session restored.');
                return;
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, authReady, activated, approved, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}