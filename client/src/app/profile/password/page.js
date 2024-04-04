'use client';
import { UnAuthorized } from "@/components";
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from "@/hooks/useDarkModeContext";
import { createNewPassword } from "@/utils/createNewPassword";

export default function Password() {
    const { authReady } = useAuthContext();
    const { darkMode } = useDarkMode();

    const submitNewPassword = async (event) => {
        const formData = new FormData(event.target);
        if (formData.get('newPassword').length != 0) {
            if (formData.get('newPassword') == formData.get('checkNewPassword')){
                const oldPassword = formData.get('oldPassword');
                const newPassword = formData.get('newPassword');
                try {
                    const data = await createNewPassword(oldPassword, newPassword);
                    if (data.password) {
                        alert('Password change successfully!');
                    } else {
                        alert('Unable to create new password');
                    }
                } catch (err) {
                    console.error('Error:', err);
                }
            } else {
                alert("Passwords do not match");
            }
        } else {
            alert("Fields are empty");
        }
        
    }

    if (authReady) {
        return (
            <main className={darkMode ? 'dark' : ''}>
                <div className="flex flex-col w-full h-[77.4vh] overflow-hidden p-4 dark:bg-gray-900">
                    <section>
                        <h1 className="dark:text-neutral-300 text-3xl">Change Password</h1>
                    </section>
                    <div>
                        <p className="dark:text-neutral-300">Current Password</p>
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1" type='password' name='oldPassword' />
                    </div>
                    <form onSubmit={submitNewPassword}>
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