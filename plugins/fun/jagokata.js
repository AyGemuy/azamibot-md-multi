import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let query = text;
  if (!query) {
    return conn.reply(m.chat, `Cari kutipan dari tokoh.\nContoh: ${usedPrefix}${command} einstein`, m);
  }
  try {
    conn.reply(m.chat, "_💭 Mencari kutipan..._", m);
    const apiUrl = API("wudysoft", "/api/fun/jagokata", {
      q: query
    });
    const {
      data
    } = await axios.get(apiUrl);
    if (data && data.quotes && Array.isArray(data.quotes) && data.quotes.length > 0) {
      const validQuotes = data.quotes.filter(quote => quote.quote && quote.img);
      if (validQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * validQuotes.length);
        const randomQuote = validQuotes[randomIndex];
        let teks = `📜 *KUTIPAN TOKOH*\n\n`;
        teks += `"${randomQuote.quote}"\n\n`;
        teks += `👤 *Penulis:* ${randomQuote.author || "Tidak Diketahui"}\n`;
        if (randomQuote.description) {
          teks += `ℹ️ *Deskripsi:* ${randomQuote.description}\n`;
        }
        if (randomQuote.link) {
          teks += `🔗 *Sumber:* ${randomQuote.link}\n`;
        }
        await conn.sendMessage(m.chat, {
          image: {
            url: randomQuote.img
          },
          caption: teks
        }, {
          quoted: m
        });
      } else {
        conn.reply(m.chat, `_Tidak ditemukan kutipan yang valid (memiliki teks dan gambar) untuk "${query}". coba kata kunci lain._`, m);
      }
    } else {
      conn.reply(m.chat, `_Tidak ditemukan kutipan untuk "${query}". coba kata kunci lain._`, m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat mencari kutipan._", m);
  }
};
handler.help = ["jagokata <tokoh>"];
handler.tags = ["fun"];
handler.command = /^jagokata$/i;
export default handler;