import { useState } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';

export const LogoutButton = () => {
    const { logout } = useAuthContext();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        setShowModal(true);
    }

    const handleConfirmLogout = () => {
        logout();
        setShowModal(false);
    }

    const handleCancelLogout = () => {
        setShowModal(false);
    }

    return (
        <main>
            {showModal && (
                <div className="z-[99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-black bg-white p-4 rounded-md">
                        <div>Are you sure you want to logout?</div>
                        
                        <div className="flex justify-end mt-4">
                            <button className="text-black mr-2 bg-green-300 hover:bg-green-600 transition-all duration-300 rounded-md px-[0.25rem] py-[0.125rem]" onClick={handleConfirmLogout}>
                                Yes
                            </button>
                            
                            <button className="text-black bg-red-300 hover:bg-red-600 transition-all duration-300 rounded-md px-[0.25rem] py-[0.125rem]" onClick={handleCancelLogout}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={handleLogout}>
                Logout
            </button>
        </main>
    )
}