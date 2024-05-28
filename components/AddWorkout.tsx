import React, { useState } from "react";
import { createWorkout } from "@/lib/actions";
import { useSession } from 'next-auth/react';
import { useToast } from "./ui/use-toast";
import { ExercisePerformance } from "@/types/tables";

export function AddWorkout({ closeModal }: { closeModal: () => void }) {
    const { toast } = useToast();
    const { data: session } = useSession();
    console.log("session is", session?.user?.email);
    const [workoutTitle, setWorkoutTitle] = useState("");
    const [exercises, setExercises] = useState<string[]>([""]);

    const handleAddExercise = () => {
        setExercises([...exercises, ""]);
    };

    const handleExerciseChange = (index: number, value: string) => {
        const updatedExercises = [...exercises];
        updatedExercises[index] = value;
        setExercises(updatedExercises);
    };

    const handleFormSubmit = async () => {
        if (!session?.user?.email) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const exercisePerformances: ExercisePerformance[] = exercises.map((exercise) => ({ name: exercise, exerciseId: "", sets: [] }));
            const response = await createWorkout(session.user.email, workoutTitle, exercisePerformances);
            console.log("Workout created successfully:", response);
            // Afficher le toaster
            toast({
                title: "Carré :)",
            });
            // Fermer la modal
            closeModal();
        } catch (error) {
            console.error("Error creating workout:", error);
            toast({
                variant: "destructive",
                title: "Flop",
            });
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Titre du Workout"
                className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                value={workoutTitle}
                onChange={(e) => setWorkoutTitle(e.target.value)}
            />
            {exercises.map((exercise, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Exercice ${index + 1}`}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                    value={exercise}
                    onChange={(e) => handleExerciseChange(index, e.target.value)}
                />
            ))}
            <button
                onClick={handleAddExercise}
                className="block w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mb-4"
            >
                Ajouter exercice
            </button>
            <button
                onClick={handleFormSubmit}
                className="block w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md"
            >
                Envoyer
            </button>
        </div>
    );
}
