'use client';
import { useAuthContext } from "@/hooks/useAuthContext";
import { Menu, UnAuthorized } from "@/components";

export default function Dashboard() {
    const { role, authReady } = useAuthContext();
    
    if (authReady) {
        return <Menu role={role[0].toUpperCase()+role.slice(1)} />;
    } else {
        return <UnAuthorized />;
    }
} 