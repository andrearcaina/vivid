export function joinWebSocket(room) {
    return new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room}/`);
}

export function listenSocket(setMessage) {
    return (e) => {
        const data = JSON.parse(e.data);
        setMessage((prev) => [...prev, {
            title: data.title,
            first_name: data.first_name,
            last_name: data.last_name,
            content: data.message,
            timestamp: new Date().toISOString(),
        }]);
    };
}

export async function sendMessage(socket, message, title, timestamp) {
    try {
        socket.send(JSON.stringify({ message: message, title: title, timestamp: timestamp }));
    } catch (err) {
        console.error(err);
    }
}

export async function fetchChatHistory(room) {
    try {
        const res = await fetch(`http://127.0.0.1:8000/chat-channels/rooms/${room}/`, {
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