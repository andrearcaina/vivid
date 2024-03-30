'use client';
import { useRouter } from 'next/navigation';
import { Welcome } from '@/components';
import { fetchUserInfo } from '@/utils/fetchUserData';

export default function CoachDashboard() {
    const router = useRouter();

    const correctID = async () => {
        const data = await fetchUserInfo();
        if (data.role !== 'coach') {
            router.push(`/dashboard/${data.role}`);
        }
    }

    correctID();

    return (
        <div>
            <h1>Dashboard</h1>
            <Welcome />
        </div>
    );
}