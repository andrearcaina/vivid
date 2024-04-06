import { useAuthContext } from '@/hooks/useAuthContext';

export default function Welcome() {
    const { user } = useAuthContext();
    const hour = new Date(Date.now()).getHours();

    let greeting;

    if (hour < 12) {greeting = "Good Morning, "}
    else if (hour < 17) {greeting = "Good Afternoon, "}
    else {greeting = "Good Evening, "}
    return (
        <main>
            <div className="dark:bg-gray-900 p-3 text-center">
                <h1 className="dark:text-neutral-300 whitespace-normal break-words">{greeting} {JSON.stringify(user.first_name).replace(/\"/g, "")}</h1>
            </div>
        </main>
    );
}