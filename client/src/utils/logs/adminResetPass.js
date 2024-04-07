export async function adminResetPassword(id) {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/reset/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}