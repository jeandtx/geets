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
    email: string;
    workoutTitle: string;
    date: Date;
    exercises: ExercisePerformance[]; // Embedded subdocuments for exercises
}

export interface ExercisePerformance {
    exerciseId: string;
    name: string;
    sets: Set[];
}

export interface Set {
    setNumber: number;
    repetitions: number;
    weight: number; // Weight lifted during this set
}
