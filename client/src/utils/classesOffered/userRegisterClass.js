export async function UserRegisterClass(courseName) {
    try {
        // Need to add proper routing for the API
        const res = await fetch('http://127.0.0.1:8000/classes-offered/joinclass/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                class_title: courseName
            }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}