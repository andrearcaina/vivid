'use client';
import { useAuthContext } from "@/hooks/useAuthContext";
import { TreasurerDashboard, CoachDashboard, MemberDashboard, UnAuthorized } from "@/components";

export default function Dashboard() {
    const { role } = useAuthContext();
    
    if (role == "treasurer") {
        return <TreasurerDashboard />;
    } else if (role == "coach") {
        return <CoachDashboard />;
    } else if (role == "member") {
        return <MemberDashboard />;
    } else {
        return <UnAuthorized />;
    }
} 