'use client';
import { UnAuthorized } from "../../../components";
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useDarkMode } from "../../../hooks/useDarkModeContext";
import { createNewPassword } from "@/utils/settings";
import { toast } from 'react-hot-toast';

export default function Password() {
    const { logout, authReady } = useAuthContext();
    const { darkMode } = useDarkMode();

    const submitNewPassword = async (formData) => {
        const oldPassword = formData.get('oldPassword');
        const newPassword = formData.get('newPassword');
        const checkNewPassword = formData.get('checkNewPassword');
        
        if (!oldPassword && !newPassword && !checkNewPassword) {
            toast.error("Please enter valid inputs!");
            return;
        } else if (!oldPassword) {
            toast.error("Please enter a valid password!");
            return;
        } else if (!newPassword) {
            toast.error("Please enter a valid new password!");
            return;
        } else if (!checkNewPassword) {
            toast.error("Please confirm your new password!");
            return;
        } else if (oldPassword === newPassword) { 
            toast.error("New password cannot be the same as old password!");
            return;
        } else if (newPassword !== checkNewPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const data = await createNewPassword(oldPassword, newPassword);

            if (data.message) {
                toast.success("Successfully updated password!");
                logout();
            } else {
                toast.error("Unable to create new password.");
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    if (authReady) {
        return (
            <main className={darkMode ? 'dark' : ''}>
                <div className="flex flex-col w-full h-screen overflow-hidden p-4 dark:bg-gray-900 items-center">
                    <section>
                        <h1 className="dark:text-neutral-300 text-3xl">Change Password</h1>
                    </section>
                    <form action={submitNewPassword}>
                        <label className="block mb-2 mt-4 dark:text-neutral-300">
                            Current Password:
                            <br />
                            <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1" type='password' name="oldPassword" />
                        </label>
                        <label className="block mb-2 mt-4 dark:text-neutral-300">
                            New Password:
                            <br />
                            <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1" type="password" name="newPassword" />
                        </label>
                        <label className="block mb-2 dark:text-neutral-300">
                            Confirm New Password:
                            <br />
                            <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1" type="password" name="checkNewPassword" />
                        </label>
                        <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Update</button>
                    </form>
                </div>
            </main>
        );
    } else {
        return <UnAuthorized />
    }
}