"use client";

import { InitialChatMessages } from "@/app/chats/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";

const SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0cXVzeWtybHZudHd3Zm95bm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTQ4MjIsImV4cCI6MjA2NTE5MDgyMn0.ZUocUOyNlHQ31Jns6sj_yBKkHYCTcXrGuG5x4Uc_eAo";
const SUPABASE_URL = "https://gtqusykrlvntwwfoynnz.supabase.co";

interface ChatMessageListProps {
  initialMessages: InitialChatMessages;
  userId: number;
  chatRoomId: string;
}

export default function ChatMessagesList({
  initialMessages,
  userId,
  chatRoomId,
}: ChatMessageListProps) {
  // 메시지 목록 상태 - 초기 메시지로 시작
  const [messages, setMessages] = useState(initialMessages);
  // 입력 중인 메시지 상태
  const [message, setMessage] = useState("");
  // Supabase 실시간 채널 참조
  const channel = useRef<RealtimeChannel>();

  // 입력 필드 변경 핸들러
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  // 메시지 전송 핸들러
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 빈 메시지는 전송하지 않음
    if (message.trim() === "") return;
    
    // Supabase 채널을 통해 메시지 브로드캐스트
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: { 
        message: message.trim(),
        userId: userId,
        // 추가 필요한 데이터들 (예: 생성 시간, 사용자 정보 등)
      },
    });
    // 입력 필드 초기화
    setMessage("");
  };

  // 실시간 메시지 구독 설정
  useEffect(() => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    
    // 채팅방별 채널 생성
    channel.current = supabase.channel(`room-${chatRoomId}`);
    
    // 새 메시지 수신 시 처리
    channel.current.on("broadcast", {
      event: "message",
    }, (payload) => {
      // 기존 메시지 목록에 새 메시지 추가
      setMessages((prevMessages) => [...prevMessages, payload.payload]);
    });
    
    // 채널 구독 시작
    channel.current.subscribe();
    
    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {/* 메시지 목록 렌더링 */}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 items-start ${
            message.userId === userId ? "justify-end" : ""
          }`}
        >
          {/* 상대방 메시지인 경우 아바타 표시 */}
          {message.userId === userId ? null : (
            <Image
              src={message.user.avatar!}
              alt={message.user.username}
              width={50}
              height={50}
              className="size-8 rounded-full"
            />
          )}
          <div
            className={`flex flex-col gap-1 ${
              message.userId === userId ? "items-end" : ""
            }`}
          >
            {/* 메시지 내용 */}
            <span
              className={`${
                message.userId === userId ? "bg-neutral-500" : "bg-orange-500"
              } p-2.5 rounded-md text-white`}
            >
              {message.payload}
            </span>
            {/* 메시지 전송 시간 */}
            <span className="text-xs text-neutral-400">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}
      
      {/* 메시지 입력 폼 */}
      <form className="flex relative" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="메시지를 입력하세요..."
        />
        <button 
          type="submit"
          className="absolute right-0"
          disabled={message.trim() === ""}
        >
          <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300 disabled:opacity-50" />
        </button>
      </form>
    </div>
  );
}