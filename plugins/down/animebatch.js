import * as animebatch from "../../api/down/animebatch.js";

const { detail, search } = animebatch;

export const cmd = {
  name: ["mikasa"],
  command: ["animebatchsearch", "animebatchdetail"],
  category: ["down"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "animebatchsearch":
          output = await search(text);
          break;
        case "animebatchdetail":
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
