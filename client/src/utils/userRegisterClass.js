export async function UserRegisterClass(courseName, userName) {
    try {
        // Need to add proper routing for the API
        const res = await fetch('http://127.0.0.1:8000/user-auth/register/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                class_title: courseName,
                // Need to add code to append userName to participants list
            }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}