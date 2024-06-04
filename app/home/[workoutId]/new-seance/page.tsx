// app/home/[workoutId]/new-seance/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import ExerciseNavigator from "@/components/Seance/ExerciseNavigator";
import { useWorkouts } from '@/app/context/WorkoutContext';

interface NewSeancePageProps {
    params: {
        workoutId: string;
    };
}

const NewSeancePage: React.FC<NewSeancePageProps> = ({ params }) => {
    const { workouts } = useWorkouts();
    const [exercises, setExercises] = useState<string[]>([]);

    useEffect(() => {
        // filter workout using WorkoutId
        const workout = workouts.find(workout => workout._id === params.workoutId);
        if (workout) {
            // get list of exercises in workout
            setExercises(workout.exercises);
        }
    }, [workouts, params.workoutId]);

    return (
        <div>
            <ExerciseNavigator exercises={exercises} id={params.workoutId} />
        </div>
    );
};

export default NewSeancePage;
