import axios from "axios";
let handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!args[0]) {
    return conn.reply(m.chat, `Penggunaan: ${usedPrefix}${command} <url> <kualitas>\n\nContoh:\n${usedPrefix}${command} https://vt.tiktok.com/ZSh5WGJoX/ 1\n\nKualitas:\n1: Kualitas pertama\n2: Kualitas kedua\n...dst\n\nJika tidak diisi, akan menggunakan kualitas terbaik (HD Original).`, m);
  }
  const url = args[0];
  const qualityIndex = parseInt(args[1]) - 1;
  conn.reply(m.chat, "Sedang memproses...", m);
  try {
    const apiUrl = API("wudysoft", "/api/download/tiktok/v1", {
      url: url
    });
    if (!apiUrl) {
      return conn.reply(m.chat, "Gagal mendapatkan URL API.", m);
    }
    const {
      data
    } = await axios.get(apiUrl);
    if (data.success && data.result && data.result.media && data.result.media.videos && data.result.media.videos.length > 0) {
      let videoUrl;
      let caption = `*TikTok Downloader*\n\nDeskripsi: ${data.result.description}\n\nPenulis: ${data.result.author.nickname} (@${data.result.author.username})`;
      if (!isNaN(qualityIndex) && data.result.media.videos[qualityIndex]) {
        videoUrl = data.result.media.videos[qualityIndex].url;
        caption += `\n\nKualitas: ${data.result.media.videos[qualityIndex].size}`;
      } else {
        videoUrl = data.result.media.videos.find(v => v.size === "HD Original")?.url || data.result.media.videos[0].url;
        caption += `\n\nKualitas: ${data.result.media.videos.find(v => v.size === "HD Original")?.size || data.result.media.videos[0].size}`;
      }
      await conn.sendFile(m.chat, videoUrl, "tiktok.mp4", caption, m);
    } else {
      conn.reply(m.chat, "Gagal mengunduh video TikTok. Pastikan URL benar.", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "Maaf, terjadi kesalahan saat mengunduh video.", m);
  }
};
handler.help = ["tiktok <url> <kualitas>"];
handler.tags = ["download"];
handler.command = /^tiktok$/i;
handler.limit = true;
export default handler;