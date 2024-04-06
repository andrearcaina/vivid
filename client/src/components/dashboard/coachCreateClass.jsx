import { useDarkMode } from "@/hooks/useDarkModeContext";
import { RegisterClass } from "@/utils/registerClass";
import { useAuthContext } from '@/hooks/useAuthContext';

export default function CoachCreateClass() {
    const { darkMode } = useDarkMode();
    const { user } = useAuthContext();  
    // Coach registers a class form
    const submitRegister = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const courseName = formData.get('courseName');
        //Instructor Name gotten from user Authentication
        let instructorName;
        if (user) {
            instructorName =  user.first_name + " " + user.last_name;
            
        }
        const date = formData.get('dateClass');

            try {
                console.log("course: ", courseName)
                console.log("instructor: ", instructorName)
                console.log("date:", date)
                const data = await RegisterClass(courseName, instructorName, date);
                if (data.id) {
                    alert('Successfully created class!');
                } else {
                    alert('Error creating class!');
                }
            } catch (err) {
                console.error('Error:', err);
            }
        
    };
    return (
        <div className="flex justify-center">
            <form className="w-64 bg-white shadow-md dark:border-gray-700 dark:bg-gray-500  rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitRegister}>
                <label htmlFor="courseName" className="block text-gray-700 text-sm font-bold mb-2 dark:text-neutral-300">
                    Class Name:
                    <input id="courseName" className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 text-gray-800 dark:text-white rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500" type="text" name="courseName" />
                </label>
                                            
                <label htmlFor="dateClass" className="block text-gray-700 text-sm font-bold mb- dark:text-neutral-300">
                    Date of Class:
                    <input id="dateClass" className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 text-gray-800 dark:text-white rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500" type="datetime-local" name="dateClass" />
                </label>
                <br/>                            
                <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full" type="submit">Register</button>
            </form>
        </div>
 


    )
}