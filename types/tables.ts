// export interface Comment {
//     _id: string;
//     post: string;
//     content: string;
//     created: Date;
// }

// export interface Like{
//     _id: string;
//     post: string;
//     user: string;
//     created: Date;
// }

export interface Post {
    _id: string;
    project: string;
    title: string;
    content?: string;
    time: Date;
    author: string;
    media?: string;
    labels?: string[];
}

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

// export interface Participate{
//     _id: string;
//     project: string;
//     user: string;
//     created: Date;
// }

export interface Project {
    _id: string;
    author: string;
    title: string;
    created?: Date;
    themes?: string[];
    description?: string;
    media?: string;
    labels?: string[];
    participants?: string[];
}