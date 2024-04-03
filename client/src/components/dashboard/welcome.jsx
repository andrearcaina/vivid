import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';

export default function Welcome() {
    const { user } = useAuthContext();
    const { darkMode } = useDarkMode();

    return (
        <div className="dark:bg-gray-900">
            <h1 className="dark:text-neutral-300">{JSON.stringify(user)}</h1>
        </div>
    );
}