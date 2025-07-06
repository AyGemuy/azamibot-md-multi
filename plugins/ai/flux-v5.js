import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let prompt = text;
  if (!prompt) {
    return conn.reply(m.chat, `Buat gambar dari teks menggunakan Fluxv5 (POST).\nContoh: ${usedPrefix}${command} Pemandangan kota futuristik`, m);
  }
  try {
    conn.reply(m.chat, "_🎨 Membuat gambar menggunakan Fluxv5 (POST)..._", m);
    const apiUrl = API("wudysoft", "/api/ai/txt2img/flux/v5");
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
    if (data && data.imageUrl && Array.isArray(data.imageUrl) && data.imageUrl.length > 0) {
      await conn.sendMessage(m.chat, {
        image: {
          url: data.imageUrl[0]
        },
        caption: prompt
      }, {
        quoted: m
      });
    } else {
      conn.reply(m.chat, "_⚠️ Gagal membuat gambar menggunakan Fluxv5 (POST) atau gambar tidak ditemukan dalam respons._", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses permintaan gambar Fluxv5 (POST)._", m);
  }
};
handler.help = ["fluxv5 <teks>"];
handler.tags = ["ai"];
handler.command = /^fluxv5$/i;
export default handler;