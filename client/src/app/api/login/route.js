'use server';

import { fetchUserInfo } from "@/utils/fetchUser";
import { fetchLoginCookie } from "@/utils/fetchCookie";

export async function POST(req) {
    const { email, password } = await req.json();
    
    const cookie = await fetchLoginCookie(email, password);
    
    if (cookie.jwt) {
        const userData = await fetchUserInfo();

        console.log(cookie);
        console.log(userData);

        const role = userData.role;

        let redirectURL = '/dashboard';
        if (role == 'treasurer') {
            redirectURL += '/treasurer';
        } else if (role == 'coach') {
            redirectURL += '/coach';
        } else {
            redirectURL += '/member';
        }

        return Response.json({ 'message': 'success', redirect: redirectURL }, {
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