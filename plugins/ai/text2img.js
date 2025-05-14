import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let prompt = text;
  if (!prompt) {
    return conn.reply(m.chat, `Buat gambar dari teks menggunakan Text2Img (POST).\nContoh: ${usedPrefix}${command} Ruangan penuh dengan buku`, m);
  }
  try {
    conn.reply(m.chat, "_🎨 Membuat gambar menggunakan Text2Img (POST)..._", m);
    const apiUrl = API("wudysoft", "/api/ai/image/text2img");
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
    if (data && data.url) {
      await conn.sendMessage(m.chat, {
        image: {
          url: data.url
        },
        caption: prompt
      }, {
        quoted: m
      });
    } else {
      conn.reply(m.chat, "_⚠️ Gagal membuat gambar menggunakan Text2Img (POST) atau URL gambar tidak ditemukan dalam respons._", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses permintaan gambar Text2Img (POST)._", m);
  }
};
handler.help = ["text2img <teks>"];
handler.tags = ["ai"];
handler.command = /^text2img$/i;
export default handler;