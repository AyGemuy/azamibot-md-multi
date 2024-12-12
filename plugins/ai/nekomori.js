import * as nekomori from "../../api/ai/nekomori.js";

const { chat, search, tags } = nekomori;

export const cmd = {
  name: ["mikasa"],
  command: ["nekomorichat", "nekomorisearch", "nekomoritags"],
  category: ["ai"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "nekomorichat":
          output = await chat(text);
          break;
        case "nekomorisearch":
          output = await search(text);
          break;
        case "nekomoritags":
          output = await tags(text);
          break;
        default:
          return m.reply("Perintah tidak dikenali.");
      }
      return m.reply(output);
    } catch (error) {
      console.error(`Error pada AI ${command}:`, error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
