import { VIDEO_THUMBNAIL_URL } from "../../constants/env";

const getVideoIdOrThumbnailUrl = (link: string, isId:boolean) => {
  const urlObj = new URL(link && link);
  if (urlObj.hostname === "youtu.be") {
    const videoId =  urlObj.pathname.slice(1);
    if (isId) {
      return videoId
    } else {
      const videoThumbnailUrl = VIDEO_THUMBNAIL_URL.replace("videoId", videoId);
      return videoThumbnailUrl
    }
  }

};

export default getVideoIdOrThumbnailUrl;



