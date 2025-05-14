import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let prompt = text;
  if (!prompt) {
    return conn.reply(m.chat, `Buat gambar dari teks menggunakan MagicHour (POST).\nContoh: ${usedPrefix}${command} Pemandangan kota magis`, m);
  }
  try {
    conn.reply(m.chat, "_🎨 Membuat gambar menggunakan MagicHour (POST)..._", m);
    const apiUrl = API("wudysoft", "/api/ai/txt2img/magichour");
    const postData = {
      prompt: prompt
    };
    const {
      data
    } = await axios.post(apiUrl, postData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (data && data.status === "SUCCESS" && data.urls && Array.isArray(data.urls) && data.urls.length > 0) {
      for (const imageUrl of data.urls) {
        await conn.sendMessage(m.chat, {
          image: {
            url: imageUrl
          },
          caption: prompt
        }, {
          quoted: m
        });
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } else {
      conn.reply(m.chat, "_⚠️ Gagal membuat gambar menggunakan MagicHour (POST) atau tidak ada gambar yang ditemukan dalam respons._", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses permintaan gambar MagicHour (POST)._", m);
  }
};
handler.help = ["magichour <teks>"];
handler.tags = ["ai"];
handler.command = /^magichour$/i;
export default handler;