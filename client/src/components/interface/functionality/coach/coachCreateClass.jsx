import { useDarkMode } from '@/hooks/useDarkModeContext';
import { useAuthContext } from '@/hooks/useAuthContext';
import { RegisterClass } from '@/utils/classes';
import { toast } from 'react-hot-toast';

export default function CoachCreateClass() {
    const { darkMode } = useDarkMode();
    const { user } = useAuthContext();  

    const submitRegister = async (formData) => {
        const courseName = formData.get('courseName');
        const date = formData.get('dateClass');
        const instructor = user ? user.first_name + " " + user.last_name : null;
        
        try {
            const data = await RegisterClass(courseName, instructor, date);
            if (data.id) {
                toast.success('Successfully created class!');
            } else {
                toast.error('Error creating class!');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };
    return (
        <div className="flex justify-center">
            <form className="w-64 bg-white shadow-md dark:border-gray-700 dark:bg-gray-500  rounded px-8 pt-6 pb-8 mb-4" action={submitRegister}>
                <label htmlFor="courseName" className="block text-gray-700 text-sm font-bold mb-2 dark:text-neutral-300">
                    Class Name:
                    <input id="courseName" className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 text-gray-800 dark:text-white rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500" type="text" name="courseName" />
                </label>
                <label htmlFor="dateClass" className="block text-gray-700 text-sm font-bold mb- dark:text-neutral-300">
                    Date of Class:
                    <input id="dateClass" className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 text-gray-800 dark:text-white rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500" type="datetime-local" name="dateClass" />
                </label>
                <br />
                <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full" type="submit">Register</button>
            </form>
        </div>
    );
}