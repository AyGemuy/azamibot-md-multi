import fetch from "node-fetch";
import * as cheerio from "cheerio";
class TikVid {
  async down(videoUrl) {
    try {
      const response = await fetch("https://tikvid.io/api/ajaxSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "*/*",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://tikvid.io/id",
        },
        body: new URLSearchParams({
          q: videoUrl,
          lang: "id",
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const $ = cheerio.load(result.data);
      return $(".video-data")
        .map((i, el) => {
          const thumbnail =
            $(el).find(".image-tik img").attr("src") || "No thumbnail";
          const title = $(el).find(".content h3").text().trim() || "No title";
          const downloadLinks = $(el)
            .find(".dl-action a")
            .map((i, em) => {
              const link = $(em).attr("href") || "";
              return link
                ? {
                    text: $(em).text().trim() || "No text",
                    link: link || "No URL",
                  }
                : null;
            })
            .get()
            .filter(Boolean);
          return downloadLinks.length
            ? {
                thumbnail: thumbnail,
                title: title,
                downloadLinks: downloadLinks,
              }
            : null;
        })
        .get()
        .filter(Boolean);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
}
const tikVid = new TikVid();

const tikvid = async (videoUrl) => {
  try {
    return await tikVid.down(videoUrl);
  } catch (error) {
    console.error("Error during download:", error);
    throw error;
  }
};

export default tikvid;
