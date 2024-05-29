'use client';
import { UnAuthorized, DataTableVisualization } from '@/components';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { getMembers } from '@/utils/logs';
import { useState, useEffect } from 'react';

export default function Management() {
    const { authReady, role, activated } = useAuthContext();
    const { darkMode } = useDarkMode();
    const [members, setMembers] = useState([]);
    
    useEffect(() => {
        getMembers(setMembers);
    }, []);

    if (authReady && activated && (role == "treasurer" || role == "coach")) {
        return (
            <main className={darkMode ? "dark" : ""}>
                <div className="min-h-[92.5vh] dark:bg-gray-900 dark:text-neutral-300 p-4">
                    <h1 className="text-center text-3xl py-5">All Members</h1>
                    
                    <DataTableVisualization data={members} view="default" role={role} setMembers={setMembers} />
                </div>
            </main>
        );
    } else {
        return <UnAuthorized />;
    }
} 