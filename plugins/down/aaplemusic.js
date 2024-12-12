import * as aaplemusic from "../../api/down/aaplemusic.js";

const { ytdl, ytsearch, applesearch } = aaplemusic;

export const cmd = {
  name: ["mikasa"],
  command: ["aaplemusicytdl", "aaplemusicytsearch", "aaplemusicsearch"],
  category: ["down"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "aaplemusicytdl":
          output = await ytdl(text);
          break;
        case "aaplemusicytsearch":
          output = await ytsearch(text);
          break;
        case "aaplemusicsearch":
          output = await applesearch(text);
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
