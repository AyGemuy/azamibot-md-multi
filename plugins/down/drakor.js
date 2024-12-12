import * as drakor from "../../api/down/drakor.js";

const { detail, search } = drakor;

export const cmd = {
  name: ["mikasa"],
  command: ["animebatcsearch", "drakordetail"],
  category: ["down"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "drakorsearch":
          output = await search(text);
          break;
        case "drakordetail":
          output = await detail(text);
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
