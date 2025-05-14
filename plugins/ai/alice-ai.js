import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let query = text;
  if (!conn.alice_ai) {
    conn.alice_ai = {};
  }
  switch (command) {
    case "alicesetid":
      if (!query) {
        return conn.reply(m.chat, `Penggunaan: ${usedPrefix}${command} <chatbot_id>`, m);
      }
      conn.alice_ai[m.sender] = query;
      conn.reply(m.chat, `ID Alice diatur: ${query}`, m);
      break;
    case "alicesearch":
      if (!query) {
        return conn.reply(m.chat, `Cari Alice: ${usedPrefix}${command} <kata kunci>`, m);
      }
      try {
        conn.reply(m.chat, "Mencari Alice...", m);
        const apiUrl = API("wudysoft", "/api/ai/alice-ai");
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
        if (searchData.code === 0 && searchData.data && searchData.data.items.length > 0) {
          let results = searchData.data.items.map(item => `\`ID: ${item.chatbot_id}\`\n*Nama:* ${item.nickname}\n*Deskripsi:* ${item.short_description}\n*Avatar:* ${item.avatar}\n*Jumlah Pesan:* ${item.message_count}`).join("\n\n");
          conn.reply(m.chat, `*Hasil Pencarian Alice:*\n${results}`, m);
        } else {
          conn.reply(m.chat, "Tidak ada Alice yang ditemukan dengan kata kunci tersebut.", m);
        }
      } catch (error) {
        console.error(error);
        conn.reply(m.chat, "Gagal mencari Alice.", m);
      }
      break;
    case "aliceai":
      if (!query) {
        return conn.reply(m.chat, `Tanya Alice: ${usedPrefix}${command} <pertanyaan>`, m);
      }
      try {
        conn.reply(m.chat, "Alice sedang berpikir...", m);
        const charId = conn.alice_ai[m.sender];
        if (!charId) {
          return conn.reply(m.chat, `Mohon atur ID Alice terlebih dahulu menggunakan perintah ${usedPrefix}alicesetid <chatbot_id>`, m);
        }
        const apiUrl = API("wudysoft", "/api/ai/alice-ai");
        const postData = {
          action: "chat",
          char_id: charId,
          prompt: query
        };
        const {
          data: chatData
        } = await axios.post(apiUrl, postData, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (chatData.result) {
          conn.reply(m.chat, chatData.result, m);
        } else {
          conn.reply(m.chat, "Alice tidak memberikan jawaban.", m);
        }
      } catch (error) {
        console.error(error);
        conn.reply(m.chat, "Gagal berkomunikasi dengan Alice.", m);
      }
      break;
    default:
  }
};
handler.help = ["alicesetid <chatbot_id>", "alicesearch <kata kunci>", "aliceai <pertanyaan>"];
handler.tags = ["ai"];
handler.command = /^(alicesetid|alicesearch|aliceai)$/i;
handler.limit = true;
export default handler;