import { useRouter } from 'next/navigation';
import { fetchUserInfo } from '@/utils/fetchUserData';

export function useCorrectDashboard(expectedRole) {
    const router = useRouter();
    
    const correctRole = async () => {
        const data = await fetchUserInfo();
        if (data.role != expectedRole) {
            router.push(`/dashboard/${data.role}`);
        }
    }

    correctRole();
}