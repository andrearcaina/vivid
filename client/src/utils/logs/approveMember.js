export async function changeMembership(value, id) {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/approve/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                membership_approved: value
            })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}