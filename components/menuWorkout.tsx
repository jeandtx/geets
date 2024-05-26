import React, { useState } from "react";

export function MenuWorkout
() {
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

    const handleFormSubmit = () => {
        // Mettre ici la logique pour envoyer le formulaire
        console.log("Titre du workout :", workoutTitle);
        console.log("Exercices :", exercises);
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

