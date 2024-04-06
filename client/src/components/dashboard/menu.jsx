import { useDarkMode } from '@/hooks/useDarkModeContext';
import Welcome from './welcome';
import Announcements from './announcements';
import CoachCreateClass from './coachCreateClass';
import MemberClassSignUp from './memberClassSignUp';
import ClassesAvailable from './classesAvailable';
import MemberEnrolledClasses from './memberEnrolledClasses';
import CoachUpcomingClasses from './coachUpcomingClasses';

export default function Menu({ role }) {
    const { darkMode } = useDarkMode();

    let content;
    // Switch statement handles conditional rendering
    switch (role) {
        case 'Coach':
            content = (
                <>
                    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                        <h1 className="text-center text-3xl p-5 dark:text-neutral-300">{role} Dashboard Improved</h1>
                        <div className="grid grid-cols-2 ">
                            <Announcements />
                            
                            <div className="flex flex-col w-full">
                                <div className="rounded-md overflow-y-auto shadow-md mb-4 ml-4 mr-2 bg-white p-4 dark:bg-gray-600" style={{ maxHeight: '400px' }}>
                                    <ClassesAvailable/>
                                    <CoachUpcomingClasses/>
                                </div>
                                
                                <div className="rounded-md overflow-hidden shadow-md ml-4 mr-2 bg-white p-4 dark:bg-gray-600 text-center">
                                <h2 className="text-xl font-bold mb-2">Schedule a Class</h2>
                                    <CoachCreateClass/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <Welcome/>
                    </div>
                </>
            );
            break;
        case 'Treasurer':
            content = (
                <>
                    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                        <h1 className="text-center text-3xl p-5 dark:text-neutral-300">{role} Dashboard</h1>
                        <div className="grid grid-cols-2 ">
                            <Announcements/>
                            
                            <div className="flex flex-col w-full">
                                <div className="rounded-md overflow-y-auto shadow-md mb-4 ml-4 mr-2 bg-white p-4 dark:bg-gray-600" style={{ maxHeight: '400px' }}>
                                    <ClassesAvailable/>
                                </div>
                                
                                <div className="rounded-md overflow-hidden shadow-md ml-4 mr-2 bg-white p-4 dark:bg-gray-600">
                                    <h2 className="underline dark:text-neutral-300">Finances</h2>
                                    <p className="dark:text-neutral-300">money stuffs</p>
                                </div>
                            </div>
                        </div>
                        <Welcome/>
                    </div>
                </>
            );
            break;
        default:
            content = (
                <>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                    <h1 className="text-center text-3xl p-5 dark:text-neutral-300">{role} Dashboard</h1>
                    <div className="grid grid-cols-2 ">
                        <Announcements/>
                        
                        <div className="flex flex-col w-full">
                        <div className="rounded-md overflow-y-auto shadow-md mb-4 ml-4 mr-2 bg-white p-4 dark:bg-gray-600" style={{ maxHeight: '400px' }}>
                            <ClassesAvailable />
                            <MemberEnrolledClasses />
                        </div>
                            
                            <div className="rounded-md overflow-hidden shadow-md mb-4 ml-4 mr-2 bg-white p-4 dark:bg-gray-600 text-center">
                            <h2 className="text-xl font-bold mb-2">Sign up to Upcoming Classes</h2>
                                {/*Remember to add onSubmit={submitSignUp} when backend is working */}
                                <MemberClassSignUp/>
                        </div>
                        </div>
                    </div>
                    <br/>
                    <Welcome/>
                </div>
                </>
            );
            break;
    }


    return (
        <main className={darkMode ? 'dark' : ''}>
            {content}
        </main>
    )
}