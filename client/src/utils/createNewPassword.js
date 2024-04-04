export async function createNewPassword(old_password, new_password) {
    try {
        const res = await fetch('http://127.0.0.1:8000/member-logs/profile/password/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                old_password: old_password,
                new_password: new_password
            }),
        });
        console.log(new_password);
        const data = await res.json();
        if (data.message === 'Password updated successfully') {
            alert('Password changed successfully!');
        } else {
            alert('Unable to update password: ' + data.message);
        }
    } catch (err) {
        console.error(err);
    }
}