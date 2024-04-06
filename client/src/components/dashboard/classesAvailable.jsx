import { fetchClassesOffered } from "@/utils/classesOffered/fetchClassesOffered";
import { useEffect, useState} from 'react';
import { convertTimestamp } from "@/utils/helpers/convertTime";

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
            {courses && (
                <div>
                    {courses.class_titles.map((title, index) => (
                        <div key={index} className="bg-blue-200 rounded-md p-4 mb-4">
                            <h2 className="text-xl font-bold mb-2">{title}</h2>
                            <p className="mb-1">Instructor: {courses.instructors[index]}</p>
                            <p className="mb-1">{convertTimestamp(courses.datetimes[index])}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}