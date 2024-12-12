import * as amigochat from "../../api/ai/amigochat.js";

const { AmigoChatImg, AmigoChat } = amigochat;

export const cmd = {
  name: ["mikasa"],
  command: ["amigochatimg", "amigochat"],
  category: ["ai"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "amigochatimg":
          output = await AmigoChatImg(text);
          break;
        case "amigochat":
          output = await AmigoChat(text);
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
