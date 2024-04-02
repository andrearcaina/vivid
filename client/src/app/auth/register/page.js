'use client';
import { RegisterUser } from "@/utils/registerUser";
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const { authReady } = useAuthContext();
    const { darkMode } = useDarkMode();
    
    if (authReady) {
        router.push('/dashboard');
    }

    const submitRegister = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const first = formData.get('firstname');
        const last = formData.get('lastname');
        const email = formData.get('email');
        const password = formData.get('password');
        const role = formData.get('role');

        try {
            const data = await RegisterUser(first, last, email, password, role);

            if (data.id) {
                alert('Successfully registered user!');
            } else {
                alert('Error registering user {user already exists}!');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    // we will make a form that basically registers a new user into the database
    // then we will redirect them to the login page with a message saying "successfully registered!"

    return (
        <div className={darkMode ? 'dark' : ''}>
            <main className="h-[80vh] flex flex-col items-center justify-center dark:bg-gray-900">
                <h1 className="text-3xl font-bold mb-4 dark:text-neutral-300">Register</h1>
                
                <form className="w-64" onSubmit={submitRegister}>
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
            </main>
        </div>
    )
}