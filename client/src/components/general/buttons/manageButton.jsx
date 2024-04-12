import { adminResetPassword, resetBalance, revokeMembership, countClasses } from '@/utils/logs';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CustomButton({ ...props }) {
    const { rowData, type, members, setMembers } = props;
    
    const DeleteRow = async (rowData) => {
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

    const ResetPassword = async (rowData) => {
        const data = await adminResetPassword(rowData.id);
        if (!data || data.error || data.detail) {
            console.error(data);
            return;
        } else {
            toast.success(`Password reset for ${rowData.user.first_name} ${rowData.user.last_name}!`);
        }
    }
    
    const ResetBalance = async (rowData) => {
        let updatedMembers = members.members.map(member => {
            if (member.id === rowData.id) {
                member.payment_balance = 0;
            }
            return member;
        });
        setMembers({ members: updatedMembers });
        
        const data = await resetBalance(rowData.id);
        if (!data || data.error || data.detail) {
            console.error(data);
            return;
        } else {
            toast.success(`Balance reset for ${rowData.user.first_name} ${rowData.user.last_name}!`);
        }
    }

    const updateClassesTeaching = async (rowData) => {
        const data = await countClasses(rowData.id);
        if (!data || data.error || data.detail) {
            console.error(data);
            return;
        } else {
            toast.success(`Classes counted for ${rowData.user.first_name} ${rowData.user.last_name}!`);
        }

        let updatedMembers = members.members.map(member => {
            if (member.id === rowData.id) {
                member.number_classes_taught = data.count;
                member.payment_balance = data.payment;
            }
            return member;
        });
        setMembers({ members: updatedMembers });
    }

    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    }

    const handleConfirm = () => {
        if (type === "Remove") {
            DeleteRow(rowData);
        } else if (type === "ResetPassword") {
            ResetPassword(rowData);
        } else if (type === "ResetBalance") {
            ResetBalance(rowData);
        } else if (type == "Count") {
            updateClassesTeaching(rowData);
        }
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    return (
        <>
            {showModal && (
                <div className="z-[100] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-black bg-white p-4 rounded-md">
                        <div>{`Are you sure you want to ${type === "Remove" ? "remove" : type === "ResetPassword" ? "reset" : type === "Count" ? "count" : "reset"}?`}</div>
                        
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
                {type === "Remove" ? "Remove" : type === "ResetPassword" ? "Reset" : type === "Count" ? "Count" : "Reset"}
            </button>
        </>
    )
}