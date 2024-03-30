'use client';
import { useRouter } from 'next/navigation';
import { Welcome } from '@/components';
import { fetchUserInfo } from '@/utils/fetchUserData';

export default function MemberDashboard() {
    const router = useRouter();

    const correctID = async () => {
        const data = await fetchUserInfo();
        if (data.role !== 'member') {
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