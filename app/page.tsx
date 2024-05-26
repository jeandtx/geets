import React from 'react';
import { Workout } from '@/components/workout';
import { WorkoutModal } from '@/components/WorkoutModal';
import  WorkoutMenu  from '@/components/WorkoutMenu';
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <WorkoutMenu />
        </div>
    );
}
