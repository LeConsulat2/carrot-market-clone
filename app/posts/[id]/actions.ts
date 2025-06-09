"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function likePost(postId: number) {
  await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}
export async function dislikePost(postId: number) {
  await new Promise((r) => setTimeout(r, 10000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}

export async function createComment(postId: number, payload: string) {
  const session = await getSession();
  if (!session.id) return null;

  const comment = await db.comment.create({
    data: {
      payload,
      postId,
      userId: session.id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
  revalidateTag(`comments=${postId}`);
  return comment;
}

export async function getComments(postId: number) {
  const comments = awai db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc'
    }
  });
  return comments;
}