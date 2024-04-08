'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Menu, UnAuthorized, Deactivated } from '@/components';
import { Capitalize } from '@/utils/helpers';

export default function Dashboard() {
    const { role, authReady, activated } = useAuthContext();
    
    if (authReady && activated) {
        return <Menu role={Capitalize(role)} />;
    } else if (role == 'member' && !activated) {
        return <Deactivated />;
    } else {
        return <UnAuthorized />;
    }
} 