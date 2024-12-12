import fetch from "node-fetch";
class SavetubeTera {
  async down(videoUrl) {
    try {
      const response = await fetch(
        "https://ytshorts.savetube.me/api/v1/terabox-downloader",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
            Referer: "https://ytshorts.savetube.me/terabox-downloader",
          },
          body: JSON.stringify({
            url: videoUrl,
          }),
        },
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      const medias = json.response.map((item) => {
        return {
          text: item.title,
          url: item.resolutions["HD Video"],
          quality: "HD",
        };
      });
      return {
        medias: medias,
      };
    } catch (error) {
      console.error("Error in SaveTube down:", error);
      throw error;
    }
  }
}
const savetube = new SavetubeTera();

const savetubes = async (videoUrl) => {
  try {
    return await savetube.down(videoUrl);
  } catch (error) {
    console.error("Error during download:", error);
    throw error;
  }
};

export default savetubes;
