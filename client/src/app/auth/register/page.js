'use client';
import { RegisterUser } from '@/utils/services';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";

export default function RegisterPage() {
    const router = useRouter();
    const { authReady } = useAuthContext();
    const { darkMode } = useDarkMode();
    
    if (authReady) {
        router.push('/dashboard');
    }

    const submitRegister = async (formData) => {
        const first = formData.get('firstname');
        const last = formData.get('lastname');
        const email = formData.get('email');
        const date = formData.get('date');
        const password = formData.get('password');
        const role = formData.get('role');

        if (!first && !last && !email && !date && !password) {
            toast.error("Please enter a valid first name, last name, email, date of birth, and password");
            return;
        } else if (!first || /\d/.test(first)) {
            toast.error("Please enter a valid first name");
            return;
        } else if (!last || /\d/.test(last)) {
            toast.error("Please enter a valid last name");
            return;
        } else if (!email) {
            toast.error("Please enter a valid email");
            return;
        } else if (!date) {
            toast.error("Please enter a valid date of birth");
            return;
        } else if (!password) {
            toast.error("Please enter a valid password");
            return;
        }

        try {
            const data = await RegisterUser(first, last, email, date, password, role);

            if (data.id) {
                toast.success("Successfully registered! Please go to login page.");
            } else {
                toast.error("Email already used! Use a different email address.");
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <main className={darkMode ? 'dark' : ''}>
            <div className="h-[80vh] flex flex-col items-center justify-center dark:bg-gray-900">
                <h1 className="text-3xl font-bold mb-4 dark:text-neutral-300">Register</h1>
                
                <form className="w-64" action={submitRegister}>
                    <label className="block mb-2 dark:text-neutral-300">
                        First Name:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="text" name="firstname" />
                    </label>

                    <label className="block mb-2 dark:text-neutral-300">
                        Last Name:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="text" name="lastname" />
                    </label>

                    <label className="block mb-2 dark:text-neutral-300">
                        Email:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="email" name="email" />
                    </label>
                    
                    <label className="block mb-2 dark:text-neutral-300">
                        Date of Birth:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="date" name="date" />
                    </label>

                    <label className="block mb-2 dark:text-neutral-300">
                        Password:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="password" name="password" />
                    </label>

                    <label className="block mb-2 dark:text-neutral-300">
                        Role:
                        <select className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" name="role">
                            <option value="member">Member</option>
                            <option value="treasurer">Treasurer</option>
                            <option value="coach">Coach</option>
                        </select>
                    </label>
                    
                    <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Register</button>
                </form>
            </div>
        </main>
    )
}