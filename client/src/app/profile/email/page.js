'use client';
import { UnAuthorized } from "@/components";
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from "@/hooks/useDarkModeContext";
import { createNewEmail } from "@/utils/settings/createNewEmail";

export default function Password() {
    const { logout, authReady } = useAuthContext();
    const { darkMode } = useDarkMode();

    const submitNewEmail = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (formData.get('newEmail').length != 0) {
            if (formData.get('newEmail') === formData.get('checkNewEmail')){
                const new_email = formData.get('newEmail');
                try {
                    const data = await createNewEmail(new_email);
                    if (data.message === "Email updated successfully") {
                        alert('Email changed successfully!');
                        logout()
                    } else {
                        alert('Unable to create new email');
                    }
                } catch (err) {
                    console.error('Error:', err);
                }
            } else {
                alert("Emails do not match");
            }
        } else {
            alert("Fields are empty");
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
                        <form onSubmit={submitNewEmail}>
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