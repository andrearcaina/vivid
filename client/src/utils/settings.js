export async function createNewEmail(new_email) {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/profile/email/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                new_email: new_email
            }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

export async function createNewPassword(old_password, new_password) {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/profile/password/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                old_password: old_password,
                new_password: new_password
            }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}