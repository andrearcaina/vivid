'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Welcome } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useCorrectDashboard } from '@/hooks/useCorrectDashboard';

export default function MemberDashboard() {
    const router = useRouter();
    const { isLoggedIn, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push('/auth/login');
        }
    }, [isLoading, isLoggedIn]);

    useCorrectDashboard('member');

    return (
        <div>
            <h1>Dashboard</h1>
            <Welcome />
        </div>
    );
}