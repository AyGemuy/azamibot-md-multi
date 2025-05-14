import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let prompt = text;
  if (!prompt) {
    return conn.reply(m.chat, `Buat gambar dari teks menggunakan EasyAI (POST).\nContoh: ${usedPrefix}${command} kucing lucu bermain benang`, m);
  }
  try {
    conn.reply(m.chat, "_🎨 Membuat gambar menggunakan EasyAI (POST)..._", m);
    const apiUrl = API("wudysoft", "/api/ai/txt2img/easyai");
    const {
      data
    } = await axios.post(apiUrl, {
      prompt: prompt
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (Array.isArray(data) && data.length > 0) {
      for (const imageObject of data) {
        if (imageObject.image) {
          await conn.sendMessage(m.chat, {
            image: {
              url: imageObject.image
            },
            caption: prompt
          }, {
            quoted: m
          });
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } else {
      conn.reply(m.chat, "_⚠️ Gagal membuat gambar menggunakan EasyAI (POST) atau tidak ada gambar yang dihasilkan._", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses permintaan gambar EasyAI (POST)._", m);
  }
};
handler.help = ["easyai <teks>"];
handler.tags = ["ai"];
handler.command = /^easyai$/i;
export default handler;