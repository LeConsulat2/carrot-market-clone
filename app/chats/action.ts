"user server";

import getSession from "@/lib/session";
import db from "@/lib/db";

export async function saveMessage(payload: { message: string; chatRoomId: string }) {
    const session = await getSession(); 
    const message = await db.message.create({
        data: {
            payload: payload.message,
            chatRoomId: payload.chatRoomId,
            userId: session.id!,
            
        },
        select: {id: true}
    })
}