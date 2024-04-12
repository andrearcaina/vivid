import { useAuthContext } from '@/hooks/useAuthContext';
import ClassesAvailable from './classesAvailable';
import MemberClassSignUp from './members/memberClassSignUp';
import MemberEnrolledClasses from './members/memberEnrolledClasses';
import CoachCreateClass from './coach/coachCreateClass';
import CoachUpcomingClasses from './coach/coachUpcomingClasses';
import { getLastPayment } from '@/utils/logs';
import { PaymentChart } from '@/components';
import { useState, useEffect } from 'react';

export default function Functionality() {
    const { role } = useAuthContext();
    const [coachPayment, setCoachPayment] = useState([]);

    useEffect(() => {
        if (role === 'coach') {
            getLastPayment(setCoachPayment);
        }
    }, [role]);

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
                    <CoachCreateClass />
                    <div>
                        <h1 className="text-center">
                            Last Month Payment: $ {coachPayment.last_payment_balance}
                        </h1>
                    </div>
                </div>
            </>
        )
    } else if (role == 'treasurer') {
        return (
            <>
                {RoleBasedClasses(role)}
                    
                <div className="rounded-md overflow-hidden shadow-md ml-4 mr-2 bg-white p-4 dark:bg-gray-600">
                    <h1>Monthly Expenses</h1>
                    <PaymentChart label={'Total expenses per month'} money={[1530, 1730, 1600]} color={'rgba(255, 99, 132, 0.9)'} />
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