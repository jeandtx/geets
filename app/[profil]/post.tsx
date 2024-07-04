"use client"

import PostCard from "@/components/postcard";
import type{ Post } from "@/types/tables";


interface PostProps {
    post: Post
}

export default function Posts({post}:PostProps){

    return (<PostCard key={post._id} post={post} />)
}