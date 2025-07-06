import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let prompt = text;
  if (!prompt) {
    return conn.reply(m.chat, `Buat gambar dari teks menggunakan Fluxv6 (POST).\nContoh: ${usedPrefix}${command} robot sedang menari`, m);
  }
  try {
    conn.reply(m.chat, "_🎨 Membuat gambar menggunakan Fluxv6 (POST)..._", m);
    const apiUrl = API("wudysoft", "/api/ai/txt2img/flux/v6");
    const response = await axios.post(apiUrl, {
      prompt: prompt
    }, {
      responseType: "arraybuffer"
    });
    const buffer = Buffer.from(response.data, "binary");
    if (buffer) {
      await conn.sendMessage(m.chat, {
        image: buffer,
        caption: prompt
      }, {
        quoted: m
      });
    } else {
      conn.reply(m.chat, "_⚠️ Gagal membuat gambar menggunakan Fluxv6 (POST) atau respons tidak valid._", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses permintaan gambar Fluxv6 (POST)._", m);
  }
};
handler.help = ["fluxv6 <teks>"];
handler.tags = ["ai"];
handler.command = /^fluxv6$/i;
export default handler;