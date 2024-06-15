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


type Set = {
    reps: string;
    weight: string;
  };


export interface Seance {
    _id: string;
    email: string;
    workoutId: string;
    date: Date;
    exercises: {
        name: string;
        sets: Set[];
    }[];
    
}
