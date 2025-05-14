import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let query = text;
  if (!conn.wsup_ai) {
    conn.wsup_ai = {};
  }
  switch (command) {
    case "wsupsetid":
      if (!query) {
        return conn.reply(m.chat, `Penggunaan: ${usedPrefix}${command} <char_id>`, m);
      }
      conn.wsup_ai[m.sender] = query;
      conn.reply(m.chat, `ID WSUP diatur: ${query}`, m);
      break;
    case "wsupsearch":
      if (!query) {
        return conn.reply(m.chat, `Cari: ${usedPrefix}${command} <kata kunci>`, m);
      }
      try {
        conn.reply(m.chat, "Mencari...", m);
        const searchApiUrl = API("wudysoft", "/api/ai/wsup", {
          action: "search",
          query: query
        });
        const {
          data: searchData
        } = await axios.get(searchApiUrl);
        if (searchData.status === "Success" && Array.isArray(searchData.body) && searchData.body.length > 0) {
          let results = searchData.body.map(item => `\`ID: ${item.id}\`\n*Nama:* ${item.name}\n*Deskripsi:* ${item.description}\n*Avatar:* ${item.characterImageUrl}`).join("\n\n");
          conn.reply(m.chat, `*Hasil WSUP:*\n${results}`, m);
        } else {
          conn.reply(m.chat, "Tidak ditemukan.", m);
        }
      } catch (error) {
        console.error(error);
        conn.reply(m.chat, "Gagal mencari.", m);
      }
      break;
    case "wsupai":
      if (!query) {
        return conn.reply(m.chat, `Tanya: ${usedPrefix}${command} <pertanyaan>`, m);
      }
      try {
        conn.reply(m.chat, "Memproses...", m);
        const charId = conn.wsup_ai[m.sender];
        const aiApiUrl = API("wudysoft", "/api/ai/wsup", {
          action: "chat",
          prompt: query,
          char_id: charId
        });
        const {
          data: aiData
        } = await axios.get(aiApiUrl);
        if (aiData.status === "Success" && aiData.body && aiData.body.answer) {
          conn.reply(m.chat, aiData.body.answer, m);
        } else {
          conn.reply(m.chat, "Tidak ada jawaban.", m);
        }
      } catch (error) {
        console.error(error);
        conn.reply(m.chat, "Gagal memproses.", m);
      }
      break;
    default:
  }
};
handler.help = ["wsupsetid <char_id>", "wsupsearch <kata kunci>", "wsupai <pertanyaan>"];
handler.tags = ["ai"];
handler.command = /^(wsupsetid|wsupsearch|wsupai)$/i;
handler.limit = true;
export default handler;