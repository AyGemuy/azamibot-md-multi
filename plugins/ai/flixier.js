import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let prompt = text;
  if (!prompt) {
    return conn.reply(m.chat, `Buat gambar dari teks menggunakan Flixier (POST).\nContoh: ${usedPrefix}${command} mobil-mobil di jalanan futuristik`, m);
  }
  try {
    conn.reply(m.chat, "_🎨 Membuat gambar menggunakan Flixier (POST)..._", m);
    const apiUrl = API("wudysoft", "/api/ai/txt2img/flixier");
    const {
      data
    } = await axios.post(apiUrl, {
      prompt: prompt
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (data && data.output_url) {
      await conn.sendMessage(m.chat, {
        image: {
          url: data.output_url
        },
        caption: prompt
      }, {
        quoted: m
      });
    } else if (data && data.error) {
      conn.reply(m.chat, `_❌ Flixier Error:_ ${data.error}`, m);
    } else {
      conn.reply(m.chat, "_⚠️ Gagal membuat gambar menggunakan Flixier (POST)._", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses permintaan gambar Flixier (POST)._", m);
  }
};
handler.help = ["flixier <teks>"];
handler.tags = ["ai"];
handler.command = /^flixier$/i;
export default handler;