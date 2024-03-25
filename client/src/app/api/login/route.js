export async function POST(req) {
    const { email, password } = await req.json();

    const res = await fetch('http://127.0.0.1:8000/user-auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
    });
    
    const data = await res.json();
    
    console.log(data);

    if (data) {
        return Response.json({ 'message': 'success' }, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        return Response.json({ 'message': 'failed' }, {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}