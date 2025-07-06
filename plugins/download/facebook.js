import axios from "axios";
let handler = async (m, {
  conn,
  args
}) => {
  if (!args[0]) throw "Please provide a Facebook video URL";
  const sender = m.sender.split("@")[0];
  const url = args[0];
  await conn.sendMessage(m.chat, {
    react: {
      text: "👌",
      key: m.key
    }
  });
  try {
    const {
      data
    } = await axios.get(`https://api.ryzendesu.vip/api/downloader/fbdl?url=${encodeURIComponent(url)}`);
    if (!data.status || !data.data || data.data.length === 0) throw "No available video found";
    let video = data.data.find(v => v.resolution === "720p (HD)") || data.data.find(v => v.resolution === "360p (SD)");
    if (video && video.url) {
      const videoBuffer = await axios.get(video.url, {
        responseType: "arraybuffer"
      }).then(res => res.data);
      const caption = `Ini kak videonya @${sender}`;
      await conn.sendMessage(m.chat, {
        video: videoBuffer,
        mimetype: "video/mp4",
        fileName: `video.mp4`,
        caption: caption,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else {
      throw "No available video found";
    }
  } catch (error) {
    console.error("Handler Error:", error);
    conn.reply(m.chat, `An error occurred: ${error}`, m);
  }
};
handler.menudownlaod = ["fb <url>"];
handler.tagsdownload = ["search"];
handler.command = /^(fbdownload|facebook|fb(dl)?)$/i;
handler.limit = true;
export default handler;