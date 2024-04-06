import { useAuthContext } from '@/hooks/useAuthContext';

export default function Welcome() {
    const { user } = useAuthContext();

    return (
        <div className="dark:bg-gray-900 p-3">
            <h1 className="dark:text-neutral-300 whitespace-normal break-words">{JSON.stringify(user)}</h1>
        </div>
    );
}