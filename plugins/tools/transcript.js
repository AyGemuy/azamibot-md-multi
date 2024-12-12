import * as transcript from "../../api/tools/transcript.js";

const { notegpt, tactiq } = transcript;

export const cmd = {
  name: ["transcript"],
  command: ["notegpt", "tactiq"],
  category: ["tools"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "notegpt":
          output = await notegpt(text);
          break;
        case "tactiq":
          output = await tactiq(text);
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
