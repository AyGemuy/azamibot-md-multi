import * as cheerio from "cheerio";
import fetch from "node-fetch";
const X2twitter = async (tweetUrl) => {
  const url = "https://x2twitter.com/api/ajaxSearch";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer: "https://x2twitter.com/id",
  };
  const body = new URLSearchParams({
    q: tweetUrl,
    lang: "id",
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body.toString(),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const mediaUrls = await fetchMediaUrls(data.data);
    const output = {
      media: mediaUrls[0].videoUrls.map((v) =>
        JSON.parse(atob(v.split("=")[1].split(".")[1])),
      ),
    };
    const customArray = Array.from(
      new Set(output.media.map((item) => item.url)),
    ).map((url) => output.media.find((item) => item.url === url));
    const transformedArray = customArray
      .map((item) => {
        const quality = item.filename.split("_").pop().split(".")[0];
        return {
          url: item.url,
          quality: quality,
        };
      })
      .filter((item) => item.quality);
    return transformedArray;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
const fetchMediaUrls = async (body) => {
  const $ = cheerio.load(body);
  return $(".tw-video")
    .map((i, el) => {
      const videoUrls = $(el)
        .find(".dl-action a")
        .map((j, link) => {
          const href = $(link).attr("href");
          return href && !href.startsWith("#") ? href : null;
        })
        .get()
        .filter(Boolean);
      return {
        videoUrls: videoUrls,
        thumbnailUrl:
          $(el).find(".thumbnail img").attr("src") || "No thumbnail",
        audioUrl: $(el).find(".action-convert").data("audioUrl") || "No audio",
      };
    })
    .get();
};
export default X2twitter;
