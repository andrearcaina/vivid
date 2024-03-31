'use client';
import { Welcome } from '@/components';
import { useRedirect } from '@/hooks/useRedirect';

export default function TreasurerDashboard() {
    useRedirect('treasurer');

    return (
        <div>
            <h1>Dashboard</h1>
            <Welcome />
        </div>
    );
}
