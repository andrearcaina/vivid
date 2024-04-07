'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const { authReady, login } = useAuthContext();
    const { darkMode } = useDarkMode();
    
    if (authReady) {
        router.push('/dashboard');
    }

    const submitLogin = async (formData) => { 
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email && !password) {
            toast.error("Please enter a valid email and password!");
            return;
        } else if (!email) {
            toast.error("Please enter a valid email!");
            return;
        } else if (!password) {
            toast.error("Please enter a valid password!");
            return;
        }

        try {
            login(email, password);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // we have to make a form basically that only sends the data to the server when entered
    // the user will either go into two pages: their actual screen meant for them (member/treasurer/coach)
    // or they will say they are not in the database, so they will be alerted and then redirected to the register page

    return (
        <div className={darkMode ? 'dark' : ''}>
            <main className="h-[80vh] flex flex-col items-center justify-center dark:bg-gray-900">
                <h1 className="text-3xl font-bold mb-4 dark:text-neutral-300">Login</h1>
                
                <form className="w-64" action={submitLogin}>
                    <label className="block mb-2 dark:text-neutral-300">
                        Email:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="email" name="email" />
                    </label>
                    
                    <label className="block mb-2 dark:text-neutral-300">
                        Password:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="password" name="password" />
                    </label>
                    
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
                </form>
            </main>
        </div>
    );
}