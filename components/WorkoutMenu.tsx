"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Workout as WorkoutComponent } from "@/components/workout";
import { WorkoutModal } from "@/components/WorkoutModal";
import { getAllWorkouts } from "@/lib/actions"; // Assurez-vous que le chemin est correct
import { Workout, ExercisePerformance } from "@/types/tables"; // Importez les types corrects

export default function WorkoutMenu() {
    const { data: session } = useSession();
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (session?.user?.email) {
                try {
                    const userWorkouts = await getAllWorkouts(session.user.email);
                    setWorkouts(userWorkouts);
                } catch (error) {
                    console.error("Error fetching workouts:", error);
                }
            }
        };

        fetchWorkouts();
    }, [session]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <div className="text-3xl font-bold pt-24">Ma séance du jour</div>
            <div className='flex flex-col items-center pt-36 w-full h-screen gap-3'>
                {workouts.map(workout => (
                    <WorkoutComponent key={workout._id} title={workout.workoutTitle} workoutId={workout._id} />
                ))}
                <WorkoutModal title={"+"} />
            </div>
        </div>
    );
}
