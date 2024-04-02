'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchJWT } from '@/utils/fetchLoginCookie';
import { deleteCookie } from '@/utils/deleteCookie';
import { fetchUserInfo } from '@/utils/fetchUserData';

export const AuthContext = createContext({
    user: null,
    role: '',
    authReady: false,
    login: () => { },
    logout: () => { }
});

export const AuthContextProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [authReady, setAuthReady] = useState(false);

    const login = async (email, password) => {
        // fetch the JWT from the server
        // fetch the user data from the server
        // set the user data in the state
        try {
            const resp = await fetchJWT(email, password);
        
            if (resp.jwt != undefined || resp.jwt != null) {
                const data = await fetchUserInfo();
                setUser(data);
                setRole(data.role);
                setAuthReady(true);

                router.push('/dashboard/');
            } else {
                setUser(null);
                setRole('');
                setAuthReady(false);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {
        // remove the JWT from the server
        // remove the user data from the state
        try {
            const resp = await deleteCookie();
        
            if (resp != undefined || resp != null) {
                setUser(null);
                setRole('');
                setAuthReady(false);
            
                router.push('/');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const checkSession = async () => {
        // check if the user is logged in
        // if the user is logged in, then fetch the user data
        // set the user data in the state
        try {
            const data = await fetchUserInfo();

            console.log(data);

            if (data.detail) {
                setUser(null);
                setRole('');
                setAuthReady(false);
                return;
            }

            setUser(data);
            setRole(data.role);
            setAuthReady(true);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        checkSession();
        console.log("User:", user);
        console.log("Role:", role);
        console.log("AuthReady:", authReady);
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, authReady, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}