import { fetchClassesOffered } from '@/utils/classes';
import { useEffect, useState } from 'react';
import { convertTimestamp } from "@/utils/helpers";

export default function ClassesAvailable (){
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
            <h1 className="text-3xl font-bold mb-4">Available Classes</h1>
                <div>
                    {courses?.class_name?.map((title, index) => (
                        <div key={index} className="bg-blue-200 rounded-md p-4 mb-4">
                            <h2 className="text-xl font-bold mb-2">{title}</h2>
                            <p className="mb-1">Instructor: {courses.instructor_name[index]}</p>
                            <p className="mb-1">{convertTimestamp(courses.class_datetime[index])}</p>
                        </div>
                    ))}
                </div>
        </div>
    );
}