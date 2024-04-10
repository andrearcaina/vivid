'use client';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDarkMode } from '@/hooks/useDarkModeContext';
import { UnAuthorized, Deactivated } from '@/components';
import { fetchMemberEnrolledClasses } from '@/utils/classes';
import { Calendar, momentLocalizer, } from 'react-big-calendar';
import { useState, useEffect } from 'react';
import moment from 'moment';

export default function CalendarPage() {
    const { authReady, role, activated } = useAuthContext();
    const { darkMode } = useDarkMode();
    const [currentView, setCurrentView] = useState('month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const localizer = momentLocalizer(moment);
    const [courses, setCourses] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMemberEnrolledClasses();
                setCourses(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const dataToEvents = () => {
        return courses.class_name.map((name, i) => ({
            title: name + " - Instructor (" + courses.instructor_name[i] + ")",
            start: new Date(courses.class_datetime[i]),
            end: new Date(courses.class_datetime[i])
        }));
    }

    if (authReady && activated) {
        return(
            <div className={darkMode ? 'dark' : ''}>
                <div className="dark:bg-gray-700 dark:text-white h-[92vh] flex items-center justify-center">
                    <Calendar className="w-full p-10"
                        localizer={localizer}
                        events={courses && courses.class_name ? dataToEvents() : []}
                        startAccessor="start"
                        endAccessor="end"
                        toolbar={true}
                        views={['month', 'week', 'day', 'agenda']}
                        view={currentView}
                        date={currentDate}
                        onView={(view) => setCurrentView(view)}
                        onNavigate={(date) => setCurrentDate(date)}
                        onSelectEvent={event => alert(event.title)}
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