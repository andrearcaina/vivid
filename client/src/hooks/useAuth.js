import { useState, useEffect } from 'react';
import { fetchUserInfo } from '@/utils/fetchUserData';

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const userInfo = await fetchUserInfo();
                setIsLoggedIn(Object.keys(userInfo).length > 0);
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        }

        checkAuth();
    }, []);

    return { isLoggedIn, isLoading };
}