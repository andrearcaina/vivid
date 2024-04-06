export async function fetchClassesOffered() {
    try {
        const res = await fetch('http://127.0.0.1:8000/classes-offered/showavailableclasses/', {
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