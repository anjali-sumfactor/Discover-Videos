import videoData from "../data/videos.json";

export function getVideos() {
    return videoData.items.map(item => {
        return {
            title: item.snippet.title,
            imgUrl: item.snippet.thumbnails.high.url,
            id: item?.id?.videoId,
        }
    });
}