export async function fetchChatHistory() {
    try {
        const res = await fetch('http://127.0.0.1:8000/chat-channels/rooms/club/', {
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