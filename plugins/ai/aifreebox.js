import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let prompt = text;
  if (!prompt) {
    return conn.reply(m.chat, `Buat gambar dari teks menggunakan AIFreeBox (POST).\nContoh: ${usedPrefix}${command} Pemandangan kota di malam hari`, m);
  }
  try {
    conn.reply(m.chat, "_🎨 Membuat gambar menggunakan AIFreeBox (POST)..._", m);
    const apiUrl = API("wudysoft", "/api/ai/txt2img/aifreebox");
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
    if (data && data.success && data.imageUrl) {
      await conn.sendMessage(m.chat, {
        image: {
          url: data.imageUrl
        },
        caption: prompt
      }, {
        quoted: m
      });
    } else {
      conn.reply(m.chat, "_⚠️ Gagal membuat gambar menggunakan AIFreeBox (POST) atau gambar tidak ditemukan dalam respons._", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses permintaan gambar AIFreeBox (POST)._", m);
  }
};
handler.help = ["aifreebox <teks>"];
handler.tags = ["ai"];
handler.command = /^aifreebox$/i;
export default handler;