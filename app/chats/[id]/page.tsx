import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import ChatMessagesList from "@/components/chat-messages-list";
import ChatSidebar from "@/components/chat-sidebar";

// 특정 채팅방 정보 가져오기
async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: { id: true },
      },
    },
  });
  if (room) {
    const session = await getSession();
    const canSee = Boolean(room.users.find((user) => user.id === session.id!));
    if (!canSee) {
      return null;
    }
  }
  return room;
}

// 채팅방의 모든 메시지 가져오기
async function getMessages(chatRoomId: string) {
    const messages = await db.message.findMany({
        where: {
            chatRoomId,
        },
        select: {
            id: true,
            payload: true,
            created_at: true,
            userId: true,
            user: {
                select: {
                    username: true,
                    avatar: true,
                }
            }
        },
        orderBy: {
            created_at: 'asc'
        }
    })
    return messages;
}

// 사용자가 참여중인 모든 채팅방 목록 가져오기
async function getUserChatRooms() {
  const session = await getSession();
  const chatRooms = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: session.id!,
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      messages: {
        select: {
          id: true,
          payload: true,
          created_at: true,
          userId: true,
          user: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
        take: 1, // 가장 최근 메시지만 가져오기
      },
    },
    orderBy: {
      updated_at: 'desc', // 최근 활동 순으로 정렬
    },
  });

  // 현재 사용자를 제외한 다른 사용자들의 정보 추가
  const chatRoomsWithOtherUsers = chatRooms.map(room => {
    const otherUsers = room.users.filter(user => user.id !== session.id!);
    const latestMessage = room.messages[0] || null;
    
    return {
      ...room,
      otherUsers,
      latestMessage,
    };
  });

  return chatRoomsWithOtherUsers;
}

// 현재 사용자 프로필 가져오기
async function getUserProfile() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id!,
    },
    select: {
      id: true,
      username: true,
      avatar: true,
    },
  });
  return user;
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;
export type UserChatRooms = Prisma.PromiseReturnType<typeof getUserChatRooms>;

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  if (!room) {
    return notFound();
  }

  const [initialMessages, userChatRooms, user] = await Promise.all([
    getMessages(room.id),
    getUserChatRooms(),
    getUserProfile(),
  ]);

  const session = await getSession();

  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <ChatSidebar 
        chatRooms={userChatRooms}
        currentChatRoomId={room.id}
        currentUserId={session.id!}
      />
      
      {/* 메인 채팅 영역 */}
      <div className="flex-1">
        <ChatMessagesList 
          userId={session.id!} 
          username={user?.username!} 
          avatar={user?.avatar!} 
          initialMessages={initialMessages} 
          chatRoomId={room.id} 
        />
      </div>
    </div>
  );
}