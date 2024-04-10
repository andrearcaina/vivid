'use client';
import { UnAuthorized } from '@/components';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { useState, useEffect } from 'react';
import { fetchMembers } from '@/utils/logs';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PaymentChart } from '@/components';

export default function Finances() {
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

    if (authReady && activated && (role == "treasurer")) {
        return (
            <main className={darkMode ? "dark" : ""}>
                <div className="min-h-[92.5vh] dark:bg-gray-900 dark:text-neutral-300 p-4">
                    <h1 className="text-center text-3xl py-5">Club Finances</h1>
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
                        <div className="m-2 w-full rounded-md overflow-hidden shadow-md bg-white p-4 dark:bg-gray-600">
                            <h1>Member Payments</h1>
                            <DataTable value={members.members} tableStyle={{ minWidth: '40rem' }}>
                                <Column field="user.first_name" header="First Name" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                                <Column field="user.last_name" header="Last Name" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>
                                <Column field="payment_status" header="Payment Status" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                                <Column field="advance_payments" header="Prepaid Fees" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                            </DataTable>
                        </div>
                        <div className="m-2 w-full rounded-md overflow-hidden shadow-md bg-white p-4 dark:bg-gray-600">
                            <h1>Coach Salaries</h1>
                            <DataTable value={members.members} tableStyle={{ minWidth: '40rem' }}>
                                <Column field="user.first_name" header="First Name" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                                <Column field="user.last_name" header="Last Name" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>
                                <Column field="payment_balance" header="Payment Balance" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                                <Column field="number_classes_taught" header="Classes Taught This Month" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>
                            </DataTable>
                        </div>
                        <div className="m-2 w-full rounded-md overflow-hidden shadow-md bg-white p-4 dark:bg-gray-600">
                            <h1>Operational Costs</h1>
                            <p>Costs for this month. Includes rent/utilities and total coach salaries</p>
                        </div>
                        <div className="m-2 w-full rounded-md overflow-hidden shadow-md bg-white p-4 dark:bg-gray-600">
                            <h1>Payment Histories</h1>
                            <PaymentChart />
                        </div>
                    </section>
                </div>
            </main>
        );
    } else {
        return <UnAuthorized />;
    }
}