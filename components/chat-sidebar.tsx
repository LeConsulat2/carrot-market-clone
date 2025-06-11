"use client";

import { UserChatRooms } from "@/app/chats/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ChatSidebarProps {
  chatRooms: UserChatRooms;
  currentChatRoomId: string;
  currentUserId: number;
}

export default function ChatSidebar({ 
  chatRooms, 
  currentChatRoomId, 
  currentUserId 
}: ChatSidebarProps) {
  return (
    <div className="w-80 bg-neutral-50 border-r border-neutral-200 flex flex-col h-full">
      {/* 헤더 */}
      <div className="p-4 border-b border-neutral-200 bg-white">
        <h1 className="text-xl font-semibold text-neutral-800">채팅</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {chatRooms.length}개의 대화
        </p>
      </div>

      {/* 채팅방 목록 */}
      <div className="flex-1 overflow-y-auto">
        {chatRooms.length === 0 ? (
          <div className="p-4 text-center text-neutral-500">
            <p>아직 참여중인 채팅방이 없습니다.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {chatRooms.map((chatRoom) => {
              const isCurrentRoom = chatRoom.id === currentChatRoomId;
              const otherUser = chatRoom.otherUsers[0]; // 1:1 채팅 가정
              const latestMessage = chatRoom.latestMessage;

              return (
                <Link
                  key={chatRoom.id}
                  href={`/chats/${chatRoom.id}`}
                  className={`block p-4 hover:bg-neutral-100 transition-colors ${
                    isCurrentRoom ? 'bg-orange-50 border-r-2 border-orange-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* 상대방 아바타 */}
                    <div className="relative">
                      <Image
                        src={otherUser?.avatar || '/default-avatar.png'}
                        alt={otherUser?.username || 'User'}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {/* 온라인 상태 표시 (옵션) */}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    {/* 채팅방 정보 */}
                    <div className="flex-1 min-w-0">
                      {/* 상대방 이름 */}
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium truncate ${
                          isCurrentRoom ? 'text-orange-600' : 'text-neutral-800'
                        }`}>
                          {otherUser?.username || '알 수 없는 사용자'}
                        </h3>
                        
                        {/* 최근 메시지 시간 */}
                        {latestMessage && (
                          <span className="text-xs text-neutral-500 ml-2">
                            {formatToTimeAgo(latestMessage.created_at.toString())}
                          </span>
                        )}
                      </div>

                      {/* 최근 메시지 미리보기 */}
                      <div className="flex items-center">
                        <p className="text-sm text-neutral-600 truncate flex-1">
                          {latestMessage ? (
                            <>
                              {latestMessage.userId === currentUserId && (
                                <span className="text-neutral-400 mr-1">나:</span>
                              )}
                              {latestMessage.payload}
                            </>
                          ) : (
                            <span className="text-neutral-400 italic">
                              아직 메시지가 없습니다
                            </span>
                          )}
                        </p>
                        
                        {/* 읽지 않은 메시지 배지 (옵션) */}
                        {/* {unreadCount > 0 && (
                          <div className="ml-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* 하단 사용자 정보 (옵션) */}
      <div className="p-4 border-t border-neutral-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {/* 현재 사용자 이니셜 또는 아바타 */}
              U
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-800">내 계정</p>
            <p className="text-xs text-neutral-500">온라인</p>
          </div>
        </div>
      </div>
    </div>
  );
}