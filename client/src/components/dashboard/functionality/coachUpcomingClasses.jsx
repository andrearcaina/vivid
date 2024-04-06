import { fetchClassesOffered } from "@/utils/classesOffered/fetchClassesOffered";
import { useEffect, useState} from 'react';
import { convertTimestamp } from "@/utils/helpers/convertTime";
import { useAuthContext } from '@/hooks/useAuthContext';

export default function CoachUpcomingClasses(){
    const [courses, setCourses] = useState();
    const { user } = useAuthContext();  

    let instructorName;
    if (user) {
        instructorName =  user.first_name + " " + user.last_name;
            
    }

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
            <h1 className="text-3xl font-bold mb-4">Your Upcoming Classes</h1>
            {courses ? (
                <div>
                    {courses.class_titles.map((title, index) => {
                        // Check if instructorName matches the instructor for the current course
                        if (instructorName === courses.instructors[index]) {
                            return (
                                <div key={index} className="bg-green-500 rounded-md p-4 mb-4">
                                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                                    <p className="mb-1">Instructor: {courses.instructors[index]}</p>
                                    <p className="mb-1">{convertTimestamp(courses.datetimes[index])}</p>
                                </div>
                            );
                        } else {
                            // Render nothing if the instructorName doesn't match
                            return null;
                        }
                    })}
                </div>
            ) : (
                <p>You have no upcoming classes.</p>
            )}
        </div>
    );
}