import jwt from 'jsonwebtoken';
import { findVideoIdByUserId, updateStats, insertStats } from '@/lib/db/hasura';

export default async function stats(req, resp) {
    if (req.method === "POST") {

        try {
            const token = req.cookies.token;
            if (!token) {
                resp.status(403).send({});
            } else {
                const { videoId, favourited, watched = true } = req.body;

                if (videoId) {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

                    const userId = decodedToken.issuer;
                    const findVideo = await findVideoIdByUserId(
                        token,
                        userId,
                        videoId
                    );

                    const doesStatsExits = findVideo?.length > 0;

                    if (doesStatsExits) {
                        //update it
                        const response = await updateStats(token, {
                            favourited,
                            watched,
                            videoId,
                            userId,
                        });
                        resp.send({ data: response });
                    } else {
                        //add it
                        const response = await insertStats(token, {
                            favourited,
                            watched,
                            videoId,
                            userId,
                        });
                        resp.send({ data: response });
                    }
                }
            }
        } catch (error) {
            console.error("Error occured /stats", error);
            resp.status(500).send({ done: false, error: error?.message });
        }
    }
    else {

        try {
            const token = req.cookies.token;
            if (!token) {
                resp.status(403).send({});
            } else {
                const { videoId } = req.body;

                if (videoId) {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

                    const userId = decodedToken.issuer;

                    const findVideo = await findVideoIdByUserId(token, userId, videoId);

                    const doesStatsExits = findVideo?.length > 0;

                    if (doesStatsExits) {
                        resp.send(findVideo);
                    } else {
                        resp.send(404);
                        resp.send({ user: null, msg: "video not found" });
                    }
                }
            }
        } catch (error) {
            console.error("Error occured /stats", error);
            resp.status(500).send({ done: false, error: error?.message });
        }

    }
}


