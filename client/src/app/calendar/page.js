'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { UnAuthorized, Deactivated } from '@/components';
import { fetchMemberEnrolledClasses } from '@/utils/classes';
import { Calendar, dayjsLocalizer, Toolbar } from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from 'react';


export default function CalendarPage() {
    const { authReady, role, activated } = useAuthContext();
    const { darkMode } = useDarkMode();
    // constants needed for calendar
    const localizer = dayjsLocalizer(dayjs)

    // fetching all user's course data
    const [courses, setCourses] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchMemberEnrolledClasses();
                setCourses(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // function to convert the courses json data to event format
    function dataToEvents() {
        const newEvents = courses.class_name.map((name, i) => ({
            title: name + ": Instructor (" + courses.instructor_name + ")",
            start: new Date(courses.class_datetime[i]),
            end: new Date(courses.class_datetime[i])
        }));

        return newEvents;
    }

    if (authReady && activated) {
        return(
            <div className={darkMode ? 'dark' : ''}>
                <div className="calendarPage dark:bg-gray-700 dark:text-white h-[92vh] flex items-center justify-center py-10">
                    <Calendar
                    localizer={localizer} 
                    events={courses && courses.class_name ? (
                        dataToEvents()
                    ) : []}
                    startAccessor="start" 
                    endAccessor="end"
                    defaultView='month'
                    />
                </div>
            </div>
            );
    } else if (role == 'member' && !activated) {
        return <Deactivated />;
    } else {
        return <UnAuthorized />;
    }
}