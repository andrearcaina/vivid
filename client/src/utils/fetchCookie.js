'use server';

export async function fetchLoginCookie(email, password) {
    try {
        const res = await fetch('http://localhost:8000/user-auth/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}