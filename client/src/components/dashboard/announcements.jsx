import { useAuthContext } from "@/hooks/useAuthContext";
import { useDarkMode } from "@/hooks/useDarkModeContext";

export default function Announcements() {
    const { darkMode } = useDarkMode();
    const { user, role, authReady } = useAuthContext();
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        
    }, []);

    if (authReady && role == 'coach') {
        return (
            <div className="w-full rounded-md overflow-hidden shadow-md ml-2 mr-2 bg-white p-4 dark:bg-gray-600">
                <h2 className="underline dark:text-neutral-300 ">Announcements</h2>
                
            </div>
        )
    } else {
        return (
            <div className="w-full rounded-md overflow-hidden shadow-md ml-2 mr-2 bg-white p-4 dark:bg-gray-600">
                <h2 className="underline dark:text-neutral-300 ">Announcements</h2>
                
            </div>
        )
    }
}