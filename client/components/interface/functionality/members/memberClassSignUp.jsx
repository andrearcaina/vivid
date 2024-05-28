import { useDarkMode } from '../../../../hooks/useDarkModeContext';
import { UserRegisterClass, fetchClassesOffered } from '@/utils/classes';
import { useEffect, useState} from 'react';
import { toast } from 'react-hot-toast';

export default function MemberClassSignUp(){
    const { darkMode } = useDarkMode();

    const submitSignUp = async (formData) => {
        const courseName = formData.get('classes_available');

        try {
            const data = await UserRegisterClass(courseName);
            if (data.message) {
                toast.success('Successfully enrolled in class!');
            } else {
                toast.error('Error enrolling in  class!');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    //Fetch classes Available
    const [courses, setCourses] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchClassesOffered();
                setCourses(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    
    return (
        <div>
            <div className="flex justify-center">
            <form className="w-96 bg-white shadow-md dark:border-gray-700 dark:bg-gray-500 rounded px-8 pt-6 pb-8 mb-4" action={submitSignUp}>
                <div className="mb-4">
                    <label htmlFor="classes_available" className="block text-gray-700 text-sm font-bold  dark:text-neutral-300 mb-2">Choose an option:</label>
                    <select id="classes_available" name="classes_available" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {courses?.class_name?.map((title, index) => (
                            <option key={index} value={title}>{title} by: {courses.instructor_name[index]} on: {courses.class_datetime[index].slice(0, -1).replace('T', ' at ')}</option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Pay and Sign Up!</button>
                </div>
            </form>
        </div>
        </div>
    )

}