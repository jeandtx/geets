// src/pages/trending/[hashtag].tsx
"use client";

import React from "react";
import InfiniteScroll from '@/components/infinitescroll'
import { getPosts } from '@/lib/data/post'
import { useRouter } from "next/router";

export default function TrendingPage({
    params,
}: Readonly<{
  params: { hashtag: string}
}>) {
  const hashtag = params.hashtag;

  if (!hashtag || typeof hashtag !== "string") {
    return <div>Invalid hashtag</div>;
    
  }
  
  const fetchPosts = (page: number) => getPosts(page, { $or: [{ content: { $regex: hashtag } }, { comments: { $elemMatch: { content: { $regex: hashtag } } } }] });

// Modify the fetchPosts function to accept a parameter of type number
  console.log(hashtag)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trending: #{hashtag}</h1>
      <InfiniteScroll fetchFunction={fetchPosts} />
    </div>
  );
}
