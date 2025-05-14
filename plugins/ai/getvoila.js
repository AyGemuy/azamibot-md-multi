import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  if (!text) {
    return conn.reply(m.chat, `Tanyakan sesuatu ke GetVoila: ${usedPrefix}${command} <pertanyaan>`, m);
  }
  try {
    conn.reply(m.chat, "GetVoila sedang menjawab...", m);
    const apiUrl = API("wudysoft", "/api/ai/getvoila", {
      prompt: text
    });
    const {
      data
    } = await axios.get(apiUrl);
    if (data && data.result) {
      conn.reply(m.chat, data.result, m);
    } else {
      conn.reply(m.chat, "GetVoila tidak memberikan jawaban.", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "Gagal berkomunikasi dengan GetVoila.", m);
  }
};
handler.help = ["getvoila <pertanyaan>"];
handler.tags = ["ai"];
handler.command = /^getvoila$/i;
handler.limit = true;
export default handler;