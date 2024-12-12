import fetch from "node-fetch";

class TiktokJs {
  constructor() {
    this.apiUrl = "https://tiktokjs-downloader.vercel.app/api/v1/";
    this.providers = [
      "aweme",
      "musicaldown",
      "savetik",
      "snaptik",
      "snaptikpro",
      "ssstik",
      "tikcdn",
      "tikmate",
      "tiktokdownloadr",
      "tikwm",
      "ttdownloader",
    ];
  }

  async fetchData(tiktok, endpoint, method = "POST") {
    const url = `${this.apiUrl}${endpoint}${method === "GET" ? `?url=${encodeURIComponent(tiktok)}` : ""}`;
    const options = {
      method,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: method === "POST" ? JSON.stringify({ url: tiktok }) : null,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(error.message);
      return method === "POST"
        ? await this.fetchData(tiktok, endpoint, "GET")
        : Promise.reject(error);
    }
  }

  async fetchByProvider(link, index = 0) {
    const provider = this.providers[index] || this.providers[0];
    return await this.fetchData(link, provider);
  }

  displayEndpoints() {
    return this.providers;
  }
}

async function tiktokjs(link, index = 0) {
  const tiktok = new TiktokJs();
  return await tiktok.fetchByProvider(link, index);
}

export default tiktokjs;
