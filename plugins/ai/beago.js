import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  text
}) => {
  if (!text) {
    return conn.reply(m.chat, `Penggunaan: ${usedPrefix}beago <pertanyaan>`, m);
  }
  try {
    conn.reply(m.chat, "Sedang memproses...", m);
    const apiUrl = API("wudysoft", "/api/ai/beago", {
      prompt: text
    });
    if (!apiUrl) {
      return conn.reply(m.chat, "Gagal mendapatkan URL API.", m);
    }
    const {
      data
    } = await axios.get(apiUrl);
    if (data.result) {
      conn.reply(m.chat, data.result, m);
    } else {
      conn.reply(m.chat, "Maaf, tidak ada hasil.", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "Maaf, terjadi kesalahan.", m);
  }
};
handler.help = ["beago <pertanyaan>"];
handler.tags = ["ai"];
handler.command = /^(beago)$/i;
handler.limit = true;
export default handler;