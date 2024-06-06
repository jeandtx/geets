import React from 'react';
import Link from 'next/link';
import WorkoutMenu from '@/components/Workout/WorkoutMenu';
import { redirect } from 'next/navigation';

export default function App() {
    redirect("/home")
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
            
        </div>
    );
}
