'use client';
import { UnAuthorized } from '../../../components';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useDarkMode } from '../../../hooks/useDarkModeContext';
import { createNewEmail } from '@/utils/settings';
import { toast } from 'react-hot-toast';

export default function Password() {
    const { logout, authReady } = useAuthContext();
    const { darkMode } = useDarkMode();

    const submitNewEmail = async (formData) => {
        const newEmail = formData.get('newEmail');
        const checkNewEmail = formData.get('checkNewEmail');
        
        if (!newEmail && !checkNewEmail) {
            toast.error("Please enter a valid email address and confirm your email address!");
            return;
        } else if (!newEmail) {
            toast.error("Please enter a valid email address!");
            return;
        } else if (!checkNewEmail) {
            toast.error("Please confirm your email address!");
            return;
        } else if (newEmail !== checkNewEmail) {
            toast.error("Emails do not match!");
            return;
        }

        try {
            const data = await createNewEmail(newEmail);

            if (data.message) {
                toast.success("Successfully updated email!");
                logout();
            } else {
                toast.error("Unable to create email.");
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    if (authReady) {
        return (
            <main className={darkMode ? 'dark' : ''}>
                <div className="flex flex-col w-full h-screen overflow-hidden p-4 dark:bg-gray-900 items-center">
                    <div>
                        <section>
                            <h1 className="dark:text-neutral-300 text-3xl text-left">Change Email</h1>
                        </section>
                        <form action={submitNewEmail}>
                            <label className="block mb-2 mt-4 dark:text-neutral-300">
                                New Email:
                                <br />
                                <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1" type="email" name="newEmail" />
                            </label>
                            <label className="block mb-2 dark:text-neutral-300">
                                Confirm New Email:
                                <br />
                                <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1" type="email" name="checkNewEmail" />
                            </label>
                            <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </main>
        );
    } else {
        return <UnAuthorized />
    }
}