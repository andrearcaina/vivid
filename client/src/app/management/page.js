'use client';
import { UnAuthorized, CustomDropdown, CustomButton } from '@/components';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { convertTimestamp } from '@/utils/helpers/convertTime';
import { fetchMembers } from '@/utils/logs/fetchMemberData';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';

export default function Management() {
    const { authReady, role, activated } = useAuthContext();
    const { darkMode } = useDarkMode();
    const [members, setMembers] = useState([]);
    
    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = async () => {
        const data = await fetchMembers();    
        setMembers(data);
    }; 

    if (authReady && activated && (role == "treasurer" || role == "coach")) {
        return (
            <main className={darkMode ? "dark" : ""}>
                <div className="min-h-[92.5vh] dark:bg-gray-900 dark:text-neutral-300 p-4">
                    <h1 className="text-center text-3xl py-5">All Members</h1>
                    
                    <DataTable
                        value={members.members}
                        className="w-full text-center"
                        paginator
                        rows={20}
                        style={{ borderCollapse: 'separate', borderSpacing: '0' }}
                    >
                        <Column field="user.first_name" header="First Name" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                        <Column field="user.last_name" header="Last Name" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>
                        <Column field="user.date_of_birth" header="Date of Birth" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>
                        <Column field="user.email" header="Email" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>
                        <Column field="user.date_joined" header="Date Joined Club" sortable body={(rowData) => convertTimestamp(rowData.user.date_joined)} style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>
                        <Column field="membership_approved" header="Membership Approved" body={role == 'coach' ? (rowData) => <CustomDropdown rowData={rowData} type="approval" members={members} setMembers={setMembers} /> : (rowData) => rowData.membership_approved ? 'Approved' : 'Disapproved'} style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                        <Column field="payment_status" header="Payment Status" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                        <Column field="attendance_count" header="Attendance Count" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                        <Column field="user.is_active" body={role == 'treasurer' ? (rowData) => <CustomDropdown rowData={rowData} type="status" members={members} setMembers={setMembers} /> : (rowData) => rowData.user.is_active ? 'Active' : 'Inactive'} header="Account Activity Status" style ={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                        {role == 'coach' ? <Column body={(rowData) => <CustomButton rowData={rowData} type="Remove" members={members} setMembers={setMembers} />} header="Remove Member" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column> : <Column body={(rowData) => <CustomButton rowData={rowData} type="Reset" members={members} setMembers={setMembers} />} header="Reset Password" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>}
                    </DataTable>
                </div>
            </main>
        );
    } else {
        return <UnAuthorized />;
    }
} 