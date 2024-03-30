'use server';

export async function fetchUserInfo() {
    try {
        const res = await fetch('http://l:8000/user-auth/user/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}
