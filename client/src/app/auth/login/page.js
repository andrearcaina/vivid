'use client';
import { useRouter } from 'next/navigation';
import { fetchUserInfo } from '@/utils/fetchUserData';
import { fetchJWT } from '@/utils/fetchLoginCookie';

export default function LoginPage() {
    const router = useRouter();

    const submitLogin = async (event) => { 
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const data = await fetchJWT(email, password);
            
            if (data.jwt) {
                const userData = await fetchUserInfo();
                router.push(`../dashboard/${userData.role}`);
            } else {
                // fix this later
                return (
                    <div>
                        <p>Invalid login</p>
                    </div>
                )
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // we have to make a form basically that only sends the data to the server when entered
    // the user will either go into two pages: their actual screen meant for them (member/treasurer/coach)
    // or they will say they are not in the database, so they will be redirected to the register page

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            
            <form className="w-64" onSubmit={submitLogin}>
                <label className="block mb-2">
                    Email:
                    <input className="border border-gray-300 rounded-md px-2 py-1 w-full" type="email" name="email" />
                </label>
                
                <label className="block mb-2">
                    Password:
                    <input className="border border-gray-300 rounded-md px-2 py-1 w-full" type="password" name="password" />
                </label>
                
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
            </form>
        </main>
    );
}