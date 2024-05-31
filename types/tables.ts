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
export interface Session {
    _id: string;
    workoutId: string;
    date: Date;
    exercises: {
        [exerciseName: string]: {
            sets: number;
            weight: number;
        }[];
    }; // Dictionnaire pour chaque exercice avec le nombre de poids et le nombre de séries
}


export interface ExerciseInput {
    sets: string;
    weight: string;
}