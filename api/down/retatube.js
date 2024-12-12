import fetch from "node-fetch";
import * as cheerio from "cheerio";
class RetaTube {
  constructor() {
    this.searchEndpoint = "https://retatube.com/api/v1/aio/search";
    this.prefixEndpoint =
      "https://retatube.com/api/v1/aio/index?s=retatube.com";
  }
  getHeader(custom = {}) {
    return {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
      "Accept-Language": "id-MM,id;q=0.9",
      Origin: "https://retatube.com",
      Referer: "https://retatube.com/",
      "User-Agent": "Postify/1.0.0",
      ...custom,
    };
  }
  async getPrefix() {
    try {
      const response = await fetch(this.prefixEndpoint);
      const html = await response.text();
      const $ = cheerio.load(html);
      return $('#aio-search-box input[name="prefix"]').val() || "";
    } catch (error) {
      console.error("Error fetching prefix:", error.message);
      return "";
    }
  }
  async getData(videoId) {
    try {
      const prefix = await this.getPrefix();
      const response = await fetch(this.searchEndpoint, {
        method: "POST",
        headers: this.getHeader(),
        body: new URLSearchParams({
          prefix: prefix,
          vid: videoId,
        }),
      });
      const html = await response.text();
      return this.parseHtml(html);
    } catch (error) {
      console.error("Error fetching video data:", error.message);
      return {
        title: "",
        downloadLinks: [],
      };
    }
  }
  parseHtml(html) {
    const $ = cheerio.load(html);
    const title = $(".col #text-786685718 strong")
      .first()
      .text()
      .replace("Title：", "")
      .trim();
    const downloadLinks = $(".col a.button.primary")
      .map((_, link) => {
        const href = $(link).attr("href");
        return href && href !== "javascript:void(0);"
          ? {
              quality: $(link).find("span").text(),
              url: href,
            }
          : null;
      })
      .get()
      .filter(Boolean);
    return {
      title: title,
      downloadLinks: downloadLinks,
    };
  }
  async scrape(videoId) {
    try {
      return await this.getData(videoId);
    } catch (error) {
      console.error(`Scrape Error: ${error.message}`);
      return {
        title: "",
        downloadLinks: [],
      };
    }
  }
}
const reta = new RetaTube();

const retatub = async (videoId) => {
  try {
    return await reta.scrape(videoId);
  } catch (error) {
    console.error("Error during scraping:", error);
    throw error;
  }
};

export default retatub;
