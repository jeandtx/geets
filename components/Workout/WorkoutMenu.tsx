// components/Workout/WorkoutMenu.tsx
"use client"
import React from "react";
import Link from "next/link";
import { WorkoutModal } from "@/components/Workout/WorkoutModal";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useWorkouts } from "@/app/context/WorkoutContext";

interface WorkoutProps {
    title: string;
    workoutId: string;
}

function Workout({ title, workoutId }: WorkoutProps) {
    return (
        <Link href={`/home/${workoutId}`}>
            <div className="w-64 h-14 bg-cyan-700 text-white font-medium py-2 px-4 rounded-full flex items-center justify-center">
                {title}
            </div>
        </Link>
    );
}

export default function WorkoutMenu() {
    const { workouts, isLoading } = useWorkouts();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <div className="text-3xl font-bold pt-24">Ma séance du jour</div>
            <div className="flex flex-col items-center pt-36 w-full h-screen gap-3">
                <WorkoutModal title={"+"} />
                {workouts.map((workout) => (
                    <Workout key={workout._id} title={workout.workoutTitle} workoutId={workout._id} />
                ))}
                
            </div>
        </div>
    );
}
