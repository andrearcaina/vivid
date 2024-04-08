export async function Approval() {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/approval/', {
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