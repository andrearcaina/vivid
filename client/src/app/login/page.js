'use client';
import { useState, useEffect } from 'react';

export default function LoginPage() {
    const [login, setLogin] = useState([]);

    useEffect(() => {
        Login();
    }, []);
    
    // this is just client side fetching (might change to server side maybe for less performance on client)
    const Login = async () => { 
        try {
            const response = await fetch('http://127.0.0.1:8000/user-auth/login');
            const data = await response.json();
            setLogin(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    // we have to make a form basically that only sends the data to the server when entered
    // the user will either go into two pages: their actual screen meant for them (member/treasurer/coach)
    // or they will say they are not in the database, so they will be redirected to the register page

    return (
        <main>
            {JSON.stringify(login)}
        </main>
    );
}