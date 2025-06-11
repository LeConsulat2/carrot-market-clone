"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";

// 메시지 저장 함수
export async function saveMessage(payload: { message: string; chatRoomId: string }) {
    const session = await getSession(); 
    
    // 메시지 저장
    const message = await db.message.create({
        data: {
            payload: payload.message,
            chatRoomId: payload.chatRoomId,
            userId: session.id!,
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
        }
    });

    // 채팅방의 updated_at 필드 업데이트 (최근 활동 순 정렬용)
    await db.chatRoom.update({
        where: {
            id: payload.chatRoomId,
        },
        data: {
            updated_at: new Date(),
        }
    });

    return message;
}

// 새로운 채팅방 생성 함수 (옵션)
export async function createChatRoom(otherUserId: number) {
    const session = await getSession();
    
    // 이미 존재하는 1:1 채팅방이 있는지 확인
    const existingRoom = await db.chatRoom.findFirst({
        where: {
            users: {
                every: {
                    id: {
                        in: [session.id!, otherUserId]
                    }
                }
            }
        },
        include: {
            users: true
        }
    });

    if (existingRoom && existingRoom.users.length === 2) {
        return existingRoom;
    }

    // 새 채팅방 생성
    const newRoom = await db.chatRoom.create({
        data: {
            users: {
                connect: [
                    { id: session.id! },
                    { id: otherUserId }
                ]
            }
        },
        include: {
            users: {
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                }
            }
        }
    });

    return newRoom;
}

// 채팅방 나가기 함수 (옵션)
export async function leaveChatRoom(chatRoomId: string) {
    const session = await getSession();
    
    await db.chatRoom.update({
        where: {
            id: chatRoomId,
        },
        data: {
            users: {
                disconnect: {
                    id: session.id!,
                }
            }
        }
    });

    return { success: true };
}

// 읽지 않은 메시지 수 조회 (옵션)
export async function getUnreadMessageCount(chatRoomId: string) {
    const session = await getSession();
    
    // 실제 구현하려면 사용자별 마지막 읽은 메시지 ID를 추적하는 
    // 별도 테이블이 필요합니다 (예: UserChatRoomStatus)
    
    return 0; // 임시 값
}