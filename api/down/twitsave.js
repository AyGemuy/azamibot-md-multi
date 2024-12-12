import * as cheerio from "cheerio";
import fetch from "node-fetch";
async function TwitSave(tweetUrl) {
  try {
    const response = await fetch(
      `https://twitsave.com/info?url=${encodeURIComponent(tweetUrl)}`,
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const $ = cheerio.load(await response.text());
    const downloads = $(".origin-top-right ul li")
      .map((_, el) => {
        const resolutionText = $(el)
          .find(".truncate")
          .text()
          .trim()
          .replace(/\s+Video\s+|Resolution/g, "");
        const downloadLink = $(el).find("a").attr("href");
        const resolution = resolutionText.match(/(\d+x\d+)/)?.[0] || null;
        return downloadLink
          ? {
              resolution: resolution,
              downloadLink: atob(
                decodeURIComponent(downloadLink.split("file=")[1]),
              ),
            }
          : null;
      })
      .get()
      .filter(Boolean);
    return {
      author: {
        name: $(".font-semibold.text-slate-800").text(),
        twitterLink: $(".font-semibold.text-slate-800").attr("href"),
        timestamp: $(".text-xs.text-slate-500").text(),
      },
      video: {
        src: $("video").attr("src"),
        poster: $("video").attr("poster"),
      },
      downloads: downloads,
    };
  } catch (error) {
    console.error("Error fetching tweet data:", error);
    throw error;
  }
}
export default TwitSave;
