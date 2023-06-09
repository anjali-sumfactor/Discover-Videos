// import jwt from 'jsonwebtoken';

// export async function verifyToken(token) {
//     if (token) {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//         const userId = decodedToken?.issuer;
//         return userId;
//     }
//     return null;
// }

import { jwtVerify } from "jose";
export async function verifyToken(token) {
    try {
        if (token) {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
            return payload?.issuer;
        }
        return null;
    }
    catch (error) {
        console.error({ error });
        return null;
    }
}