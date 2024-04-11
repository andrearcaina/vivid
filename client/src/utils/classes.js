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

export async function fetchMemberEnrolledClasses() {
    try {
        const res = await fetch('http://127.0.0.1:8000/classes-offered/usershowclasses/', {
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

export async function RegisterClass(courseName, instructor, date) {
    try {
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

export async function UserRegisterClass(courseName) {
    try {
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

export async function getCoachClasses() {
    try {
        const res = await fetch('http://127.0.0.1:8000/classes-offered/coachshowclasses/', {
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