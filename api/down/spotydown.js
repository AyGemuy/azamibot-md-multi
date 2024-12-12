import fetch from "node-fetch";
class SpotifyDownloader {
  constructor() {
    this.api = "https://spotydown.media/api";
    this.headers = {
      Authority: "spotydown.media",
      Accept: "*/*",
      "Content-Type": "application/json",
      Origin: "https://spotydown.media",
      Referer: "https://spotydown.media/",
      "User-Agent": "Postify/1.0.0",
      "X-Forwarded-For": new Array(4)
        .fill()
        .map(() => Math.floor(Math.random() * 256))
        .join("."),
    };
  }
  async makeRequest(endpoint, data) {
    console.log(`Request to ${endpoint} with data:`, data);
    try {
      const response = await fetch(`${this.api}/${endpoint}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(`Response from ${endpoint}:`, result);
      return result;
    } catch (error) {
      console.error("Error occurred:", error.message);
      throw error;
    }
  }
  async fetchMetadata(link) {
    console.log(`Fetching metadata for link: ${link}`);
    return await this.makeRequest("get-metadata", {
      url: link,
    });
  }
  async fetchTrackDownload(link) {
    console.log(`Downloading track for link: ${link}`);
    return await this.makeRequest("download-track", {
      url: link,
    });
  }
  async fetchFile(fileUrl) {
    console.log(`Fetching file from URL: ${fileUrl}`);
    try {
      const response = await fetch(fileUrl, {
        headers: this.headers,
      });
      console.log("File response received");
      return await response.arrayBuffer();
    } catch (error) {
      console.error("Error occurred while fetching file:", error.message);
      throw error;
    }
  }
}
const downloader = new SpotifyDownloader();

const meta = async (link) => {
  try {
    return await downloader.fetchMetadata(link);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
};

const track = async (link) => {
  try {
    return await downloader.fetchTrackDownload(link);
  } catch (error) {
    console.error("Error fetching track download:", error);
    throw error;
  }
};

const get = async (fileUrl) => {
  try {
    return await downloader.fetchFile(fileUrl);
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};

export { meta, track, get };
