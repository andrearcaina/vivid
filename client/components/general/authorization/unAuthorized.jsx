import Link from 'next/link';

export default function UnAuthorized() {
    return (
        <div className="h-[80vh] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold p-3">Unauthorized</h1>
            <p className="text-lg p-3">You are not authorized to view this page.</p>
            <Link href="/auth/login"> 
                <p className="p-3 text-green-500 underline hover:text-green-600 duration-300 transition-all cursor-pointer">Login here</p>
            </Link>
        </div>
    );
}