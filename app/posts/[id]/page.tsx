import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/like-button";
import { Suspense } from "react";
import { getComments } from "./actions";
import CommentList from "@/components/comment-list";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });
    return post;
  } catch {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(postId: number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });
  const likeCount = await db.like.count({ where: { postId } });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

function getCachedLikeStatus(postId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["post-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId);
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const post = await getCachedPost(id);
  if (!post) return notFound();

  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  const comments = await getComments(id);

  return (
    <div className="p-5 text-white">
      {/* 작성자 정보 */}
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>

      {/* 조회수 / 좋아요 */}
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>

      {/* 댓글 섹션 */}
      <div className="mt-10">
        <h3 className="text-md font-semibold mb-2">💬 댓글</h3>
        <Suspense fallback={<div>로딩 중...</div>}>
          <CommentList postId={id} initialComments={comments} />
        </Suspense>
      </div>
    </div>
  );
}
