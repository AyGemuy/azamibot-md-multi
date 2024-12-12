import * as rushchat from "../../api/ai/rushchat.js";

const { chat, image } = rushchat;

export const cmd = {
  name: ["mikasa"],
  command: ["rushchat", "rushchatimg"],
  category: ["ai"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "rushchat":
          output = await chat(text);
          break;
        case "rushchatimg":
          output = await image(text);
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
