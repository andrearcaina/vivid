export async function resetPassword(email, password, confirmPassword) {
    try {
        const res = await fetch('http://127.0.0.1:8000/user-auth/reset/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}