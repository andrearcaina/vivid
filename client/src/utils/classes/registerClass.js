export async function RegisterClass(courseName, instructor, date) {
    try {
        // Need to add proper routing for the API
        const res = await fetch('http://127.0.0.1:8000/classes-offered/createclass/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                class_title: courseName,
                instructor_name: instructor,
                class_datetime: date
            }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}