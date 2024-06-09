import { z } from "zod"


const likeSchema = z.object({
  postId: z.string(),
  postContent: z.string(),
});

const commentSchema = z.object({
  postId: z.string(),
  commentId: z.string(),
  content: z.string(),
});

const followSchema = z.object({
  followerId: z.string(),
  followerName: z.string(),
  followerAvatar: z.string(),
});

const joinSchema = z.object({
  projectId: z.string(),
  projectName: z.string(),
  projectAvatar: z.string(),
  projectOwner: z.string(),
});

export const notificationSchema = z.object({
  id: z.string(),
  time: z.string(),
  userId: z.string(),
  userAvatar: z.string(),
  type: z.enum(["like", "comment", "follow", "join"]),
  like: likeSchema.optional(),
  comment: commentSchema.optional(),
  follow: followSchema.optional(),
  join: joinSchema.optional(),
});

export type Notification = z.infer<typeof notificationSchema>;

