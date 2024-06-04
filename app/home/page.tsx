import React from 'react';
import  WorkoutMenu  from '@/components/Workout/WorkoutMenu';
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <WorkoutMenu />
        </div>
    );
}
