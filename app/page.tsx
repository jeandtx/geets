import React from 'react';
import { Workout } from '@/components/workout';
import { AddWorkout } from '@/components/addWorkout';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <div className="text-3xl font-bold pt-24">Ma séance du jour</div>
            <div className='flex flex-col items-center pt-36 w-full h-screen gap-3'>
            <Workout title={"Upper A"} />
            <Workout title={"Lower A"} />
            <Workout title={"Upper B"} />
            <AddWorkout title={"+"} />
            </div>
        </div>
    );
}
