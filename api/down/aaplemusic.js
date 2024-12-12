import fetch from "node-fetch";
class AapleMusic {
  constructor() {
    this.baseURL = "https://aaplmusicdownloader.com/api";
  }
  async ytsearch(name, artist, album, link) {
    const url = `${this.baseURL}/composer/ytsearch/mytsearch.php?name=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&link=${encodeURIComponent(link)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://aaplmusicdownloader.com/song.php#",
      },
    });
    if (!response.ok) throw new Error("Gagal mengambil data dari ytsearch.");
    return await response.json();
  }
  async ytdl(videoId) {
    const url = `${this.baseURL}/ytdl.php?q=${videoId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://aaplmusicdownloader.com/song.php#",
      },
    });
    if (!response.ok) throw new Error("Gagal mengunduh video.");
    return await response.json();
  }
  async applesearch(trackUrl) {
    const response = await fetch(
      `https://aaplmusicdownloader.com/api/applesearch.php?url=${encodeURIComponent(trackUrl)}`,
    );
    if (!response.ok) throw new Error("Gagal mengambil informasi lagu.");
    return await response.json();
  }
}
const appleMusic = new AapleMusic();

export const ytdl = async (videoId) => {
  return await appleMusic.ytdl(videoId);
};

export const ytsearch = async (name, artist, album, link) => {
  return await appleMusic.ytsearch(name, artist, album, link);
};

export const applesearch = async (trackUrl) => {
  return await appleMusic.applesearch(trackUrl);
};
