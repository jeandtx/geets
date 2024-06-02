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
    labels?: string[]; //copy dtx code (texte entry) ??
    profil_picture?: string;
    name?: string;
    last_name?: string;
    birth_date?: Date; //date picker !!!!!!!!!!!!!!!!!!
    location?: string;
    sexe?: string; //selectbox f or m or jsp
    experience?: number; //slider (0 to 10) !!!!!!!!!!!!!!!!!!!!
    chercheARejoindreUnProjet?: boolean; //yes or no !!!!!!!!!!!!!!!!
    mobile?: string; //+33 ...(enter only 10 numbers)
    createdAt?: Date;
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