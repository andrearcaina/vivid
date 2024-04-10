import { useDarkMode } from '@/hooks/useDarkModeContext';
import { CustomDropdown, CustomButton } from '@/components';
import { convertTimestamp } from '@/utils/helpers';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DataTableVisualization({ ...props }) {
    const darkMode = useDarkMode();
    const { data, view, role, setMembers } = props;    

    return (
        <DataTable
            value={data.members}
            className="w-full text-center"
            paginator
            rows={20}
            style={{ borderCollapse: 'separate', borderSpacing: '0' }}
            tableStyle={{ minWidth: '40rem' }}
        >
            {view != "salaries" && <Column field="user.first_name" header="First Name" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>}
            {view != "salaries" && <Column field="user.last_name" header="Last Name" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>}
            {view == "default" && <Column field="user.date_of_birth" header="Date of Birth" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>}
            {view == "default" && <Column field="user.email" header="Email" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>}
            {view == "default" && <Column field="user.date_joined" header="Date Joined Club" sortable body={(rowData) => convertTimestamp(rowData.user.date_joined)} style={{ border: darkMode ? '1px solid lightgray' : '1px solid black',padding: '10px' }}></Column>}
            {view == "default" && <Column field="membership_approved" header="Membership Approved" body={role == 'coach' ? (rowData) => <CustomDropdown rowData={rowData} type="approval" members={data} setMembers={setMembers} /> : (rowData) => rowData.membership_approved ? 'Approved' : 'Disapproved'} style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>}
            {view != "salaries" && <Column field="payment_status" header="Payment Status" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>}
            {view == "payments" && <Column field="advance_payments" header="Prepaid Fees" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>}
            {view == "default" && <Column field="attendance_count" header="Attendance Count" sortable style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>}
            {view == "default" && <Column field="user.is_active" body={role == 'treasurer' ? (rowData) => <CustomDropdown rowData={rowData} type="status" members={data} setMembers={setMembers} /> : (rowData) => rowData.user.is_active ? 'Active' : 'Inactive'} header="Account Activity Status" style ={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column>}
            {(view == "default" && role == 'coach') ? <Column body={(rowData) => <CustomButton rowData={rowData} type="Remove" members={data} setMembers={setMembers} />} header="Remove Member" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column> : (view == "default" && role == 'coach') ? <Column body={(rowData) => <CustomButton rowData={rowData} type="Reset" members={data} setMembers={setMembers} />} header="Reset Password" style={{ border: darkMode ? '1px solid lightgray' : '1px solid black', padding: '10px' }}></Column> : null}
        </DataTable>
    );
}