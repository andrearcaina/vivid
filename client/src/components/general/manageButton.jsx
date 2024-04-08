import { useState } from 'react';
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
    
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    }

    const handleConfirm = () => {
        if (type === "Remove") {
            deleteRow(rowData);
        } else {
            resetPassword(rowData);
        }
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    return (
        <>
            {showModal && (
                <div className="z-[99999999999999999999999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-black bg-white p-4 rounded-md">
                        <div>{`Are you sure you want to ${type.toLowerCase()}?`}</div>
                        
                        <div className="flex justify-end mt-4">
                            <button className="text-black mr-2 bg-green-300 hover:bg-green-600 transition-all duration-300 rounded-md px-[0.25rem] py-[0.125rem]" onClick={handleConfirm}>
                                Yes
                            </button>
                            
                            <button className="text-black bg-red-300 hover:bg-red-600 transition-all duration-300 rounded-md px-[0.25rem] py-[0.125rem]" onClick={handleCancel}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleButtonClick()}>
                {type}
            </button>
        </>
    )
}