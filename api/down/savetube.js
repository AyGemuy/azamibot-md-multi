import axios from "axios";

const cdn = () => Math.floor(Math.random() * 11) + 51;

const headers = {
  accept: "*/*",
  origin: "https://ytshorts.savetube.me",
  referer: "https://ytshorts.savetube.me/",
  "user-agent": "Postify/1.0.0",
};

const fetch = async (url) => {
  const link = url.replace("{cdn}", cdn());
  try {
    const { data } = await axios.get(link, {
      headers: { ...headers, authority: `cdn${cdn()}.savetube.su` },
    });
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const audioQualities = { 1: "32", 2: "64", 3: "128", 4: "192" };
const videoQualities = {
  1: "144",
  2: "240",
  3: "360",
  4: "480",
  5: "720",
  6: "1080",
  7: "1440",
  8: "2160",
};

const progressBar = (progress) => {
  const total = 100;
  const complete = Math.floor(progress / 2);
  const incomplete = total / 2 - complete;
  const bar = "█".repeat(complete) + " ".repeat(incomplete);
  process.stdout.write(`\rProgress: [${bar}] ${progress}%   `);
};

const savetube = {
  info: async (url, type, qualityKey) => {
    try {
      const inpo = await fetch(
        `https://cdn{cdn}.savetube.su/info?url=${encodeURIComponent(url)}`,
      );
      const {
        key,
        duration,
        durationLabel,
        fromCache,
        id,
        thumbnail,
        title,
        titleSlug,
        url: videoUrl,
        thumbnail_formats,
      } = inpo.data;
      const quality =
        type === "audio"
          ? audioQualities[qualityKey]
          : videoQualities[qualityKey];
      if (!quality) throw new Error("❌ Opsi quality tidak valid!");
      const dlRes = await savetube.dl(key, type, quality);
      return {
        link: dlRes.data.downloadUrl,
        duration,
        durationLabel,
        fromCache,
        id,
        thumbnail,
        title,
        titleSlug,
        videoUrl,
        thumbnail_formats,
        quality,
        type,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  dl: async (key, type, quality) => {
    const api = `https://cdn${cdn()}.savetube.su/download/${type}/${quality}/${key}`;
    console.log("🌀 Fetching link...");
    for (let i = 0; i <= 100; i += 5) {
      progressBar(i);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    console.log();
    try {
      const { data } = await axios.get(api, { headers: headers });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};
const info = async (url, type, qualityKey) =>
  await savetube.info(url, type, qualityKey);
export default info;
