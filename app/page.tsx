import React from 'react';
import Link from 'next/link';
import WorkoutMenu from '@/components/Workout/WorkoutMenu';

export default function App() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
            <WorkoutMenu />
        </div>
    );
}
