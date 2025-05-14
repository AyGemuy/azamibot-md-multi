import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let prompt = text;
  if (!prompt) {
    return conn.reply(m.chat, `Buat gambar dari teks menggunakan Pixiebrix (POST).\nContoh: ${usedPrefix}${command} Pemandangan kota futuristik dengan neon`, m);
  }
  try {
    conn.reply(m.chat, "_🎨 Membuat gambar menggunakan Pixiebrix (POST)..._", m);
    const apiUrl = API("wudysoft", "/api/ai/txt2img/pixiebrix");
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
    if (data && data.data && Array.isArray(data.data) && data.data.length > 0 && data.data[0].url) {
      const imageUrl = data.data[0].url;
      const revisedPrompt = data.data[0].revised_prompt;
      let caption = prompt;
      if (revisedPrompt) {
        caption = `Prompt: ${prompt}\n\nRevised Prompt: ${revisedPrompt}`;
      }
      await conn.sendMessage(m.chat, {
        image: {
          url: imageUrl
        },
        caption: caption
      }, {
        quoted: m
      });
    } else {
      conn.reply(m.chat, "_⚠️ Gagal membuat gambar menggunakan Pixiebrix (POST) atau gambar tidak ditemukan dalam respons._", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses permintaan gambar Pixiebrix (POST)._", m);
  }
};
handler.help = ["pixiebrix <teks>"];
handler.tags = ["ai"];
handler.command = /^pixiebrix$/i;
export default handler;