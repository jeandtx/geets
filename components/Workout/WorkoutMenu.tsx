"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { WorkoutModal } from "@/components/Workout/WorkoutModal";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useWorkouts } from "@/app/context/WorkoutContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WorkoutList from "@/components/Workout/WorkoutList"; // Adjust the path as needed


export default function WorkoutMenu() {
    const { workouts: initialWorkouts, isLoading } = useWorkouts();
    const [workouts, setWorkouts] = useState(initialWorkouts);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/home"); // Redirect to home page once authenticated
        }
    }, [status, router]);

    useEffect(() => {
        setWorkouts(initialWorkouts);
    }, [initialWorkouts]);

    const addWorkout = (newWorkout: { _id: string; workoutTitle: string }) => {
        setWorkouts([...workouts, newWorkout]);
    };

    // Display a spinner if the session status is "loading"
    if (status === "loading") {
        return <LoadingSpinner />;
    }

    // Redirect to login page if the user is not authenticated
    if (status === "unauthenticated") {
        router.push("/login");
        return null; // Prevent page rendering during redirection
    }

    // Once the user is authenticated and data is loaded, display the content
    if (status === "authenticated") {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <div className="text-3xl font-bold pt-24">Ma séance du jour</div>
                <div className="flex flex-col items-center pt-36 w-full h-screen gap-3">
                    <WorkoutModal title={"+"} addWorkout={addWorkout} />
                    <WorkoutList workouts={workouts} />
                </div>
            </div>
        );
    }

    return null; // Return null if none of the above cases are satisfied
}
