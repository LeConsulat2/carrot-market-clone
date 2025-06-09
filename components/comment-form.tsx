"use client";

import { useRef, useState } from "react";
import { createComment } from "@/app/posts/[id]/actions";
import { useSession } from "next-auth/react";

interface CommentFormProps {
  postId: number;
  onCommentAdded: (comment: any) => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !session?.user) return;

    const optimisticComment = {
      id: Date.now(), // Temporary ID
      payload: comment,
      postId,
      created_at: new Date(),
      updated_at: new Date(),
      user: {
        id: session.user.id,
        username: session.user.name || "Anonymous",
        avatar: session.user.image || null,
      },
      userId: session.user.id,
    };

    // Optimistic update
    onCommentAdded(optimisticComment);
    setComment("");
    formRef.current?.reset();

    try {
      setIsSubmitting(true);
      const newComment = await createComment(postId, comment);
      // Replace the optimistic comment with the real one
      if (newComment) {
        onCommentAdded(newComment); // This will replace the optimistic comment
      }
    } catch (error) {
      console.error("Failed to post comment", error);
      // Optionally show error message and revert optimistic update
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 작성하세요..."
          className="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={!comment.trim() || isSubmitting}
          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '작성 중...' : '작성'}
        </button>
      </div>
    </form>
  );
}