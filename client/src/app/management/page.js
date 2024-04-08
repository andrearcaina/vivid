'use client';
import { useAuthContext } from "@/hooks/useAuthContext";
import { useDarkMode } from "@/hooks/useDarkModeContext";
import { convertTimestamp } from "@/utils/helpers/convertTime";
import { changeMembership } from '@/utils/logs/approveMember';
import { fetchMembers } from '@/utils/logs/fetchMemberData';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from "primereact/dropdown";
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';
import { UnAuthorized } from "@/components";

export default function Management() {
    const { role } = useAuthContext();
    const { darkMode } = useDarkMode();
    const [members, setMembers] = useState([]);
    
    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = async () => {
        const data = await fetchMembers();
        
        console.log(data)

        if (!data || data.error || data.detail) {
            console.error(data);
            return;
        }
        
        setMembers(data);
    }; 

    const onDropdownChange = async (rowData, value) => {
        let updatedMembers = [...members.members];
        let updatedMember = {...rowData};
        updatedMember.membership_approved = value;
        updatedMembers[rowData.id - 1] = updatedMember;
        setMembers({ members: updatedMembers });
        
        if (rowData.id) {
            const data = await changeMembership(value, rowData.id);
            if (!data || data.error || data.detail) {
                console.error(data);
                return;
            }
        }
    }

    const dropdownMenu = (rowData) => {
        return (
            <Dropdown
                className="w-full border border-gray-300"
                value={rowData.membership_approved}
                options={[{ label: 'True', value: true }, { label: 'False', value: false }]}
                onChange={(e) => onDropdownChange(rowData, e.value)}
                panelClassName="bg-white border border-gray-300"
            />
        );
    }

    if (role == "treasurer" || role == "coach") {
        return (
            <main className={darkMode ? "dark" : ""}>
                <div className=" dark:bg-gray-900 dark:text-neutral-300 p-4">
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
                        <Column field="membership_approved" header="Membership Approved" body={role == 'coach' ? dropdownMenu : null} style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                        <Column field="payment_status" header="Payment Status" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                        <Column field="attendance_count" header="Attendance Count" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>
                    </DataTable>
                </div>
            </main>
        );
    } else {
        return <UnAuthorized />;
    }
} 