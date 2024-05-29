import { useAuthContext } from '@/hooks/useAuthContext';
import { Capitalize } from '@/utils/helpers';

export default function Welcome() {
    const { user } = useAuthContext();
    const hour = new Date(Date.now()).getHours();
    const greeting = hour < 5 ? "Good Night, " : hour > 5 && hour < 12 ? "Good Morning, " : hour > 12 && hour < 17 ? "Good Afternoon, " : "Good Evening, ";

    return (
        <main>
            <div className="dark:bg-gray-900 p-3 text-center">
                <h1 className="dark:text-neutral-300 whitespace-normal break-words">{greeting} {Capitalize(user.first_name)} {Capitalize(user.last_name)}!</h1>
            </div>
        </main>
    );
}