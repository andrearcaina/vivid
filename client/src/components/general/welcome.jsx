import { useState, useEffect } from 'react';
import { fetchUserInfo } from '@/utils/fetchUserData';

export default function Welcome() {
    const [userProfile, setProfile] = useState([]);

    const setData = async () => {
        try {
            const data = await fetchUserInfo();
            setProfile(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        setData();
    }, []);

    return (
        <div>
            <h1>{JSON.stringify(userProfile)}</h1>
        </div>
    );
}