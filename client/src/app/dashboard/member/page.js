'use client';
import { Welcome } from '@/components';
import { useRedirect } from '@/hooks/useRedirect';

export default function MemberDashboard() {
    useRedirect('member');
    
    return (
        <div>
            <h1>Dashboard</h1>
            <Welcome />
        </div>
    );
}