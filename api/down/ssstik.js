import axios from "axios";
import * as cheerio from "cheerio";
const baseUrl = "https://ssstik.io";
const regexTiktokUrl =
  /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video|photo)\/|\?shareId=|\&item_id=)(\d+))|\w+)/;
const regexSsstikToken = /s_tt\s*=\s*'([^']+)'/;
const regexOverlayUrl =
  /#mainpicture \.result_overlay\s*{\s*background-image:\s*url\(["']?([^"']+)["']?\);\s*}/;
async function extractToken() {
  try {
    const response = await axios.get(baseUrl);
    const html = response.data;
    const matchedToken = html.match(regexSsstikToken);
    if (matchedToken && matchedToken.length > 1) {
      return matchedToken[1];
    } else {
      throw new Error("Cannot get ssstik token.");
    }
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
async function getSsstikData(url, token) {
  try {
    const basePostUrl = `${baseUrl}/abc?url=dl`;
    const formData = new FormData();
    formData.append("id", url);
    formData.append("locale", "en");
    formData.append("tt", token);
    const response = await axios.post(basePostUrl, formData, {
      headers: {
        origin: baseUrl,
        referer: `${baseUrl}/en`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      retries: 10,
    });
    const html = response.data;
    const $ = cheerio.load(html);
    const username = $("h2").text().trim();
    const description = $(".maintext").text().trim();
    const likeCount = $("div.trending-actions > div.justify-content-start")
      .eq(0)
      .text()
      .trim();
    const commentCount = $(
      "div.trending-actions > div.justify-content-center > div",
    )
      .text()
      .trim();
    const shareCount = $("div.trending-actions > div.justify-content-end > div")
      .text()
      .trim();
    const avatarUrl = $("img.result_author").attr("src");
    const videoUrl = $("a.without_watermark").attr("href");
    const musicUrl = $("a.music").attr("href");
    const styleContent = $("style").html();
    const overlayMatch = styleContent.match(regexOverlayUrl);
    const overlayUrl = overlayMatch ? overlayMatch[1] : null;
    return {
      username: username,
      description: description,
      statistics: {
        likeCount: likeCount,
        commentCount: commentCount,
        shareCount: shareCount,
      },
      downloads: [
        {
          avatarUrl: avatarUrl,
          overlayUrl: overlayUrl,
          videoUrl: videoUrl,
          musicUrl: musicUrl,
        },
      ],
    };
  } catch (error) {
    throw new Error(error);
  }
}
export default getSsstikData;
