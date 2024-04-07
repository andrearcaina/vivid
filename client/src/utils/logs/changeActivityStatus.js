export async function changeActivity(value, id) {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/activity/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                active: value
            })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}