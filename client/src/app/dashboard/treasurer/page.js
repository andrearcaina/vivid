'use client';
import { useRedirect } from '@/hooks/useRedirect';
import { Menu, Welcome } from '@/components';

export default function TreasurerDashboard() {
    useRedirect('treasurer');

    return (
        <main>
            <Menu />
            <Welcome />
        </main>
    );
}
