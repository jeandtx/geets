export interface Interaction {
    _id: string;
    time: string;
    userId: string;
    userAvatar: string;
    type: "like" | "comment" | "follow" | "join";
    like?: {
        postId: string;
        postContent: string;
    };
    comment?: {
        postId: string;
        commentId: string;
        content: string;
    };
    follow?: {
        followerId: string;
        followerName: string;
        followerAvatar: string;
    };
    join?: {
        projectId: string;
        projectName: string;
        projectAvatar?: string;
        projectOwner: string;
        status?: "pending" | "accepted" | "rejected";
    };
    read?: boolean;
    to: string;
}


export interface Post {
    _id: string;
    project: {
        _id: string;
        title: string;
    };
    content: string;
    time: Date;
    author: {
        _id: string;
        pseudo: string;
        email: string;
        media: string;
    };
    media?: string;
    labels?: string[];
    score?: number;
}

export interface User {
    _id: string;
    email: string;
    password: string;
    pseudo?: string;
    projectIds?: string[];
    labels?: string[];
    media?: string;
    first_name?: string;
    lastName?: string;
    birth_date: Date;
    localisation?: string;
    gender?: string;
    experience?: string;
    available?: boolean;
    mobile?: string;
    allowEmails?: boolean;
    created?: Date;
    emailVerified?: boolean;
    verificationToken?: string;
    verificationTokenExpires?: Date;
    resetToken?: string;
    resetTokenExpires?: Date;
}


export interface Participant {
    name: string;
    role: string;
}

export interface Project {
    _id: string;
    title: string;
    created?: Date;
    themes?: string[];
    description?: string;
    media?: string;
    labels?: string[];
    participants?: {
        name: string;
        role: string;
    }[];
}