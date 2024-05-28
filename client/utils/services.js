export async function deleteCookie() {
    try {
        const res = await fetch('http://127.0.0.1:8000/user-auth/logout/', {
            method: 'POST',
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

export async function fetchJWT(email, password) {
    try {
        const res = await fetch('http://127.0.0.1:8000/user-auth/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

export async function fetchUserInfo() {
    try {
        const res = await fetch('http://127.0.0.1:8000/user-auth/user/', {
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

export async function RegisterUser(first, last, email, date, password, role) {
    try {
        const res = await fetch('http://127.0.0.1:8000/user-auth/register/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: first,
                last_name: last,
                email: email,
                date_of_birth: date,
                password: password,
                role: role
            }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

export async function resetPassword(email, password, confirmPassword) {
    try {
        const res = await fetch('http://127.0.0.1:8000/user-auth/reset/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}