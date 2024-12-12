import * as cheerio from "cheerio";
import fetch from "node-fetch";
class Invidious {
  constructor() {
    this.baseUrls = ["https://invidious.jing.rocks"];
    this.okBaseUrl = null;
  }
  async checkStatus() {
    for (const url of this.baseUrls) {
      try {
        const response = await fetch(url, {
          method: "HEAD",
        });
        if (response.ok) {
          this.okBaseUrl = url;
          break;
        }
      } catch (error) {
        console.error("Error:", error);
        continue;
      }
    }
  }
  async detail(v, type = "mp4") {
    try {
      const isBaseUrlOk = await this.checkStatus();
      const apiUrl = this.okBaseUrl;
      const body = await (await fetch(`${apiUrl}/watch?v=${v}`)).text();
      const $ = cheerio.load(body);
      const playerData = JSON.parse($("#player_data").html());
      const videoInfo = {
        title: playerData.title || "N/A",
        description: playerData.description || "N/A",
        thumbnail: `https://www.youtube.com${playerData.thumbnail || ""}`,
        aspectRatio: playerData.aspect_ratio || "16:9",
        sources: [
          ...$("video source")
            .map((i, el) => ({
              src: `${apiUrl}${$(el).attr("src")}`,
              type: $(el).attr("type"),
            }))
            .get(),
        ],
        captions: [
          ...$("video track")
            .map((i, el) => ({
              kind: $(el).attr("kind"),
              src: `${apiUrl}${$(el).attr("src")}`,
            }))
            .get(),
        ],
      };
      if (videoInfo) {
        const { title, sources } = videoInfo;
        for (const urlObj of sources.flat()) {
          const url = urlObj.src;
          const response = await fetch(url, {
            method: "HEAD",
          });
          if (response.ok) {
            const bufferResponse = await fetch(url, {
              headers: {
                Referer: `${apiUrl}/watch?v=${v}`,
              },
            });
            const buffer = await bufferResponse.arrayBuffer();
            if (buffer && buffer.length !== 0) {
              return {
                title: title,
                url: url,
                buffer: Buffer.from(buffer),
                contentType: type === "mp4" ? "video/mp4" : "audio/mp3",
                detail: videoInfo,
              };
            }
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Error fetching video details:", error);
      return {};
    }
  }
  async search(q) {
    try {
      const isBaseUrlOk = await this.checkStatus();
      const apiUrl = this.okBaseUrl;
      const body = await (await fetch(`${apiUrl}/search?q=${q}`)).text();
      const $ = cheerio.load(body);
      return $(".pure-u-1.pure-u-md-1-4")
        .map((_, el) => {
          const em = $(el);
          return {
            title: em.find(".video-card-row a p").text().trim() || "N/A",
            videoUrl: `https://www.youtube.com${em.find(".thumbnail a").attr("href") || ""}`,
            thumbnail: `https://www.youtube.com${em.find("img.thumbnail").attr("src") || ""}`,
            duration:
              em.find(".bottom-right-overlay p.length").text().trim() || "N/A",
            channel: em.find(".channel-name").text().trim() || "N/A",
            views: em.find(".video-data").last().text().trim() || "N/A",
            posted: em.find(".video-data").first().text().trim() || "N/A",
          };
        })
        .get();
    } catch (error) {
      console.error("Error fetching video data:", error);
      return [];
    }
  }
}
const invidious = new Invidious();

const detail = async (v, type = "mp4") => {
  try {
    return await invidious.detail(v, type);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const search = async (q) => {
  try {
    return await invidious.search(q);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const notube = async (url, format = "mp4") => {
  const parameters = {
    url: url,
    format: format,
    lang: "en",
  };
  try {
    const {
      data: { token },
    } = await axios.post(
      "https://s64.notube.net/recover_weight.php",
      stringify(parameters),
    );
    if (!token) throw new Error("No token received.");
    const { data: downloadPage } = await axios.get(
      `https://notube.net/en/download?token=${token}`,
    );
    const $ = cheerio.load(downloadPage);
    const title = $("#breadcrumbs-section h2").text();
    const videoUrl = $("#breadcrumbs-section #downloadButton").attr("href");
    const { data: buffer } = await axios.get(videoUrl, {
      responseType: "arraybuffer",
    });
    if (buffer && buffer.length !== 0) {
      return {
        title: title,
        url: videoUrl,
        buffer: Buffer.from(buffer),
        contentType: format === "mp4" ? "video/mp4" : "audio/mp3",
      };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
const cobalt = async (url, type = "mp4") => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Referer: "https://cobalt.tools/",
    },
    body: JSON.stringify({
      url: url,
    }),
  };
  try {
    const response = await fetch("https://api.cobalt.tools/", options);
    const data = await response.json();
    const buffer = await (
      await fetch(data.url, {
        headers: {
          Referer: url,
        },
      })
    ).arrayBuffer();
    if (buffer && buffer.length !== 0) {
      return {
        title: data.filename,
        url: data.url,
        buffer: Buffer.from(buffer),
        contentType: type === "mp4" ? "video/mp4" : "audio/mp3",
        detail: {
          title: data.filename,
          url: data.url,
        },
      };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
const quick = async (ytUrl, type = "mp4") => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "x-rapidapi-key": "1003c07223msh07af8432abe6d7fp135876jsn34d096ee567f",
      "x-rapidapi-host": "youtube-quick-video-downloader.p.rapidapi.com",
      "X-Forwarded-For": "70.41.3.18",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer: "https://www.hirequotient.com/youtube-video-downloader",
    },
    body: JSON.stringify({
      url: ytUrl,
    }),
  };
  try {
    const data = await (
      await fetch(
        "https://youtube-quick-video-downloader.p.rapidapi.com/api/youtube/links",
        options,
      )
    ).json();
    if (data[0]) {
      const {
        meta: { title },
        urls,
      } = data[0];
      for (const urlObj of urls.flat()) {
        const url = urlObj.url;
        const response = await fetch(url, {
          method: "HEAD",
        });
        if (response.ok) {
          const bufferResponse = await fetch(url, {
            headers: {
              Referer: url,
            },
          });
          const buffer = await bufferResponse.arrayBuffer();
          if (buffer && buffer.length !== 0) {
            return {
              title: title,
              url: url,
              buffer: Buffer.from(buffer),
              contentType: type === "mp4" ? "video/mp4" : "audio/mp3",
              detail: data[0],
            };
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching YouTube links:", error);
  }
};
export { detail, search, notube, cobalt, quick };
