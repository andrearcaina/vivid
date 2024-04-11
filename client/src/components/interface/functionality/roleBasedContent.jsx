import { useAuthContext } from '@/hooks/useAuthContext';
import ClassesAvailable from './classesAvailable';
import MemberClassSignUp from './members/memberClassSignUp';
import MemberEnrolledClasses from './members/memberEnrolledClasses';
import CoachCreateClass from './coach/coachCreateClass';
import CoachUpcomingClasses from './coach/coachUpcomingClasses';

export default function Functionality() {
    const { role } = useAuthContext();

    const RoleBasedClasses = (role) => {
        return (
            <div className="rounded-md overflow-y-auto shadow-md mb-4 ml-4 mr-2 bg-white p-4 dark:bg-gray-600" style={{ maxHeight: '400px' }}>
                <ClassesAvailable/>
                {role == 'coach' ? <CoachUpcomingClasses/> : role == 'treasurer' ? null : <MemberEnrolledClasses/>}
            </div>
        )
    }

    if (role == 'coach') {
        return (
            <>
                {RoleBasedClasses(role)}
                
                <div className="rounded-md overflow-hidden shadow-md ml-4 mr-2 bg-white p-4 dark:bg-gray-600 text-center">
                    <h2 className="text-xl font-bold mb-2">Schedule a Class</h2>
                    <CoachCreateClass/>
                </div>
            </>
        )
    } else if (role == 'treasurer') {
        return (
            <>
                {RoleBasedClasses(role)}
                    
                <div className="rounded-md overflow-hidden shadow-md ml-4 mr-2 bg-white p-4 dark:bg-gray-600">
                    <h2 className="underline dark:text-neutral-300">Finances</h2>
                    <p className="dark:text-neutral-300">money stuffs</p>
                </div>
            </>
        )
    } else if (role == 'member') {
        return (
            <>
                {RoleBasedClasses(role)}
                    
                <div className="rounded-md overflow-hidden shadow-md mb-4 ml-4 mr-2 bg-white p-4 dark:bg-gray-600 text-center">
                    <h2 className="text-xl font-bold mb-2">Sign up to Upcoming Classes</h2>
                    <MemberClassSignUp/>
                </div>
            </>
        )
    } 
}