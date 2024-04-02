'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { UnAuthorized } from '@/components';

export default function Profile() {
    const { authReady } = useAuthContext();

    if (authReady) {
        return (
            <main className="h-[80vh]">
                Profile Page
            </main>
        );
    } else {
        return <UnAuthorized />;
    }
}