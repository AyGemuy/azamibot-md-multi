import * as spotydown from "../../api/down/spotydown.js";

const { meta, track, get } = spotydown;

export const cmd = {
  name: ["mikasa"],
  command: ["spotydownmeta", "spotydowntrack", "spotydownget"],
  category: ["down"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "spotydownmeta":
          output = await meta(text);
          break;
        case "spotydowntrack":
          output = await track(text);
          break;
        case "spotydownget":
          output = await get(text);
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
