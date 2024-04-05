export async function createNewEmail(new_email) {
    console.log(old_password);
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