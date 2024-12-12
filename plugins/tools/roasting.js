import * as roasting from "../../api/tools/roasting.js";

const { Instagram, Tiktok, Threads } = roasting;

export const cmd = {
  name: ["roasting"],
  command: ["roastinginstagram", "roastingtiktok", "roastingthreads"],
  category: ["tools"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "roastinginstagram":
          output = await Instagram(text);
          break;
        case "roastingtiktok":
          output = await Tiktok(text);
          break;
        case "roastingthreads":
          output = await Threads(text);
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
