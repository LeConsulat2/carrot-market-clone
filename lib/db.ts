import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// async function test() {
//   try {
//     // 먼저 User 생성
//     const user = await db.user.create({
//       data: {
//         username: 'testuser',
//       },
//     });
//     console.log('Created user:', user); // 로그 추가

//     // SMS Token 생성
//     const smsToken = await db.sMSToken.create({
//       data: {
//         token: '123456',
//         user: {
//           connect: {
//             id: user.id,
//           },
//         },
//       },
//     });
//     console.log('Created token:', smsToken); // 로그 추가
//   } catch (error) {
//     console.error('Error in test:', error); // 에러 로깅
//   }
// }

// // 즉시 실행되도록 수정
// test().catch(console.error);

export default db;
