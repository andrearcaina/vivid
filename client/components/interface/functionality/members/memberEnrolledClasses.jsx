import { fetchMemberEnrolledClasses } from '@/utils/classes';
import { convertTimestamp } from '@/utils/helpers';
import { useEffect, useState } from 'react';

export default function MemberEnrolledClasses() {
    const [courses, setCourses] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchMemberEnrolledClasses();
                setCourses(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Your Enrolled Classes</h1>
            {courses && courses.class_name ? (
                <div>
                    {courses?.class_name?.map((name, index) => (
                        <div key={index} className="bg-green-500 rounded-md p-4 mb-4">
                            <h2 className="text-xl font-bold mb-2">{name}</h2>
                            <p className="mb-1">Instructor: {courses.instructor_name[index]}</p>
                            <p className="mb-1">{convertTimestamp(courses.class_datetime[index])}</p>
                        </div>
                    ))}
                </div>
            ) :
                <p>You have not enrolled in any classes</p>
            }
        </div>
    )
}
