'use client';
import { useRedirect } from '@/hooks/useRedirect';
import { Menu, Welcome } from '@/components';

export default function MemberDashboard() {
    useRedirect('member');
    
    return (
        <main>
            <Menu />
        </main>
    );
}