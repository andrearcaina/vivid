'use client';
import { useState, useEffect } from "react";

export default function RegisterPage() {
    const [register, setRegister] = useState([]);

    useEffect(() => {
        Register();
    }, []);

    const Register = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/user-auth/register")
            const data = await response.json();
            setRegister(data);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    // we will make a form that basically registers a new user into the database
    // then we will redirect them to the login page with a message saying "successfully registered!"

    return (
        <main>
            {JSON.stringify(register)}
        </main>
    )
}