"use client";
import type { Comment as CommentType } from "@prisma/client";
import type { User } from "@prisma/client";
import { useEffect, useState } from "react";

interface CommentListProps {
    postId: number;
    initialComments: Array<CommentType & {user: Pick<User, 'id' | 'username' | 'avatar'>}>;
}


export default function CommentList({postId, initialComments}: CommentListProps) {
    const [comments, setComments] = useState(initialComments);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setComments(initialComments);
    }, [initialComments])

    const addOptimisticComment = (newComment: CommentType & {user: Pick<User, 'id' | 'username' | 'avatar'>}) => {
        setComments((prev) => [newComment, ...prev]);
    };

    return (
        <div>
            <h3></h3>
            <div>
                {comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment}/>
                ))}
            </div>
            <CommentForm postId={postId} onCommentAdded={addOptimisticComment}/>
        </div>
    );
}

function CommentItem({comment}: {comment: CommentType & {user:Pick<User, 'id' | 'username' | 'avatar'>}}) {
    return (
        <div>
            <div>
                <Image
            </div>
        </div>
    );
}