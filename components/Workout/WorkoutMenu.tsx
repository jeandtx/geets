"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { WorkoutModal } from "@/components/Workout/WorkoutModal";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useWorkouts } from "@/app/context/WorkoutContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/home"); // Redirige vers la page d'accueil une fois authentifié
        }
    }, [status, router]);

    // Si le statut de la session est "loading", affiche un spinner
    if (status === "loading") {
        return <LoadingSpinner />;
    }

    // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
    if (status === "unauthenticated") {
        router.push("/login");
        return null; // Empêche le rendu de la page pendant la redirection
    }

    // Une fois que l'utilisateur est authentifié et les données chargées, affiche le contenu
    if (status === "authenticated") {
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

    return null; // Retourne null si aucun des cas ci-dessus n'est satisfait
}
