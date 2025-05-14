import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  if (!text) {
    return conn.reply(m.chat, `Tanyakan sesuatu ke Hotbot: ${usedPrefix}${command} <pertanyaan>`, m);
  }
  try {
    conn.reply(m.chat, "Hotbot sedang menjawab...", m);
    const apiUrl = API("wudysoft", "/api/ai/hotbot", {
      prompt: text,
      action: "search"
    });
    const {
      data
    } = await axios.get(apiUrl);
    let combinedResult = "";
    if (data && data.msg && data.msg.txt) {
      combinedResult += `*Jawaban Hotbot:*\n${data.msg.txt}\n\n`;
    }
    if (data && data.msg && Array.isArray(data.msg.res) && data.msg.res.length > 0) {
      combinedResult += "*Hasil Pencarian Tambahan:*\n";
      const results = data.msg.res.map((item, index) => `\`${index + 1}.\` *${item.title}*\n${item.snip}\n_${item.link}_`).join("\n\n");
      combinedResult += results;
    }
    if (combinedResult) {
      conn.reply(m.chat, combinedResult, m);
    } else {
      conn.reply(m.chat, "Hotbot tidak memberikan jawaban yang sesuai.", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "Gagal berkomunikasi dengan Hotbot.", m);
  }
};
handler.help = ["hotbot <pertanyaan>"];
handler.tags = ["ai"];
handler.command = /^hotbot$/i;
handler.limit = true;
export default handler;