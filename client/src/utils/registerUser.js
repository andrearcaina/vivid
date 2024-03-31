export async function RegisterUser(first, last, email, password, role) {
    try {
        const res = await fetch('http://127.0.0.1:8000/user-auth/register/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: first,
                last_name: last,
                email: email,
                password: password,
                role: role
            }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}