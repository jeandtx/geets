	"use client";
import MentionParser from "@/components/text-content-parser";
import React from "react";
import Img from "next/image";
import { MessageSquare, Rocket, ThumbsUp } from "lucide-react";
import { Post } from "@/types/tables";
import Link from "next/link";
import { Button } from "./ui/button";
import {
	createInteraction,
	likePost,
	updateScore,
} from "@/lib/data/interactions";
import { useUserInfo } from "@/app/context/UserInfoContext";
import { Textarea } from "./ui/textarea";
import { updatePost } from "@/lib/data/post";
import { addLikePost } from "@/lib/data/post";
import { add } from "date-fns";

interface PostProps {
	post: Post;
	connected?: boolean;
}

export default function PostCard({
	post,
	connected = true,
}: Readonly<PostProps>) {
	const { userInfo } = useUserInfo();
	const [showCommentInput, setShowCommentInput] = React.useState(false);
	const [comment, setComment] = React.useState("");
	const [comments, setComments] = React.useState(post.comments || []); // Initialize comments state
	const [commentsToShow, setCommentsToShow] = React.useState(3);

	const handleShowMoreComments = () => {
		setCommentsToShow((prev) => prev + 5);
	  };
	  

	function getTimeSincePosted(time: Date) {
		if (!time) return "Il y a un certain temps";
		time = new Date(time);
		const currentTime = new Date();
		const diff = currentTime.getTime() - time.getTime();

		const years = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
		const months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
		const days = Math.floor(diff / 1000 / 60 / 60 / 24);
		const hours = Math.floor(diff / 1000 / 60 / 60);
		const minutes = Math.floor(diff / 1000 / 60);
		const seconds = Math.floor(diff / 1000 / 60);

		if (years > 0) return `Il y a ${years} ans`;
		if (months > 0) return `Il y a ${months} mois`;
		if (days > 0) return `Il y a ${days} jours`;
		if (hours > 0) return `Il y a ${hours} heures`;
		if (minutes > 0) return `Il y a ${minutes} minutes`;
		if (seconds > 0) return `Il y a ${seconds} secondes`;
		return "Il y a un certain temps";
	}

	function handleLikePost(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		console.log(post);
		// add 1 like to the like column of the post in the database
		// add the user's email to the likes c

		const target = e.currentTarget as HTMLElement; // Use currentTarget to refer to the element the event handler is attached to
		const elements = target.querySelectorAll("span, svg");
		addLikePost(post._id, userInfo?.pseudo as string)

		elements.forEach((element) => {
			if (element.classList.contains("text-blue-500")) {
				element.classList.remove("text-blue-500");
				element.classList.add("text-gray-600");
			} else {
				element.classList.remove(
					"text-gray-600",
					"text-red-500",
					"text-green-500"
				);
				element.classList.add("text-blue-500");
			}
		});
		likePost(
			post._id,
			userInfo?.email as string,
			userInfo?.media as string,
			post.content,
			post.author?.email
		) as Promise<void>;
		
	}

	function handleCommentPost(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		setShowCommentInput(!showCommentInput);
	}

	function handleCreateComment() {
		const newComment = {
			author: userInfo?.email as string,
			pseudo: userInfo?.pseudo,
			postId: post._id,
			content: comment,
			time: new Date(),
		};

		createInteraction({
			userId: userInfo?.email as string,
			userAvatar: userInfo?.media as string,
			type: "comment",
			comment: {
				postId: post._id,
				pseudo: userInfo?.pseudo,
				author: userInfo?.email as string,
				content: comment,
				time: new Date(),
			},
			read: false,
			to: post.author?.email,
		});

		updatePost(post._id, {
			comments: [...comments, newComment],
		}).then(() => {
			setComments((prevComments) => [...prevComments, newComment]); // Update state to trigger re-render
			setComment("");
			setShowCommentInput(false);
		});
		updateScore(post._id, "comment");
	}

	return (
		<div className="flex flex-col overflow-hidden rounded-xl custom-border bg-white">
			<div className="wrapper pt-5 pb-3 px-7">
				<div className="header flex items-center mb-4 space-x-4">
					<Img
						className="rounded-full"
						src={
							post.author?.media && post.author?.media !== ""
								? post.author?.media
								: "https://loremflickr.com/640/480/user"
						}
						alt="PP"
						width={48}
						height={48}
						style={{ height: "3.5rem", width: "3.5rem" }}
					/>
					<div>
						<Link href={`/${post.author?.email}`}>
							<p className="text-base text-gray-900 font-bold hover:text-blue-500">
								{post.author?.pseudo
									? post.author?.pseudo
									: post.author?.email}
							</p>
						</Link>
						<div className="flex text-sm items-center space-x-2">
							<p className="text-sm text-gray-600">
								{getTimeSincePosted(post?.time)}
							</p>
							<p className="text-gray-600">•</p>
							<Link
								href={`/${post.author?.email}/${post.project?._id}`}
							>
								<p className="text-gray-600 hover:text-blue-500">
									{post.project
										? post.project?.title
										: "Nom de projet"}
								</p>
							</Link>
						</div>
					</div>
				</div>

				<div className="body space-y-5">
					<p className="text-gray-900 text-sm mb-0">
						{post.content ? (
							<MentionParser content={post.content} />
						) : (
							"Contenu du post"
						)}
					</p>
					{post.media && (
						<Img
							className="w-full object-cover rounded-xl"
							src={post.media}
							alt="Post media"
							width={1280}
							height={960}
						/>
					)}
				</div>

				<hr className="border-gray-300 mt-5 mb-3" />
				

				<div className="footer space-y-3">
					{/* If the list of likes is null don't display anything, else write "liké par" and display the 3 first users */}
					{post.likes?.slice(0, 3).map((like, index) => (
										<span key={index}>
											{like}
											{index < 2 && ", "}
										</span>
									))}
					
					{connected && (
						<div className="icon-group flex justify-between items-center ">
						
							<Button
								variant={"outline"}
								className="border-0 flex space-x-3 px-5 py-3 rounded-xl cursor-pointer duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 select-none"
								onClick={handleLikePost}
							>
								<ThumbsUp className="text-gray-600" />
								<span className="hidden sm:block text-gray-600 font-semibold text-sm">

									J&apos;aime ({post.likes?.length})
								</span>
							</Button>
							<Button
								variant={"outline"}
								className="border-0 flex space-x-3 px-5 py-3 rounded-xl cursor-pointer duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 select-none"
								onClick={handleCommentPost}
							>
								<MessageSquare className="text-gray-600" />
								<span className="hidden sm:block text-gray-600 font-semibold text-sm">
									Commenter
								</span>
							</Button>
							<Link
								className="items-center border-0 flex space-x-3 px-5 py-3 rounded-xl cursor-pointer duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 active:text-blue-500 select-none"
								href={`${post.author?.email}/${post.project?._id}`}
							>
								<Rocket className="text-gray-600" />
								<span className="hidden sm:block text-gray-600 font-semibold text-sm">
									Visiter
								</span>
							</Link>
						</div>
					)}
				</div>
				<div>
					{showCommentInput && userInfo && (
						<div className="comment mt-4 p-4 bg-gray-100 rounded-xl space-y-4">
							<Textarea
								placeholder="Commentez ici..."
								value={comment}
								onChange={(e) => {
									setComment(e.target.value);
								}}
							></Textarea>
							<Button
								variant={"outline"}
								onClick={handleCreateComment}
							>
								Envoyer
							</Button>
						</div>
					)}
				</div>
				<div>
  {comments
    .slice(-commentsToShow)
    .map((comment) => (
      <div key={comment.postId + comment.time.toString()} className="comment mt-4 p-4 bg-gray-100 rounded-xl">
        <p className="text-gray-900 font-semibold">
          <Link href={`/${comment.author}`}>
            {comment.pseudo ? comment.pseudo : comment.author}
          </Link>
        </p>
        <p className="text-gray-700">
          <MentionParser content={comment.content} />
        </p>
        <p className="text-gray-500 text-sm">{getTimeSincePosted(comment.time)}</p>
      </div>
    ))}
  {commentsToShow < comments.length && (
    <div className="mt-4">
      <button
        onClick={handleShowMoreComments}
        className="text-blue-500 hover:underline"
      >
        Voir plus de commentaires
      </button>
    </div>
  )}
</div>

			</div>
		</div>
	);
}
