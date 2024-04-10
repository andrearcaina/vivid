export async function adminResetPassword(id) {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/reset/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

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

export async function revokeMembership(id) {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/reject/', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

export async function fetchMembers() {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/members/', {
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

export const getMembers = async (setMembers) => {
    const data = await fetchMembers();    
    setMembers(data);
};