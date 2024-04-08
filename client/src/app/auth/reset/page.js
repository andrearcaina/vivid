'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { resetPassword } from '@/utils/services';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const { authReady } = useAuthContext();
    const { darkMode } = useDarkMode();
    
    if (authReady) {
        router.push('/dashboard');
    }

    const submitLogin = async (formData) => { 
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (!email && !password && !confirmPassword) {
            toast.error("Please enter a valid email and password!");
            return;
        } else if (!email) {
            toast.error("Please enter a valid email!");
            return;
        } else if (!password) {
            toast.error("Please enter a valid password!");
            return;
        } else if (!confirmPassword) {
            toast.error("Please confirm your password!");
            return;
        } else if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await resetPassword(email, password, confirmPassword);
            if (res.detail) {
                toast.error("An error occurred where that email could not be found. Please try again.");
                return;
            }
            toast.success("Successfully reset password! Go to login page.");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className={darkMode ? 'dark' : ''}>
            <div className="h-[80vh] flex flex-col items-center justify-center dark:bg-gray-900">
                <h1 className="text-3xl font-bold mb-4 dark:text-neutral-300">Reset Password</h1>
                
                <form className="w-64" action={submitLogin}>
                    <label className="block mb-2 dark:text-neutral-300">
                        Email:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="email" name="email" />
                    </label>
                    
                    <label className="block mb-2 dark:text-neutral-300">
                        New password:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="password" name="password" />
                    </label>

                    <label className="block mb-2 dark:text-neutral-300">
                        Confirm new password:
                        <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="password" name="confirmPassword" />
                    </label>
                    
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Reset</button>
                </form>
            </div>
        </main>
    );
}