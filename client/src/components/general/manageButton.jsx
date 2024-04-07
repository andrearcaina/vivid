import { adminResetPassword } from '@/utils/logs/adminResetPass';
import { revokeMembership } from '@/utils/logs/deleteMember';
import toast from 'react-hot-toast';

export default function CustomButton({ ...props }) {
    const { rowData, type, members, setMembers } = props;
    
    const deleteRow = async (rowData) => {
        let updatedMembers = members.members.filter(member => member.id !== rowData.id);
        setMembers({ members: updatedMembers });
        
        if (rowData.id) {
            const first_name = rowData.user.first_name;
            const last_name = rowData.user.last_name;

            const data = await revokeMembership(rowData.id);
            if (!data || data.error || data.detail) {
                console.error(data);
                return;
            } else {
                toast.success(`Membership revoked for ${first_name} ${last_name}!`);
            }
        }
    }

    const resetPassword = async (rowData) => {
        const data = await adminResetPassword(rowData.id);
        if (!data || data.error || data.detail) {
            console.error(data);
            return;
        } else {
            toast.success(`Password reset for ${rowData.user.first_name} ${rowData.user.last_name}!`);
        }
    }
    
    return (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => type === "Remove" ? deleteRow(rowData) : resetPassword(rowData) }>
            {type}
        </button>
    )
}