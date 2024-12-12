import * as cheerio from "cheerio";
import fetch from "node-fetch";
async function dlPanda(url) {
  try {
    const response = await fetch(
        `https://dlpanda.com/id?url=${url}&token=G7eRpMaa`,
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      results = {
        image: [],
        video: [],
      };
    return (
      $(
        "div.hero.col-md-12.col-lg-12.pl-0.pr-0 img, div.hero.col-md-12.col-lg-12.pl-0.pr-0 video",
      ).each(function () {
        const element = $(this),
          isVideo = element.is("video"),
          src = isVideo
            ? element.find("source").attr("src")
            : element.attr("src"),
          fullSrc = src.startsWith("//") ? "https:" + src : src;
        results[isVideo ? "video" : "image"].push({
          src: fullSrc,
          width: element.attr("width"),
          ...(isVideo
            ? {
                type: element.find("source").attr("type"),
                controls: element.attr("controls"),
                style: element.attr("style"),
              }
            : {}),
        });
      }),
      results
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export default dlPanda;
