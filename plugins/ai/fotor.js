import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let prompt = text;
  if (!prompt) {
    return conn.reply(m.chat, `Buat gambar dari teks menggunakan Fotor (POST).\nContoh: ${usedPrefix}${command} pemandangan gunung yang indah`, m);
  }
  try {
    conn.reply(m.chat, "_🎨 Membuat gambar menggunakan Fotor (POST)..._", m);
    const apiUrl = API("wudysoft", "/api/ai/txt2img/fotor");
    const postData = {
      action: "create",
      upscale: true,
      prompt: prompt
    };
    const {
      data
    } = await axios.post(apiUrl, postData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (data && data.result && Array.isArray(data.result) && data.result.length > 0 && data.result[0].pictureUrl) {
      await conn.sendMessage(m.chat, {
        image: {
          url: data.result[0].pictureUrl
        },
        caption: prompt
      }, {
        quoted: m
      });
    } else {
      conn.reply(m.chat, "_⚠️ Gagal membuat gambar menggunakan Fotor (POST). Pastikan prompt Anda valid._", m);
      if (data && data.result && Array.isArray(data.result) && data.result.length > 0 && data.result[0].taskId) {
        console.log(`Fotor Task ID: ${data.result[0].taskId}`);
        conn.reply(m.chat, `_ℹ️ Task ID (mungkin berguna untuk pengecekan manual): ${data.result[0].taskId}_`, m);
      }
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses permintaan gambar Fotor (POST)._", m);
  }
};
handler.help = ["fotor <teks>"];
handler.tags = ["ai"];
handler.command = /^fotor$/i;
export default handler;