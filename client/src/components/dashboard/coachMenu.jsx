import { useDarkMode } from "@/hooks/useDarkModeContext";
import { RegisterClass } from "@/utils/registerClass";

export default function CoachMenu({ role }) {
    const { darkMode } = useDarkMode();

    const submitRegister = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const courseName = formData.get('courseName');
        const instructorName = formData.get('instructorName');
        const date = formData.get('dateClass');

        try {
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
        <main className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <h1 className="text-center text-3xl p-5 dark:text-neutral-300">{role} Dashboard Improved</h1>
                <div className="grid grid-cols-2 ">
                    <div className="w-full rounded-md overflow-hidden shadow-md ml-2 mr-2 bg-white p-4 dark:bg-gray-600">
                        <h2 className="underline dark:text-neutral-300 ">Announcements</h2>
                        <p className="dark:text-neutral-300">Announcements go here</p>
                    </div>
                    
                    <div className="flex flex-col w-full">
                        <div className="rounded-md overflow-hidden shadow-md mb-4 ml-4 mr-2 bg-white p-4 dark:bg-gray-600">
                            <h2 className="underline dark:text-neutral-300">Calendar</h2>
                            <p className="dark:text-neutral-300">Need to create a calendar</p>
                        </div>
                        
                        <div className="rounded-md overflow-hidden shadow-md ml-4 mr-2 bg-white p-4 dark:bg-gray-600">
                            <h2 className="underline dark:text-neutral-300">Finances</h2>
                            <p className="dark:text-neutral-300">money stuffs</p>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="grid grid-cols-2">
                    <div className="w-full rounded-md overflow-hidden shadow-md ml-2 mr-2 bg-white p-4 dark:bg-gray-600 text-center">
                        <h2 className="underline dark:text-neutral-300 ">Schedule a Class</h2>
                        {/*Remember to add onSubmit={submitRegister} when backend is working */}
                        <center><form className="w-64">
                            <label className="block mb-2 dark:text-neutral-300">
                                    Class Name:
                                    <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="text" name="courseName" />
                            </label>

                            <label className="block mb-2 dark:text-neutral-300">
                                    Instructor to conduct class:
                                    <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="text" name="instructorName" />
                            </label>
                            
                            <label className="block mb-2 dark:text-neutral-300">
                                    Date of Class:
                                    <input className="border border-gray-300 dark:border-gray-700 dark:bg-gray-500 rounded-md px-2 py-1 w-full" type="datetime-local" name="dateClass" />
                            </label>
                            
                            <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Register</button>
                        </form></center>
                    </div>
                </div>
            </div>
        </main>
    )
}