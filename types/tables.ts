export interface User {
    _id: string;
    email: string;
    password: string;
    pseudo?: string;
    projectIds?: string[];
    labels?: string[];
    profil_picture?: string;
    first_name?: string;
    lastName?: string;
    birth_date: Date;
    localisation?: string;
    gender?: string;
    experience?: string;
    available?: string;
    mobile?: string;
    allowEmails?: boolean;
    created?: Date;
}

export interface Workout{
    _id: string;
    email: string;
    workoutTitle: string;
    exercises: string[];
    date: Date;
}