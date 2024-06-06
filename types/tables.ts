export interface User {
    _id: string;
    email: string;
    password: string;
    pseudo?: string;
    created?: Date;
    name: string;
}
export interface Workout {
    _id: string;
    email: string; // Utiliser l'email pour faire référence à l'utilisateur
    workoutTitle: string;
    date: Date;
    exercises: string[]; // Tableau de nom d'exercices
}
// Interface représentant une série
export interface Series {
    reps: number;
    weight: number;
}

// Interface représentant un exercice avec un nom et un tableau de séries
export interface Exercise {
    name: string;
    sets: Series[];
}

// Interface représentant une séance avec un tableau d'exercices
export interface Seance {
    _id: string;
    email: string;
    workoutId: string;
    date: Date;
    exercises: Exercise[];
}
