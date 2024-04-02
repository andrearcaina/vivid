export default function Menu({ role }) {
    return (
        <div className="min-h-screen bg-gray-100 bg-">
            <h1 className="text-center text-3xl p-5">{role} Dashboard</h1>
            <div className="grid grid-cols-2">
                <div className="w-full rounded-md overflow-hidden shadow-md ml-2 mr-2 bg-white p-4">
                    <h2 className="underline">Announcements</h2>
                    <p>Announcements go here</p>
                </div>
                <div className="flex flex-col w-full">
                    <div className="rounded-md overflow-hidden shadow-md mb-4 ml-4 mr-2 bg-white p-4">
                        <h2 className="underline">Calendar</h2>
                        <p>Need to create a calendar</p>
                    </div>
                    <div className="rounded-md overflow-hidden shadow-md ml-4 mr-2 bg-white p-4">
                        <h2 className="underline">Finances</h2>
                        <p>money stuffs</p>
                    </div>
                </div>
            </div>
        </div>
    )
}