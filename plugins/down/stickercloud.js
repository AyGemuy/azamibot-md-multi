import * as stickercloud from "../../api/down/stickercloud.js";

const { search, pack } = stickercloud;

export const cmd = {
  name: ["mikasa"],
  command: ["stickercloudpack", "stickercloudsearch"],
  category: ["down"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "stickercloudpack":
          output = await pack(text);
          break;
        case "stickercloudsearch":
          output = await search(text);
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
