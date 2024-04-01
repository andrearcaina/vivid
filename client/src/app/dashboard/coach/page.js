'use client';
import { useRedirect } from '@/hooks/useRedirect';
import { Menu, Welcome } from '@/components';

export default function CoachDashboard() {
    useRedirect('coach');

    return (
        <main>
            <Menu />
            <Welcome />
        </main>
    );
}