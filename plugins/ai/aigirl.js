import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let query = text;
  if (!conn.aigirl_sessions) {
    conn.aigirl_sessions = {};
  }
  switch (command) {
    case "aigirlsetid":
      if (!query) {
        return conn.reply(m.chat, `Penggunaan: ${usedPrefix}${command} <model_id>`, m);
      }
      conn.aigirl_sessions[m.sender] = {
        model: query
      };
      conn.reply(m.chat, `ID AIGirl (Model) diatur: ${query}`, m);
      break;
    case "aigirlsearch":
      if (!query) {
        return conn.reply(m.chat, `Cari AIGirl: ${usedPrefix}${command} <kata kunci>`, m);
      }
      try {
        conn.reply(m.chat, "Mencari AIGirl...", m);
        const apiUrl = API("wudysoft", "/api/ai/aigirl");
        const postData = {
          action: "search",
          query: query
        };
        const {
          data: searchData
        } = await axios.post(apiUrl, postData, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (searchData && Array.isArray(searchData) && searchData.length > 0) {
          let results = searchData.map(item => `*Model:* ${item.model}\n*Nama:* ${item.title}\n*Deskripsi:* ${item.description}\n*Link:* ${item.href}\n*Gambar:* ${item.image}`).join("\n\n");
          conn.reply(m.chat, `*Hasil Pencarian AIGirl:*\n${results}`, m);
        } else {
          conn.reply(m.chat, "Tidak ada AIGirl yang ditemukan dengan kata kunci tersebut.", m);
        }
      } catch (error) {
        console.error(error);
        conn.reply(m.chat, "Gagal mencari AIGirl.", m);
      }
      break;
    case "aigirl":
      if (!query) {
        return conn.reply(m.chat, `Tanya AIGirl: ${usedPrefix}${command} <pertanyaan>`, m);
      }
      try {
        conn.reply(m.chat, "AIGirl sedang berpikir...", m);
        const model = conn.aigirl_sessions[m.sender]?.model;
        if (!model) {
          return conn.reply(m.chat, `Mohon atur ID AIGirl (Model) terlebih dahulu menggunakan perintah ${usedPrefix}aigirlsetid <model_id>`, m);
        }
        const apiUrl = API("wudysoft", "/api/ai/aigirl");
        const postData = {
          action: "chat",
          prompt: query,
          model: model
        };
        const {
          data: chatData
        } = await axios.post(apiUrl, postData, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (chatData && chatData.textContent) {
          conn.reply(m.chat, chatData.textContent, m);
        } else {
          conn.reply(m.chat, "AIGirl tidak memberikan jawaban.", m);
        }
      } catch (error) {
        console.error(error);
        conn.reply(m.chat, "Gagal berkomunikasi dengan AIGirl.", m);
      }
      break;
    default:
      break;
  }
};
handler.help = ["aigirlsetid <model_id>", "aigirlsearch <kata kunci>", "aigirl <pertanyaan>"];
handler.tags = ["ai"];
handler.command = /^(aigirlsetid|aigirlsearch|aigirl)$/i;
handler.limit = true;
export default handler;