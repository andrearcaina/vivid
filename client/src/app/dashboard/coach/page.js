'use client';
import { Welcome } from '@/components';
import { useRedirect } from '@/hooks/useRedirect';

export default function CoachDashboard() {
    useRedirect('coach');

    return (
        <div>
            <h1>Dashboard</h1>
            <Welcome />
        </div>
    );
}