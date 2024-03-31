// this hook is used to check which dashboard the user should be redirected to
// if the user is not logged in, then they will be redirected to the login page
// if the user is logged in, then they will be redirected to the dashboard that is meant for them
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './useAuthContext';

export function useRedirect(expectedRole) {
    const router = useRouter();
    const { user, role, authReady } = useAuthContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (authReady) {
                if (user === null) {
                    router.push('/auth/login');
                } else if (role !== expectedRole) {
                    router.push(`/dashboard/${role}`);
                }
            } else {
                router.push('/auth/login');
            }
        }, 800); // Wait for 0.8 second

        return () => clearTimeout(timer);
    }, [user, role, authReady]);
}