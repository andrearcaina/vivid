'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Menu, UnAuthorized } from '@/components';
import { Capitalize } from '@/utils/helpers/capitalize';

export default function Dashboard() {
    const { role, authReady } = useAuthContext();
    
    if (authReady) {
        return <Menu role={Capitalize(role)} />;
    } else {
        return <UnAuthorized />;
    }
} 