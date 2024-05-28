import { fetchClassesOffered } from '@/utils/classes';
import { convertTimestamp } from '@/utils/helpers';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useEffect, useState} from 'react';

export default function CoachUpcomingClasses(){
    const [courses, setCourses] = useState();
    const { user } = useAuthContext();  
    const instructorName =  user ? user.first_name + " " + user.last_name : null;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchClassesOffered();
            setCourses(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Your Upcoming Classes</h1>
            {courses && courses.class_name ? (
                <div>
                    {courses?.class_name?.map((title, index) => {
                        if (instructorName === courses.instructor_name[index]) {
                            return (
                                <div key={index} className="bg-green-500 rounded-md p-4 mb-4">
                                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                                    <p className="mb-1">Instructor: {courses.instructor_name[index]}</p>
                                    <p className="mb-1">{convertTimestamp(courses.class_datetime[index])}</p>
                                </div>
                            );
                        }
                    })}
                </div>
            ) : (
                <p>You have no upcoming classes.</p>
            )}
        </div>
    );
}