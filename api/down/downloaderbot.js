import fetch from "node-fetch";
class DownloaderBot {
  async down(videoUrl) {
    try {
      const response = await fetch("https://downloader.bot/api/tiktok/info", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://downloader.bot/id/download-mp3-tiktok",
        },
        body: JSON.stringify({
          url: videoUrl,
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (!result.status) throw new Error(result.error);
      const videoData = result.data;
      return {
        medias: [
          {
            text: "MP4",
            url: videoData.mp4,
            quality: "Normal",
          },
          {
            text: "MP3",
            url: videoData.mp3,
            quality: "Audio",
          },
        ],
        info: {
          nick: videoData.nick,
          video_info: videoData.video_info,
          video_img: videoData.video_img,
          video_date: videoData.video_date,
        },
      };
    } catch (error) {
      console.error("Error in DownloaderBot down:", error);
      throw error;
    }
  }
}
const downloaderBot = new DownloaderBot();

const downloader = async (videoUrl) => {
  try {
    return await downloaderBot.down(videoUrl);
  } catch (error) {
    console.error("Error during download:", error);
    throw error;
  }
};

export default downloader;
