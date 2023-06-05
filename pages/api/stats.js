import jwt from 'jsonwebtoken';
import { findVideoIdByUser, updateStats } from '@/lib/db/hasura';

export default async function stats(req, resp) {
    if (req.method === "POST") {

        try {
            const token = req.cookies.token;
            if (!token) {
                resp.status(403).send({});
            } else {
                const videoId = req.query.videoId;
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

                const userId = decodedToken.issuer;
                const doesStatsExits = await findVideoIdByUser(token, userId, videoId);

                if (doesStatsExits) {
                    //update it
                    const response = await updateStats(token, {
                        favourited: 0,
                        watched: true,
                        videoId: "ctlz0R1tSZE",
                        userId,
                    });
                    resp.send({ msg: " it works", response });
                } else {
                    //add it
                    resp.send({ msg: "it works", decodedToken, doesStatsExits });
                }

            }
        } catch (error) {
            console.error("Error occured /stats", error);
            resp.status(500).send({ done: false, error: error?.message });
        }
    }
}